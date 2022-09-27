import axios from 'axios';

const dataUser = JSON.parse(localStorage.getItem('keyLocalStorage'));
const URL_SALES = 'http://localhost:3001/saler';

export const getSalers = async () => {
  try {
    const { data } = await axios.get(URL_SALES, { headers: {
      Authorization: dataUser.data.token,
    } });
    return data;
  } catch (error) {
    return { error: error.response };
  }
};
export default { getSalers };
