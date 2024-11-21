// frontend/src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { notifySuccess, notifyError } from '../../../../utils/toastNotification/toastNotification';
import { FcGoogle } from 'react-icons/fc'; 
import { FaFacebook } from 'react-icons/fa';

const RegisterCompany = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: '',
        contactPerson: '',
        roleId: 2,
    });

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit the registration form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/sign-up-employee', formData);
            notifySuccess(response.data.message || 'Registration successful!');
        } catch (error) {
            notifyError(error.response?.data.message || 'An error occurred during registration');
        }
    };

    const handleGoogleLogin = () => {
        notifySuccess("Google login not implemented yet!");
    };

    const handleFacebookLogin = () => {
        notifySuccess("Facebook login not implemented yet!");
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                    <h2 className="text-center mb-4">Register Account</h2>
                        <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                className="form-control"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactPerson" className="form-label">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                id="contactPerson"
                                name="contactPerson"
                                className="form-control"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3" style={{display: 'none'}}>
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
                            Register
                        </button>

                        {/* Divider */}
                    <div className="text-center my-3">
                        <span className="text-muted">or</span>
                    </div>

                    {/* Third-party buttons */}
                    <div className='d-flex'>
                        <a
                            onClick={handleGoogleLogin}
                            className=" btn-outline-danger d-flex align-items-center justify-content-center col-6"
                        >
                            <FcGoogle size={20} />&nbsp; Sign up with Google
                        </a>
                        <a
                            onClick={handleFacebookLogin}
                            className=" btn-outline-primary d-flex align-items-center justify-content-center col-6"
                        >
                            <FaFacebook size={20} />&nbsp; Sign up with Facebook
                        </a>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCompany;
