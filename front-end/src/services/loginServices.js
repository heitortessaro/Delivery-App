import axios from 'axios';

const URL_LOGIN = 'http://localhost:3001/login';
const URL_USER = 'http://localhost:3001/user';

export const login = async ({ email, password }) => {
  try {
    const result = await axios.post(URL_LOGIN, { email, password });
    return result.data;
  } catch (error) {
    return null;
  }
};

export const createUser = async ({ name, password, email }) => {
  try {
    const result = axios.post(URL_USER, { name, password, email });
    return result;
  } catch (error) {
    return null;
  }
};

export default { login, createUser };
