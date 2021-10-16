"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  async getByCategory(ctx) {
    const categories = ctx.query.categories
    let query = {}
    if (categories && categories.length) {
      query = {
        "pattern_categories.id": categories,
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
