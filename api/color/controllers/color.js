"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  async getMainColors(ctx) {
    const categories = ctx.query.categories;
    const entities = await strapi.services.color.find(
      {
        isMainColor: true,
        color_category: categories,
      },
      ["color_category"]
    );
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["color"] })
    );
  },
  async getBackgroundColors(ctx) {
    const categories = ctx.query.categories;
    const entities = await strapi.services.color.find(
      {
        isBackgroundColor: true,
        color_category: categories,
      },
      ["color_category"]
    );
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["color"] })
    );
  },
};
