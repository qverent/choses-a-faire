require('dotenv').config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient()

async function main() {
    // Delete all rows from tables
    const deletedItems = await prisma.item.deleteMany({});
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`[DB RESET] ${deletedItems.count} items deleted`);
    console.log(`[DB RESET] ${deletedUsers.count} users deleted`);

    let user1, password1;
    // Populate with sample user
    try {
        password1 = await bcrypt.hash(process.env.DB_PASSWD_1, 10);
        user1 = await prisma.user.create({
            data: {
                username: process.env.DB_USER_1,
                password: password1
            }
        });
        console.log('[DB RESET] Sample user populated');
    } catch (error) {
        error.message = `[DB RESET] Unable to create sample user: ${error.message}`;
        throw error;
    }

    // Populate with sample item
    try {
        await prisma.item.create({
            data: {
               title: 'Buy milk',
               priority: 'high',
               // category: 'Everyday things',
               user: {
                    connect: {id: user1.id}
                }
            }
        });
        console.log('[DB RESET] Sample item populated');
    } catch (error) {
        error.message = `[DB RESET] Unable to create sample item: ${error.message}`;
        throw error;
    }
}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect()
    })