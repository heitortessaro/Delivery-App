const getSales = async () => {
  const url = 'http://localhost:3001/sales';
  const response = await fetch(url);
  const result = response.json();
  console.log(result);
  return result;
};

export default getSales;
