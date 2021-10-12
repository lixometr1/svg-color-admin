"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  async getByCategory(ctx) {
    const categoryId = ctx.params.id.split(',');
    const perPage = ctx.query.perPage ? parseInt(ctx.query.perPage) : 15;
    const page = ctx.query.page || 1;
    const query = {
      "pattern_categories.id": categoryId,
    };
    const entities = await strapi.services.pattern.find(
      {
        _sort: "displayOrder:desc",
        _start: (page - 1) * perPage,
        _limit: perPage,
        _publicationState: "live",
        ...query,
      },
      ["url"]
    );
    const total = await strapi.services.pattern.count(query);
    const totalPages = Math.ceil(total / perPage);
    return {
      items: entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.pattern })
      ),
      meta: {
        total,
        perPage,
        page,
        totalPages,
      },
    };
  },
};
