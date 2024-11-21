import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { notifySuccess, notifyError, notifyWarning } from '../../../utils/toastNotification/toastNotification';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function AddNewJob() {
  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salaryRange: '',
    jobType: 'Full-time',
    location: '',
    employerId: userId,
  });

  const [file, setFile] = useState(null);

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
    setFile(files[0]); // Chỉ lấy file đầu tiên
  };

  // Hàm thay đổi giá trị ReactQuill cho description
  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  // Hàm thay đổi giá trị ReactQuill cho requirements
  const handleRequirementsChange = (value) => {
    setFormData({
      ...formData,
      requirements: value,
    });
  };

  const cancel = () => {
    notifyWarning('No thing!!!');
    navigate('/');
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
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/jobs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Job created successfully:', response.data);
      notifySuccess('Job created successfully!');
      navigate('/companySide');
    } catch (error) {
      console.error('Error creating job:', error);
      notifyError('Error creating job');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit} className="row">
        <div className="form-group col-6">
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

        <div className="form-group col-6">
          <label>Salary Range</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder="Enter salary range"
          />
        </div>

        <div className="form-group col-12">
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

        <div className="form-group col-12">
          <label>Description</label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Enter job description"
            theme="snow"
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['link', 'image'],
                ['clean'],
              ],
            }}
          />
        </div>

        <div className="form-group col-12">
          <label>Requirements</label>
          <ReactQuill
            value={formData.requirements}
            onChange={handleRequirementsChange}
            placeholder="Enter job requirements"
            theme="snow"
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['link', 'image'],
                ['clean'],
              ],
            }}
          />
        </div>

        <div className="form-group col-6">
          <label>Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            style={{ width: '100%', padding: '15px 0', marginTop: '5px' }}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div className="form-group col-6">
          <label>Job Image</label>
          <input type="file" name="imageUrl" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="form-group col-6">
          <div className="row p-3">
            <button type="submit" className="btn btn-success col-3 me-2">
              Create Job
            </button>
            <button type="button" className="btn btn-danger col-3" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewJob;
