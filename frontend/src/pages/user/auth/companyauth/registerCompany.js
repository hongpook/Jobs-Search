import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { notifySuccess, notifyError } from '../../../../utils/toastNotification/toastNotification';
import { FcGoogle } from 'react-icons/fc'; 
import { FaFacebook } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
    const { t } = useTranslation(); // Hook i18n
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        contactPerson: '',
        roleId: 2,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/sign-up-employee', formData);
            notifySuccess(t('registerCompany.registrationSuccess')); // Sử dụng key dịch
            navigate('/login');
        } catch (error) {
            notifyError(error.response?.data.message || t('registerCompany.registrationError'));
        }
    };

    const handleGoogleLogin = () => {
        notifySuccess(t('registerCompany.googleLoginNotImplemented'));
    };

    const handleFacebookLogin = () => {
        notifySuccess(t('registerCompany.facebookLoginNotImplemented'));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">{t('registerCompany.registerAccount')}</h2>
                        <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">
                                {t('registerCompany.companyName')}
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                className="form-control"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder={t('registerCompany.companyNameForm')}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                {t('registerCompany.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('registerCompany.emailForm')}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                {t('registerCompany.password')}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={t('registerCompany.passwordForm')}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactPerson" className="form-label">
                                {t('registerCompany.contactPerson')}
                            </label>
                            <input
                                type="text"
                                id="contactPerson"
                                name="contactPerson"
                                className="form-control"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                placeholder={t('registerCompany.contactPersonForm')}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {t('registerCompany.register')}
                        </button>

                        {/* <div className="text-center my-3">
                            <span className="text-muted">{t('registerCompany.or')}</span>
                        </div>

                        <div className="d-flex">
                            <a
                                onClick={handleGoogleLogin}
                                className="btn-outline-danger d-flex align-items-center justify-content-center col-6"
                            >
                                <FcGoogle size={20} />&nbsp; {t('registerCompany.signUpWithGoogle')}
                            </a>
                            <a
                                onClick={handleFacebookLogin}
                                className="btn-outline-primary d-flex align-items-center justify-content-center col-6"
                            >
                                <FaFacebook size={20} />&nbsp; {t('registerCompany.signUpWithFacebook')}
                            </a>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCompany;
