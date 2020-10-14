/**
 * Standardize error messages using Apollo-Errors
 * A hacky way to make (primarily, Prisma) errors, less overwhelming
 * Note: Query param type errors, are caught before reaching this middleware
 */
const { createError } = require('apollo-errors')

const AuthenticationError = createError('AuthenticationError', {
    message: 'Password or username incorrect'
});

const AuthorizationError = createError('AuthorizationError', {
    message: 'Action not authorized for user'
});

const OpaqueServerError = createError('ServerError', {
    message: 'Server error'
});

const RecordNotFoundError = createError('RecordNotFoundError', {
    message: 'Record to update not found'
});

const SignupUsernameError = createError('SignupUsernameError', {
    message: 'Unable to create account; please choose a different username'
})

const SignupPasswordError = createError('SignupPasswordError', {
    message: 'Password must be at least 5 characters long'
})


async function errorHandler (resolve, root, args, context, info) {
    try {
        const resolution = await resolve(root, args, context, info);
        return resolution;
    }
    catch (error) {
        // Prisma errors
        if (error.code && error.code==='P2002' && error.message.includes('Unique constraint')) throw new SignupUsernameError;
        if (error.meta && error.meta.details && error.meta.details.includes('RecordNotFound'))
            throw new RecordNotFoundError;
        // Custom errors
        if (error.message==='Authentication') throw new AuthenticationError;
        if (error.message==='Authorization') throw new AuthorizationError;
        if (error.message==='NotFound') throw new RecordNotFoundError;
        if (error.message==='WeakPassword') throw new SignupPasswordError;

        throw new OpaqueServerError;
    }
}

module.exports = {
    errorHandler,
  }