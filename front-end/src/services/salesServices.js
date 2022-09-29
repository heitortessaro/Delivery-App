import axios from 'axios';

const URL_SALES = 'http://localhost:3001/sales';

export const postSale = async (order, user) => {
  try {
    const { data } = await axios.post(URL_SALES, order, { headers: {
      authorization: user.token,
    } });
    console.log(data.id);
    return data.id;
  } catch (error) {
    return { error: error.response };
  }
};

export default { postSale };
