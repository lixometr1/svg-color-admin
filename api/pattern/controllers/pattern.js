"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  async getByCategory(ctx) {
    const categoryId = ctx.params.id.split(",");
    let query = {}
    if (categoryId && categoryId.length) {
      query = {
        "pattern_categories.id": categoryId,
      };
    } else {
      query = {}
    }

    return strapi.services.paginate.paginate("pattern", ctx, query, ["url"]);
  },
  paginate(ctx) {
    return strapi.services.paginate.paginate("pattern", ctx, {}, ["url"]);
  },
};
