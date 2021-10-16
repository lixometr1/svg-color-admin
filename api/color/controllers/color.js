"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  async getMainColors(ctx) {
    const categories = ctx.query.categories;
    const result = await strapi.services.paginate.paginate(
      "color",
      ctx,
      {
        isMainColor: true,
        color_category: categories,
      },
      ["color_category"]
    );
    return result;
  },
  async getBackgroundColors(ctx) {
    const categories = ctx.query.categories;
    const result = await strapi.services.paginate.paginate(
      "color",
      ctx,
      {
        isBackgroundColor: true,
        color_category: categories,
      },
      ["color_category"]
    );
    return result;
  },
};
