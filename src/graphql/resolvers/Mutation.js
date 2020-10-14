async function addItem(parent, args, context, info) {
  const newItem = await context.prisma.item.create({
    data: {
      title: args.title,
      description: args.description,
      priority: args.priority,
      user: { connect: { id: 4 } }, // TODO 
    }
  })
  return newItem;
}

async function deleteItem(parent, args, context, info) {
  try {
    const deletedItem = await context.prisma.item.delete({
      where: { id: args.id }
    });
    return deletedItem;
    }
  catch (e) {
    // If I catch it the client does not receive the errors array
    console.log('logged');
  }
}

async function editItem(parent, args, context, info) {
  const data = { };
  if (args.title) data.title = args.title;
  if (args.description) data.description = args.description;
  if (args.priority) data.priority = args.priority;
  const editedItem = await context.prisma.item.update({
    where: { id: args.id },
    data: data
  });
  return editedItem;
}

module.exports = {
  addItem,
  deleteItem,
  editItem
}