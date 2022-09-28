import axios from 'axios';

const URL_SALES = 'http://localhost:3001/user';

export const getSalers = async () => {
  try {
    const { data } = await axios.get(URL_SALES);
    console.log(data);
    const filterSaler = data.filter((user) => user.role === 'seller');
    return filterSaler;
  } catch (error) {
    return { error: error.response };
  }
};
export default { getSalers };
