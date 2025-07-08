const { createUser, login } = require('../service/AuthService');

const signupHandler = async (request, h) => {
  console.log('Signup request received:');
  const response = await createUser(request);
  console.log('Response from createUser:', response);
  return h.response(response).code(200);
};

const loginHandler = async (request, h) => {
  console.log('Login request received:');
  const response = await login(request);
  return h.response(response).code(200);
};

module.exports = {
  loginHandler, signupHandler,
};
