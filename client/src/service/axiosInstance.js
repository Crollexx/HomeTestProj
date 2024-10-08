import axios from 'axios';

const apiAxiosInstance = axios.create({
    baseURL: '/api',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,  
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

// В каждый запрос добавляет HTTP заголовок Authorization
apiAxiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      if (error.response.status === 403 && !prevRequest.sent) {
        const response = await axios.get('/api/token/refresh');
        accessToken = response.data.accessToken;
        prevRequest.sent = true;
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiAxiosInstance(prevRequest);
      }
      return Promise.reject(error);
    },
);
  

  
export default apiAxiosInstance;