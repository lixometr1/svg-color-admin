module.exports = {
  paginate(model, ctx, query, populate) {
    const perPage = ctx.query.perPage ? parseInt(ctx.query.perPage) : 15;
    const page = ctx.query.page || 1;
    const entities = await model.find(
      {
        _sort: "displayOrder:desc",
        _start: (page - 1) * perPage,
        _limit: perPage,
        _publicationState: "live",
        ...query,
      },
      populate
    );
    const total = await model.count(query);
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