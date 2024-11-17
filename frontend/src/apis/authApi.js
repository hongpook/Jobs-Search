import apiClient from './apiClient'; // Import apiClient đã cấu hình

// Lấy thông tin ứng viên
export const getCandidateInfo = async () => {
    try {
        const response = await apiClient.get('/auth/candidate-info');
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching candidate info:', error);
        throw error;
    }
};

// Lấy thông tin công ty
export const getCompanyInfo = async () => {
    try {
        const response = await apiClient.get('/auth/employee-info');
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching company info:', error);
        throw error;
    }
};
