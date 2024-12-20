import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import jwtDecode from "jwt-decode"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { notifyError, notifySuccess } from '../../../utils/toastNotification/toastNotification';
import {useNavigate } from "react-router-dom";

const ResumeUploadForm = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    position: '',
    careerObjective: '',
    workExperience: '',
    education: '',
    skills: '',
    certificates: '',
    projects: '',
    interests: '',
    candidateId: userId,
  });

  const handleQuillChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/resume', formData);
      notifySuccess('Resume uploaded successfully!');
      navigate('/candidateSide')
    } catch (error) {
      console.error('Error uploading resume:', error);
      notifyError('Failed to upload resume.');
    }
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-info text-white text-center py-4">
              <h2 className="mb-0">Upload New Resume</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                  <ReactQuill
                    value={formData.name}
                    onChange={(value) => handleQuillChange(value, 'name')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                  <ReactQuill
                    value={formData.email}
                    onChange={(value) => handleQuillChange(value, 'email')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
                  <ReactQuill
                    value={formData.phone}
                    onChange={(value) => handleQuillChange(value, 'phone')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedin" className="form-label fw-bold">LinkedIn Profile</label>
                  <ReactQuill
                    value={formData.linkedin}
                    onChange={(value) => handleQuillChange(value, 'linkedin')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="position" className="form-label fw-bold">Position</label>
                  <ReactQuill
                    value={formData.position}
                    onChange={(value) => handleQuillChange(value, 'position')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="careerObjective" className="form-label fw-bold">Career Objective</label>
                  <ReactQuill
                    value={formData.careerObjective}
                    onChange={(value) => handleQuillChange(value, 'careerObjective')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="workExperience" className="form-label fw-bold">Work Experience</label>
                  <ReactQuill
                    value={formData.workExperience}
                    onChange={(value) => handleQuillChange(value, 'workExperience')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="education" className="form-label fw-bold">Education</label>
                  <ReactQuill
                    value={formData.education}
                    onChange={(value) => handleQuillChange(value, 'education')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="skills" className="form-label fw-bold">Skills</label>
                  <ReactQuill
                    value={formData.skills}
                    onChange={(value) => handleQuillChange(value, 'skills')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="certificates" className="form-label fw-bold">Certificates</label>
                  <ReactQuill
                    value={formData.certificates}
                    onChange={(value) => handleQuillChange(value, 'certificates')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="projects" className="form-label fw-bold">Projects</label>
                  <ReactQuill
                    value={formData.projects}
                    onChange={(value) => handleQuillChange(value, 'projects')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="interests" className="form-label fw-bold">Interests</label>
                  <ReactQuill
                    value={formData.interests}
                    onChange={(value) => handleQuillChange(value, 'interests')}
                    className="bg-white border rounded"
                    theme="snow"
                  />
                </div>
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg hover-elevate-up"
                  >
                    Upload Resume
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadForm;
