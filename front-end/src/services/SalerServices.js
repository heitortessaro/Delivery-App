import axios from 'axios';

const URL_USER = 'http://localhost:3001/user';

export const getSalers = async () => {
  try {
    const { data } = await axios.get(URL_USER);
    const filterSaler = data.filter((user) => user.role === 'seller');
    return filterSaler;
  } catch (error) {
    return { error: error.response };
  }
};
export default { getSalers };
