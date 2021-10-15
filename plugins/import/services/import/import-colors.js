const fs = require("fs");
const csv = require("csv-parser");
const removeAll = async () => {
  await strapi.query("color").delete();
};
const findCategory = async (name) => {
  return await strapi.services["color-category"].findOne({ name });
};

const createColor = async (item) => {
  const isMain = Boolean(parseInt(item.isMain));
  const isBackground = Boolean(parseInt(item.isBackground));
  let categoryId;
  if (item.category) {
    const category = await findCategory(item.category);
    if (!category)
      throw new Error(
        `Color Category with name "${item.category}" does not exist`
      );
    categoryId = category.id;
  }

  const toCreate = {
    name: item.name,
    color_code: item.code,
    color_category: categoryId,
    displayOrder: parseInt(item.displayOrder),
    hex: item.hex,
    isBackgroundColor: isBackground,
    isMainColor: isMain,
  };
  await strapi.services.color.create(toCreate);
};
module.exports = async (path) => {
  /*
    {
    category: 'Blue',
    name: 'SOLSTICE',
    code: '468',
    hex: '#c8d9e2',
    displayOrder: '1000',
    isBackground: '0',
    isMain: '1'
  } */
  const colors = await new Promise((resolve) => {
    const items = [];
    fs.createReadStream(path)
      .pipe(
        csv({
          newline: "\n",
          separator: "\t",
          skipLines: 1,
          headers: [
            "category",
            "name",
            "code",
            "hex",
            "displayOrder",
            "isBackground",
            "isMain",
          ],
        })
      )
      .on("data", (data) => items.push(data))
      .on("end", () => {
        resolve(items);
      });
  });
  await removeAll();
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    await createColor(color);
  }
  return true;
};
