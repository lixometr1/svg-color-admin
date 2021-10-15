const fs = require("fs");
const csv = require("csv-parser");
const removeAll = async () => {
  await strapi.query("pattern-category").delete();
};
const createCategory = async (category) => {
  const toCreate = {
    name: category.name,
    description: category.description,
    displayOrder: parseInt(category.displayOrder),
  };
  await strapi.services["pattern-category"].create(toCreate);
};
module.exports = async (path) => {
  /*
    {
    name: 'Hand-made',
    description: 'description 4',
    displayOrder: '40'
    }
    */
  const items = [];
  const categories = await new Promise((resolve) => {
    fs.createReadStream(path)
      .pipe(
        csv({
          newline: "\n",
          separator: "\t",
          skipLines: 1,
          headers: ["name", "description", "displayOrder"],
        })
      )
      .on("data", (data) => items.push(data))
      .on("end", () => {
        resolve(items);
      });
  });
  await removeAll();
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    await createCategory(category);
  }
};
