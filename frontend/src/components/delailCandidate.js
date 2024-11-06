import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory

function UpdateCandidate() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        positionDesired: '',
        salaryExpected: 0,
        skills: '',
        experience: '',
        education: '',
        address: '',
        avt: null,  // avatar file
        cvFile: null, // cv file
        roleId: '',  // roleId mới
    });

    const [roles, setRoles] = useState([]); // Danh sách vai trò (roles)
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Khai báo navigate để điều hướng sau khi cập nhật

    // Fetch danh sách roles khi component load
    useEffect(() => {

        // Fetch dữ liệu ứng viên để điền vào form
        axios.get(`http://localhost:5000/api/v1/candidate/${id}`)
            .then(response => {
                const candidate = response.data;
                setFormData({
                    fullName: candidate.fullName,
                    email: candidate.email,
                    phone: candidate.phone,
                    positionDesired: candidate.positionDesired,
                    salaryExpected: candidate.salaryExpected,
                    skills: candidate.skills,
                    experience: candidate.experience,
                    education: candidate.education,
                    address: candidate.address,
                    avt: candidate.avt, // URL avatar hiện tại
                    cvFile: candidate.cvFile, // URL CV hiện tại
                    roleId: candidate.roleId, // Gán roleId hiện tại của ứng viên
                });
            })
            .catch(error => {
                console.error('Error fetching candidate:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0], // Lấy file đầu tiên nếu có
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/v1/candidate/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Hiển thị kết quả sau khi cập nhật thành công
            navigate(`/`); // Điều hướng sau khi cập nhật thành công
        } catch (error) {
            console.error(error); // Hiển thị lỗi nếu có
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="positionDesired" value={formData.positionDesired} onChange={handleChange} placeholder="Position Desired" />
            <input type="number" name="salaryExpected" value={formData.salaryExpected} onChange={handleChange} placeholder="Salary Expected" />
            <textarea name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" />
            <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />
            <textarea name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />

            {/* Avatar File Input */}
            <input type="file" name="avt" onChange={handleFileChange} />
            {formData.avt && <img src={formData.avt} alt="Avatar" width="100" height="100" />}

            {/* CV File Input */}
            <input type="file" name="cvFile" onChange={handleFileChange} />
            {formData.cvFile && <a href={formData.cvFile} target="_blank" rel="noopener noreferrer">View CV</a>}

            

            <button type="submit">Update</button>
        </form>
    );
}

export default UpdateCandidate;
