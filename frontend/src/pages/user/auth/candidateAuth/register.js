import React, { useState } from 'react';
import axios from 'axios';
import { notifySuccess, notifyError } from '../../../../utils/toastNotification/toastNotification';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
    const { t } = useTranslation(); // Sử dụng hook dịch
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        roleId: 3,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/sign-up-candidate', formData);
            notifySuccess(response.data.message || t("registerCandidate.registering"));
            navigate('/login');
        } catch (error) {
            notifyError(error.response?.data.message || t("Error occurred during registration"));
        }
    };

    const handleGoogleLogin = () => {
        notifySuccess(t("registerCandidate.googleButton") + " " + t("not implemented yet!"));
    };

    const handleFacebookLogin = () => {
        notifySuccess(t("registerCandidate.facebookButton") + " " + t("not implemented yet!"));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">{t("registerCandidate.title")}</h2>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                {t("registerCandidate.fullName")}
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="form-control"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder={t("registerCandidate.fullNamePlaceholder")}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                {t("registerCandidate.email")}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t("registerCandidate.emailPlaceholder")}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                {t("registerCandidate.password")}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={t("registerCandidate.passwordPlaceholder")}
                                required
                            />
                        </div>
                        <div className="mb-3" style={{ display: 'none' }}>
                            <label htmlFor="roleId" className="form-label">
                                Role ID
                            </label>
                            <input
                                type="text"
                                id="roleId"
                                name="roleId"
                                className="form-control"
                                value={formData.roleId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            {t("registerCandidate.registerButton")}
                        </button>

                        {/* <div className="text-center my-3">
                            <span className="text-muted">{t("registerCandidate.or")}</span>
                        </div>

                        <div className='d-flex'>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn btn-outline-danger d-flex align-items-center justify-content-center col-6"
                            >
                                <FcGoogle size={20} /> &nbsp; {t("registerCandidate.googleButton")}
                            </button>
                            <button
                                type="button"
                                onClick={handleFacebookLogin}
                                className="btn btn-outline-primary d-flex align-items-center justify-content-center col-6"
                            >
                                <FaFacebook size={20} /> &nbsp; {t("registerCandidate.facebookButton")}
                            </button>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
