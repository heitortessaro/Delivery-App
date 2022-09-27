const axios = require('axios');

const user = JSON.parse(window.localStorage.getItem('user')).name;
const URL = 'http://localhost:3001/sales';

const getOrders = async () => {
  try {
    const result = await axios.get(URL, { headers: {
      authorization: user.token,
    } });
    const orders = addQuantityKey(result.data);
    return orders;
  } catch (error) {
    return [];
  }
};

module.exports = { getOrders };
