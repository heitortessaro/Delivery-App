const axios = require('axios');

const URL = 'http://localhost:3001/sales';

const getOrders = async (user) => {
  try {
    const result = await axios.get(URL, { headers: {
      authorization: user.token,
    } });
    return result.data;
  } catch (error) {
    return [];
  }
};

const verifyLogin = async (user) => {
  try {
    const result = await axios.get(URL, { headers: {
      authorization: user.token,
    } });
    console.log(result);
    return result.status;
  } catch (error) {
    return [];
  }
};

const returnDate = (date) => {
  const endYear = 4;
  const stratMonth = 5;
  const endMonth = 7;
  const startDar = 8;
  const endDay = 10;
  const year = date.substring(0, endYear); // 1e4 gives us the the other digits to be filled later, so 20210000.
  const month = date.substring(stratMonth, endMonth); // months are numbered 0-11 in JavaScript, * 100 to move two digits to the left. 20210011 => 20211100
  const day = date.substring(startDar, endDay); // 20211100 => 20211124
  // const result = year + month + day + '' // `+ ''` to convert to string from number, 20211124 => "2021112
  return (`${day}/${month}/${year}`);
};

module.exports = { getOrders, returnDate, verifyLogin };
