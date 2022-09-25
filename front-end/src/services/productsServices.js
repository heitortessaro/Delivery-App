import axios from 'axios';

const URL = 'http://localhost:3001/products';

export const getProducts = async () => {
  try {
    const result = await axios.post(URL);
    // console.log(result);
    return result;
  } catch (error) {
    return null;
  }
};

export default { getProducts };
