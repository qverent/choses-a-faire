const { createError } = require('apollo-errors')
const { RecordNotFound } = require('@prisma/client')

const AuthenticationError = createError('AuthenticationError', {
    message: 'Password or username incorrect'
});

const AuthorizationError = createError('AuthorizationError', {
    message: ''
})

const RecordNotFoundError = createError('RecordNotFoundError', {
    message: 'Record to update not found'
});

/**
 * Hacky way to make Prisma errors easier to read)
 * Note: Query param type errors, are caught before this
 */
async function errorHandler (resolve, root, args, context, info) {
    try {
        const resolution = await resolve(root, args, context, info);
        return resolution;
    }
    catch (error) {
        // console.log('CAUGHT');
        // console.log(error);
        // console.log('********');
        if (error.meta && error.meta.details.includes('RecordNotFound'))
            throw new RecordNotFoundError;
        throw error;
    }
}

module.exports = {
    errorHandler,
    AuthenticationError,
    AuthorizationError,
    RecordNotFoundError,
  }