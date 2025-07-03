import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mini-inventory-three.vercel.app/api',
  withCredentials: true,
});

export default API;
