const fs = require("fs");
const csv = require("csv-parser");
const removeAll = async () => {
  await strapi.query("color-category").delete();
};
const createCategory = async (category) => {
  // for test
  const name = category.name;
  const toCreate = {
    name: name,
    description: category.description,
    displayOrder: parseInt(category.displayOrder),
  };
  await strapi.services["color-category"].create(toCreate);
};
module.exports = async (path) => {
  /*
    {
    name: 'Yellow,Tan',
    description: 'description 31',
    displayOrder: '310'
    }
    */
  const categories = await new Promise((resolve) => {
    const items = [];
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
    const category = categories[i]
    await createCategory(category);
  }
  return true;
};
