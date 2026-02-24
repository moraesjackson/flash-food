import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://192.168.0.5:1337/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});