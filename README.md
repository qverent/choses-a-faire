# choses-a-faire
GraphQL backend (for now) for a to do list


## Features
All to-dos are public, but only owners can edit/delete.

Items can be searched by:
* Priority (enum: `low`, `middle`, `high`)
* A single keyword (searches in both `title` and `description`)
* Priority AND keyword

## To-dos/to improve upon
Better error handling: the original stack trace is lost
Move the authorization functions for editItem and addItem into middleware. I need to find a way to make middleware run for select resolvers.


## Setting up a database with Prisma
If your dotenv file is not in `db/`, install the dotenv-cli globally (`npm install -g dotenv-cli`) and prepend the following commands with `dotenv -e [location of .env] -- `
1. `npx prisma migrate save --experimental`
2. `npx prisma migrate up --experimental`
3. `npx prisma generate`

#### To access the db GUI:
`npx prisma studio`
Please prepend with `dotenv -e [location of .env] -- ` if your dotenv file is not in `db/`.

#### To reset the database:
Run from the root folder: `node db/resetdb.js`


## Testing the API
#### GraphQL Playground
Enter `http://localhost:[port]/playground` into your browser.

##### Sample queries
```
mutation{
  editItem(id:14, title: "Almond milk", priority:normal){
    title
  }
}

mutation{
	loginUser(username:"test1", password: "testing"){
    user{
      id
    }
    token
  }
}

query{
  items(keyword: "blahhhhh" priority: low){
      title
    	description
  }
}

```
##### Testing for auth with GraphQL Playground
To test for auth, run the `loginUser` or `signupUser` mutations and copy the token into the `HTTP Headers` section:
`{ "Authorization": "Bearer [token" }`


#### Sample CURL commands
`curl -H "Content-Type:application/json" -X POST -d '{"query":"{ items(keyword:\"milk\") { title } }" }' http://localhost:[port]/graphql`

`curl -H "Content-Type:application/json" -X POST -d '{"query":"{ items { title } }" }' http://localhost:[port]/graphql`


