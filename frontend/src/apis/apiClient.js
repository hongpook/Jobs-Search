import axios from 'axios';

const apiClient = axios.create({
    baseURL:  'http://localhost:5000/api', // Base URL mặc định
});


// Thêm interceptor để thêm token vào header của tất cả các request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
