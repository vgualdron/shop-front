import axios from 'axios';

export const http = ({ url, method, data }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios({
    url,
    method,
    data,
    headers: {
      Authorization: token ? `Bearer ${token.plainTextToken}` : null,
    },
  });
};

export default {};
