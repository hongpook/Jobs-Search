// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { notifySuccess, notifyError, notifyWarning } from '../../../../utils/toastNotification/toastNotification';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        roleId: '',  // Nếu có nhiều vai trò cho người dùng chọn, bạn có thể thêm field này
    });
    const [message, setMessage] = useState('');

    // Xử lý thay đổi trong các input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Gửi request đăng ký
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/sign-up-candidate', formData);
            setMessage(response.data);  // Hiển thị thông báo đăng ký thành công
            notifySuccess("Register account successfully!")
        } catch (error) {
            // setMessage(error.response?.data || 'Error occurred during registration');
            notifyError("Error occurred during registration")
        }
    };

    return (
        <div>
            <h2>Đăng Ký Tài Khoản</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Họ và Tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div>
                    <label>Vai Trò (RoleId)</label>
                    <input
                        type="text"
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Đăng Ký</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterForm;
