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

async function validateCredentials(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
}

module.exports = {
    checkAuthorization,
    createToken,
    generatePassword,
    SECRET,
    validateCredentials
}