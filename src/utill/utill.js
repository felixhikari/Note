const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ResponseError = require('../error/error');
/**
 * Mengecek defined atau bukan
 *
 * @param {string | number } value - Nilai yang ingin dicek.
 * @returns {boolean} True jika selain undefined atau kosong, False jika undefined atau kosong
 */

const isDefined = (value) => {
  if (value !== undefined || value.trim() !== '') {
    return true;
  }
  return false;
};

const generateAuthToken = (user) => {
  // Assuming you have a method to generate JWT token
  const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new ResponseError(401, 'Invalid token', 'AuthenticationError');
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const formatedDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const formatedTime = (date) => {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(date).toLocaleTimeString('en-US', options);
};

module.exports = {
  isDefined, generateAuthToken, hashPassword, comparePassword, verifyAuthToken, formatedDate, formatedTime
};
