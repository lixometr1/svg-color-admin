"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  async getByCategory(ctx) {
    const categoryId = ctx.params.id.split(",");

    const query = {
      "pattern_categories.id": categoryId,
    };
    return strapi.services.paginate(strapi.services.pattern, ctx, query, [
      "url",
    ]);
  },
  paginate(ctx) {
    return strapi.services.paginate(strapi.services.pattern, ctx, {}, [
      "url",
    ]);
  },
};
