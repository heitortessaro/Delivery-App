const axios = require('axios');

const URL_LOGIN = 'http://localhost:3001/login';
const URL_USER = 'http://localhost:3001/user';

const login = async ({ email, password }) => {
  try {
    const result = await axios.post(URL_LOGIN, { email, password });
    return result.data;
  } catch (error) {
    return null;
  }
};

const createUser = async ({ name, password, email }) => {
  try {
    const result = await axios.post(URL_USER, { name, password, email });
    // console.log(result);
    return result.data;
  } catch (error) {
    return { error: error.response };
  }
};

module.exports = { login, createUser };
