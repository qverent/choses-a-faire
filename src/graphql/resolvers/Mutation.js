const { createToken, generatePassword, validateCredentials } = require('../../utils/auth')

/**
 * Item mutations
 */
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
    const deletedItem = await context.prisma.item.delete({
      where: { id: args.id }
    });
    return deletedItem;
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

/**
 * User and auth mutations
 */
async function signupUser(parent, args, context, info) {
  const password = await generatePassword(args.password);
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = createToken(user.id); 
  return {
    token,
    user,
  }
}

async function loginUser(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { username: args.username } })
  if (!user) {
    throw new Error('Authentication')
  }
  const valid = await validateCredentials(args.password, user.password);
  if (!valid) {
    throw new Error('Authentication')
  }
  const token = createToken(user.id)
  return {
    token,
    user,
  }
}


module.exports = {
  addItem,
  deleteItem,
  editItem,
  signupUser,
  loginUser,
}