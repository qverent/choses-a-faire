require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

async function checkAuthorization(mutation, ){
    const needsAuthorization = ['editItem', 'deleteItem'];
    
}

function createToken(userID) {
    return jwt.sign({ userId: userID }, SECRET);
}

async function generatePassword(password) {
    if (password.length < 5) throw new Error('WeakPassword');
    return await bcrypt.hash(password, 10);
}

/**
 * Called by resolvers needing authentication
 * Retrieves Authorization header from context, which contains the JWT
 * Verifies JWT and extracts ID from it
 */
function getUserID(request) {
    let userID = null;
    const Authorization = request.get('Authorization');
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      userID = jwt.verify(token, SECRET).userId;
    }
    return userID;
}

async function validateCredentials(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
}

module.exports = {
    getUserID,
    createToken,
    generatePassword,
    SECRET,
    validateCredentials
}