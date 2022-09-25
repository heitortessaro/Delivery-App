const axios = require('axios');

const URL = 'http://localhost:3001/products';

const computeTotalCart = (productArray) => {
  const total = productArray
    .reduce((acc, curr) => acc + (Number(curr.quantity) * Number(curr.value)), 0);
  return total;
};

const addQuantityKey = (productArray) => {
  productArray.forEach((e) => {
    e.quantity = 0;
  });
  return productArray;
};

const getProducts = async () => {
  try {
    const result = await axios.post(URL);
    const products = addQuantityKey(result);
    return products;
  } catch (error) {
    return [];
  }
};

module.exports = { getProducts, computeTotalCart };
