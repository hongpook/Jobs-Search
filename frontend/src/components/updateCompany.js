import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployeeForm = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        description: '',
        contactPerson: '',
        roleId: '',
    });
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy dữ liệu của nhân viên từ API theo ID
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/employee/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
                setError("Error fetching employee data");
            }
        };
        fetchEmployee();
    }, [id]);

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
            await axios.put(`http://localhost:5000/api/v1/employee/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Employee updated successfully!');
            navigate('/'); // Điều hướng về trang chủ hoặc trang danh sách nhân viên sau khi cập nhật thành công
        } catch (error) {
            setError('Error updating employee');
            console.error('Error updating employee:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Employee</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <button type="submit">Update</button>
                )}
            </form>
        </div>
    );
};

export default UpdateEmployeeForm;
