class ResponseError extends Error {
  constructor(statusCode, message, type) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
  }
}

module.exports = ResponseError;
