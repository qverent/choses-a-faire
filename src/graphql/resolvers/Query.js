async function items (parent, args, context, info) {
  let where = {};

  if (args.keyword) where = {
    OR: [
      {title: { contains: args.keyword }},
      {description: { contains: args.keyword }}
    ]
  };

  if (args.priority) where.priority = { equals: args.priority};

  const results = await context.prisma.item.findMany({ where });
  return results;
}

module.exports = {
        items,
    }
