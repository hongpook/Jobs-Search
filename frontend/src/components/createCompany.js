import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeeForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        website: '',
        description: '',
        contactPerson: '',
        roleId: '',
    });
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        if (logo) data.append('logo', logo);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/employees', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Employee created successfully!');
            console.log('Employee created:', response.data);
        } catch (error) {
            setError('Error creating employee');
            console.error('Error creating employee:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Website</label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Contact Person</label>
                    <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Role ID</label>
                    <input
                        type="number"
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Logo</label>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleFileChange}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit">Submit</button>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AddEmployeeForm;
