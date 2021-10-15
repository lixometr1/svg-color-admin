const fs = require("fs");
const csv = require("csv-parser");
const removeAll = async () => {
  await strapi.query("pattern").delete();
};
const getCategories = async (categoyNames) => {
  const promises = categoyNames.split(";").map(async (name) => {
    const category = await strapi.services["pattern-category"].findOne({
      name,
    });
    if (!category)
      throw new Error(`Pattern Category with name "${name}" does not exist`);
    return category;
  });
  const categories = await Promise.all(promises);
  return categories.map((cat) => cat.id);
};
const createPattern = async (pattern) => {
  const categories = await getCategories(pattern.category);
  const toCreate = {
    name: pattern.name,
    pattern_code: pattern.code,
    displayOrder: parseInt(pattern.displayOrder),
    url: pattern.url,
    pattern_categories: categories,
  };
  await strapi.services.pattern.create(toCreate);
};
module.exports = async (path) => {
  /*
    {
    category: 'geometric',
    name: 'crazy',
    code: '102',
    url: 'https://cdn.cortinas.es/patterns/EssPat_3.svg',
    displayOrder: '10'
    }
    */
  const patterns = await new Promise((resolve) => {
    const items = [];
    fs.createReadStream(path)
      .pipe(
        csv({
          newline: "\n",
          separator: "\t",
          skipLines: 1,
          headers: ["category", "name", "code", "url", "displayOrder"],
        })
      )
      .on("data", (data) => items.push(data))
      .on("end", () => {
        resolve(items);
      });
  });
  await removeAll();
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    await createPattern(pattern);
  }
  return true
};
