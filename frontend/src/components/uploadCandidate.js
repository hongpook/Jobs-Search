import React, { useState } from 'react';
import axios from 'axios';

function CandidateForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        birthDate: '',
        address: '',
        positionDesired: '',
        salaryExpected: '',
        skills: '',
        experience: '',
        education: '',
        roleId: 1,
    });

    const [files, setFiles] = useState({
        avt: null,
        cvFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles({ ...files, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        // Thêm dữ liệu form vào FormData
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        // Thêm file vào FormData
        if (files.avt) data.append('avt', files.avt);
        if (files.cvFile) data.append('cvFile', files.cvFile);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/candidates', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Candidate created:', response.data);
            alert('Candidate created successfully');
        } catch (error) {
            console.error('Error creating candidate:', error);
            alert('Failed to create candidate');
        }
    };

    return (
        <div className="form-container">
            <h2>Create Candidate</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Birth Date</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                    />
                </div>

                <div className="form-group">
                    <label>Position Desired</label>
                    <input
                        type="text"
                        name="positionDesired"
                        value={formData.positionDesired}
                        onChange={handleChange}
                        placeholder="Enter desired position"
                    />
                </div>

                <div className="form-group">
                    <label>Salary Expected</label>
                    <input
                        type="number"
                        name="salaryExpected"
                        value={formData.salaryExpected}
                        onChange={handleChange}
                        placeholder="Enter expected salary"
                    />
                </div>

                <div className="form-group">
                    <label>Skills</label>
                    <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Enter skills"
                    />
                </div>

                <div className="form-group">
                    <label>Experience</label>
                    <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Enter work experience"
                    />
                </div>

                <div className="form-group">
                    <label>Education</label>
                    <textarea
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="Enter education details"
                    />
                </div>

                <div className="form-group">
                    <label>Avatar (Image)</label>
                    <input
                        type="file"
                        name="avt"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label>CV File</label>
                    <input
                        type="file"
                        name="cvFile"
                        onChange={handleFileChange}
                        accept="application/pdf"
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                    >
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                </div>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CandidateForm;
