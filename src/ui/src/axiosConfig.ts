import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3036';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

axios.interceptors.response.use(
  (response) => {
    console.log('response', response);
    return response;
  },
  (error) => {
    console.log('error', error);
    return error;
  }
);

export default axios;
