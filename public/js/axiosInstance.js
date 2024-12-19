// axiosInstance.js
const axiosInstance = axios.create({
  baseURL: 'https://kdt-api.fe.dev-cos.com',
  headers: {
    'x-username': 'sajotuna',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;