# choses-a-faire
GraphQL backend (for now) for a to do list

## Setting up a database with Prisma
If your dotenv file is not in `db/`, install the dotenv-cli globally (`npm install -g dotenv-cli`) and prepend the following commands with `dotenv -e [location of .env] -- `
`npx prisma migrate save --experimental`
`npx prisma migrate up --experimental`
`npx prisma generate`

### To access the db GUI:
`npx prisma studio`
Please prepend with `dotenv -e [location of .env] -- ` if your dotenv file is not in `db/`.

### To reset the database:
Run from the root folder: `node db/resetdb.js`