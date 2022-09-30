const axios = require('axios');

const URL = 'http://localhost:3001/sales';

const getOrders = async (user) => {
  console.log(user);
  try {
    const result = await axios.get(URL, { headers: {
      authorization: user.token,
    } });
    console.log(result.data);
    // const orders = addQuantityKey(result.data);
    return orders.data;
  } catch (error) {
    return [];
  }
};

module.exports = { getOrders };
