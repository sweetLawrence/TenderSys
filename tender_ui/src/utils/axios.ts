import axios from 'axios';

let prod_base_url = 'https://tenders.kenyenyattc.co.ke';
let local_base_url = 'http://localhost:3000'

const getBaseURL = () => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocalhost ? `${local_base_url}` : `${prod_base_url}`;
  };

  //@ts-ignore
  const getToken = () => {
    return localStorage.getItem('token');
  };

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', 
  },
});

export default axiosInstance;