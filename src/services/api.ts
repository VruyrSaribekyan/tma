import axios from 'axios';

const API_URL = 'http://127.0.0.1:8002';

export const fetchUserData = async (userId: number) => {
  const response = await axios.get(`${API_URL}/test/user_entry_check/${userId}`);
  return response.data;
};

export const sendUserData = async (userId: number, coins: number, energy: number) => {
  await axios.post(`${API_URL}/test/user_exit/${userId}`, {
    coins,
    energy,
  });
};
