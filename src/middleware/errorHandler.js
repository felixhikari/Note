const ResponseError = require('../error/error');

const errorHandler = (error, request, h) => {
  if (error instanceof ResponseError) {
    return h.response({
      status: 'fail',
      message: error.message,
    }).code(error.statusCode);
  }

  return h.response({
    status: 'error',
    message: 'Internal Server Error',
  }).code(500);
};

module.exports = errorHandler;
