function user(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.userID } });
}

module.exports = {
    user
}