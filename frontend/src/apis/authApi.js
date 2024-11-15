
import axios from 'axios';

export const getCandidateInfo = async () => {
    const token = localStorage.getItem('token');
    return axios.get('http://localhost:5000/api/auth/candidate-info', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCompanyInfo = async () => {
    const token = localStorage.getItem('token');
    return axios.get('http://localhost:5000/api/auth/employee-info', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};