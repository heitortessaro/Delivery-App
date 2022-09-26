const axios = require('axios');

const URL = 'http://localhost:3001/products';

const computeTotalCart = (productArray) => {
  const total = productArray
    .reduce((acc, curr) => acc + Number(curr.quantity) * Number(curr.price), 0)
    .toFixed(2);
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
    const result = await axios.get(URL);
    const products = addQuantityKey(result.data);
    return products;
  } catch (error) {
    return [];
  }
};

module.exports = { getProducts, computeTotalCart };
