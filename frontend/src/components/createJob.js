import React, { useState } from 'react';
import axios from 'axios';

function CreateJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salaryRange: '',
    jobType: 'Full-time',
    location: '',
    employerId: '', // Employer ID được điền sau
  });

  const [file, setFile] = useState(null);  // Để lưu trữ file hình ảnh

  // Hàm thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm thay đổi file
  const handleFileChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);  // Chỉ lấy file đầu tiên
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
  
    // Thêm các trường form vào FormData
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    // Thêm file vào FormData nếu có
    if (file) {
      data.append('imageUrl', file);
      console.log('FormData with image:', data);  // In ra để kiểm tra
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/jobs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Cấu hình gửi file
        },
      });
      console.log('Job created successfully:', response.data);
      alert('Job created successfully');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Error creating job');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            required
          />
        </div>

        <div className="form-group">
          <label>Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Enter job requirements"
          />
        </div>

        <div className="form-group">
          <label>Salary Range</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="Enter salary range"
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter job location"
            required
          />
        </div>

        <div className="form-group">
          <label>Employer ID</label>
          <input
            type="text"
            name="employerId"
            value={formData.employerId}
            onChange={handleChange}
            placeholder="Enter employer ID"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Image</label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJob;
