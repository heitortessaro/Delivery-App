import axios from 'axios';

const URL_SALES = 'http://localhost:3001/sales';

export const postSale = async (order) => {
  try {
    const { id } = await axios.post(URL_SALES, order);
    return id;
  } catch (error) {
    return { error: error.response };
  }
};

export default { postSale };
