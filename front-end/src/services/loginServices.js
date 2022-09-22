import axios from 'axios';

const instance = axios.create({
  URL: 'http://localhost:3001/login',
});

export const login = async ({ email, password }) => {
  try {
    const { data } = await instance.post('/login', { email, password });
    return data;
  } catch (error) {
    return null;
  }
};

export default { login };
