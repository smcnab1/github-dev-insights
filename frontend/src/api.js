// api.js
import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL,
});

export const getCodeMetrics = async () => {
  const response = await api.get('/code-metrics');
  return response.data;
};