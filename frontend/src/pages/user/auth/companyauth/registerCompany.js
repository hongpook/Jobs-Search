// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { notifySuccess, notifyError, notifyWarning } from '../../../../utils/toastNotification/toastNotification';

const RegisterCompany = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        contactPerson: '',
        roleId: '',  // Nếu vai trò có nhiều lựa chọn, có thể thêm dropdown hoặc radio cho field này
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
            const response = await axios.post('http://localhost:5000/api/auth/sign-up-employee', formData);
            notifySuccess(response.data.message || 'Đăng ký thành công!');  // Hiển thị thông báo thành công
        } catch (error) {
            notifyError(error.response?.data.message || 'Có lỗi xảy ra trong quá trình đăng ký');
        }
    };

    return (
        <div>
            <h2>Đăng Ký Tài Khoản</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên Công Ty</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
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
                    <label>Người Liên Hệ</label>
                    <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
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

export default RegisterCompany;
