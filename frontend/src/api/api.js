import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mini-inventory-5dck.onrender.com/api',
  withCredentials: true,
});

export default API;
