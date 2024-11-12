import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useNavigate } from "react-router-dom";
import { notifySuccess, notifyError, notifyWarning } from '../../../utils/toastNotification/toastNotification';

const LoginForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);  // State lưu thông tin người dùng

    // Xử lý thay đổi trong các input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Gửi request đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/sign-in-candidate', formData);
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken); // Lưu token vào localStorage

            // Giải mã token để lấy id người dùng
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id;

            // Gửi yêu cầu lấy thông tin người dùng từ backend
            const userResponse = await axios.get(`http://localhost:5000/api/v1/candidate/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Gửi token trong header để xác thực
                }
            });

            // Lưu thông tin người dùng vào state
            setUserInfo(userResponse.data);
            navigate('/')
            notifySuccess('Login successful');
        } catch (error) {
            notifyError(error.response?.data || 'Error occurred during login');
        }
    };

    return (
        <div>
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mật Khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Đăng Nhập</button>
            </form>

            {message && <p>{message}</p>}

            {/* Hiển thị thông tin người dùng nếu đã đăng nhập thành công */}
            {userInfo && (
                <div>
                    <h3>Thông tin người dùng:</h3>
                    <p>ID: {userInfo.id}</p>
                    <p>Họ tên: {userInfo.fullName}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Vai trò: {userInfo.roleId}</p>
                    <p>Địa chỉ: {userInfo.address}</p>
                    <p>Số điện thoại: {userInfo.phone}</p>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
