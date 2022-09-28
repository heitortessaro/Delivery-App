import axios from 'axios';

const URL_SALES = 'http://localhost:3001/sales';

export const postSale = async (order) => {
  try {
    const { data } = await axios.post(URL_SALES, order);
    return data.id;
  } catch (error) {
    return { error: error.response };
  }
};

export default { postSale };
