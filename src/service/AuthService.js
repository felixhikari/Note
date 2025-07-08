const User = require('../model/User');
const { generateAuthToken, comparePassword, hashPassword } = require('../utill/utill');
const ResponseError = require('../error/error');

const createUser = async (request) => {
  const { username, password } = request.payload;
  const existingUser = await User.find({ username });
  if (existingUser && existingUser.length > 0) {
    throw new ResponseError(400, 'Username already exists', 'ValidationError');
  } 
  console.log('Creating user:', username);
  const hashedPassword = await hashPassword(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
  });
  await user.save();

  console.log('User created successfully:', user.username);
  console.log('User ID:', user._id);
  console.log(user);
  const jwtToken = generateAuthToken(user);
  console.log('JWT Token generated:', jwtToken);

  return {
    status: 'success',
    message: 'User created successfully',
    data: {
      userId: user._id,
      username: user.username,
      jwt: jwtToken,
    },
  };
};

const login = async (request) => {
  const { username, password } = request.payload;
  if (!username || !password) {
    throw new ResponseError(400, 'Username and password are required', 'ValidationError');
  }
  console.log('Login attempt for user:', request.payload);
  const user = await User.find({
    username
  });

  if (!user || user.length === 0) {
    throw new ResponseError(401, 'Invalid username or password', 'AuthenticationError');
  }
  console.log('User found:', user[0].username);
  if (user.length > 0) {
    const isPasswordValid = await comparePassword(password, user[0].password);
    if (!isPasswordValid) {
      throw new ResponseError(401, 'Invalid username or password', 'AuthenticationError');
    }
  }

  const jwtToken = generateAuthToken(user[0]);
  console.log('User authenticated successfully:', user[0].username);
  return {
    status: 'success',
    data: {
      username: user[0].username,
      jwt: jwtToken, // Assuming generateAuthToken is a method in User model
    },
  };
};

module.exports = {
  createUser, login,
};
