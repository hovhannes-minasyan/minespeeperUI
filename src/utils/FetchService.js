import { create as createInstance } from "axios";
const axios = createInstance({
  baseURL: 'http://localhost:9000/'
});

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
  return config;
});
export default axios;
