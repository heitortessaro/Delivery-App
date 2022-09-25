import axios from 'axios';

const URL = 'http://localhost:3001/products';

export const login = async ({ email, password }) => {
  try {
    const result = await axios.post(URL, { email, password });
    console.log(result);
    return result;
  } catch (error) {
    return null;
  }
};

export default { login };
