function addItem(parent, args, context, info) {
  const newItem = context.prisma.item.create({
    data: {
      title: args.title,
      description: args.description,
      priority: args.priority,
      user: { connect: { id: 3 } }, // TODO 
    }
  })
  return newItem;
}

module.exports = {
  addItem
}