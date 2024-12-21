import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { notifySuccess, notifyError } from '../../../../utils/toastNotification/toastNotification';

import imgLogin from '../../../../assets/images/imgLogin.png';
import "../login.css";

const LoginForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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

            localStorage.setItem('accessToken', accessToken);

            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id;

            const userResponse = await axios.get(`http://localhost:5000/api/v1/candidate/${userId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            notifySuccess(t('login.success'));
            navigate('/');
        } catch (error) {
            notifyError(t('login.error'));
        }
    };

    return (
        <div className="container">
            <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                    <div className="col-12 col-md-6 text-bg-primary">
                        <div className="d-flex align-items-center justify-content-center h-100" style={{ backgroundColor: '#29ca8e' }}>
                            <div className="col-10 col-xl-8 py-3">
                                <img
                                    className="img-fluid rounded mb-4"
                                    loading="lazy"
                                    src={imgLogin}
                                    alt="Logo"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                            <div className="mb-5">
                                <h3>{t('loginCandidate.title')}</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        {t('loginCandidate.emailLabel')} <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder={t('loginCandidate.emailPlaceholder')}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        {t('loginCandidate.passwordLabel')} <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder={t('loginCandidate.passwordPlaceholder')}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label text-secondary" htmlFor="rememberMe">
                                        {t('loginCandidate.rememberMe')}
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        {t('loginCandidate.loginButton')}
                                    </button>
                                </div>
                            </form>
                            <hr className="mt-5 mb-4 border-secondary-subtle" />
                            <div className="d-flex justify-content-between">
                                <a href="#!" className="link-secondary text-decoration-none">
                                    {t('loginCandidate.createAccount')}
                                </a>
                                <a href="#!" className="link-secondary text-decoration-none">
                                    {t('loginCandidate.forgotPassword')}
                                </a>
                            </div>
                            <p className="mt-5">{t('loginCandidate.orSignInWith')}</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-outline-primary">
                                    <span>{t('loginCandidate.google')}</span>
                                </button>
                                <button className="btn btn-outline-primary">
                                    <span>{t('loginCandidate.facebook')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
