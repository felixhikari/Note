const { verifyAuthToken } = require('../utill/utill')
const ResponseError = require('../error/error')

const authMiddleware = async (request, h) => {
    const authHeader = request.headers.authorization;
    console.log('Authorization Header:');
    if (!authHeader) {
        console.log('Authorization header is missing');
        throw new ResponseError(401, 'Authorization header is missing', 'AuthenticationError');
    }

    console.log('Auth Header:', authHeader);
    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Token is missing');
        throw new ResponseError(401, 'Token is missing', 'AuthenticationError');
    }
    console.log('Token:', token);
    const decoded = await verifyAuthToken(token);
    console.log('Decoded Token:', decoded);
    if (!decoded.userId) {
        console.log('Invalid token: userId is missing');
        throw new ResponseError(401, 'Invalid token', 'AuthenticationError');
    }
    request.user = decoded; // Attach user info to the request object
    console.log('User authenticated successfully:', request.user);
    return h.continue;
}

module.exports = authMiddleware;