import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbDetail from '../../../components/breadCrumbDetail';
import {useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from '../../../utils/toastNotification/toastNotification';

const ResumeDetail = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedResume, setUpdatedResume] = useState({});

  const navigate = useNavigate();


  useEffect(() => {
    const fetchResumeDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/resume/${id}`);
        setResume(response.data);
        setLoading(false);
        setUpdatedResume(response.data);
      } catch (error) {
        setError('Error fetching resume details');
        setLoading(false);
      }
    };

    fetchResumeDetail();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (name, value) => {
    setUpdatedResume({
      ...updatedResume,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/resume/${id}`, updatedResume);
      notifySuccess('Resume updated successfully!');
      setIsEditing(false);
      setResume(response.data);
    } catch (error) {
      // console.error('Error updating resume:', error);
      notifyError('Failed to update resume.');
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <section>
        <BreadCrumbDetail title={"Resume "+updatedResume.name} link={"candidateSide"} page={"Your profile"}/>
        <br/>
      <div className="container ">
        {resume && (
          <>
            <div className="row justify-content-end">
                  {!isEditing ? (
                    <button
                      className="btn btn-info col-2"
                      onClick={handleEditToggle}
                    >
                      <i className="bi bi-pencil me-2"></i>Edit Resume
                    </button>
                  ) : (
                    <button
                      className="btn btn-success col-2"
                      onClick={handleSubmit}
                    >
                      <i className="bi bi-save me-2"></i>Save Changes
                    </button>
                  )}
                </div>
                <br/>
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-8">
              
                <div className="card shadow-sm">
                <br/>
                  

                  <div className="card-body" style={{padding:'20px 60px'}}>
                    {/* Contact Information */}
                    <div className="text-center mb-4" >
                      <h2 className="display-6 mb-2" style={{color: ' #00BFFF'}}>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control text-center"
                            value={updatedResume.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Enter your name"
                          />
                        ) : (
                          resume.name
                        )}
                      </h2>
                      <div>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control"
                              value={updatedResume.position}
                              onChange={(e) => handleChange('position', e.target.value)}
                            />
                          ) : (
                            <h5>{resume.position}</h5>
                          )}
                        </div>
                      <br/>
                      <div className="d-flex justify-content-center gap-4">
                        <div>
                          <strong>Email: </strong>
                          {isEditing ? (
                            <input
                              type="email"
                              className="form-control"
                              value={updatedResume.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                            />
                          ) : (
                            <span>{resume.email}</span>
                          )}
                        </div>
                        
                        <div>
                          <strong>Phone: </strong>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control"
                              value={updatedResume.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                            />
                          ) : (
                            <span>{resume.phone}</span>
                          )}
                        </div>
                        <div>
                          <strong>LinkedIn: </strong>
                          {isEditing ? (
                            <input
                              type="text"
                              className="form-control"
                              value={updatedResume.linkedin}
                              onChange={(e) => handleChange('linkedin', e.target.value)}
                            />
                          ) : (
                            <span>{resume.linkedin}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Resume Sections */}
                    {[
                      // { 
                      //   title: 'Position', 
                      //   key: 'position', 
                      //   type: 'input' 
                      // },
                      { 
                        title: 'Career Objective', 
                        key: 'careerObjective', 
                        type: 'rich' 
                      },
                      { 
                        title: 'Work Experience', 
                        key: 'workExperience', 
                        type: 'rich' 
                      },
                      { 
                        title: 'Education', 
                        key: 'education', 
                        type: 'rich' 
                      },
                      { 
                        title: 'Skills', 
                        key: 'skills', 
                        type: 'rich' 
                      },
                      { 
                        title: 'Certificates', 
                        key: 'certificates', 
                        type: 'rich' 
                      },
                      { 
                        title: 'Projects', 
                        key: 'projects', 
                        type: 'rich' 
                      },
                      { 
                        title: 'Interests', 
                        key: 'interests', 
                        type: 'textarea' 
                      }
                    ].map((section) => (
                      <div key={section.key} className="mb-3  pb-3">
                        <h5 className="  pb-1"  style={{'border-bottom': '2px solid #00BFFF', color: '#00BFFF'}}>{section.title}</h5>
                        {isEditing ? (
                          section.type === 'rich' ? (
                            <ReactQuill
                              value={updatedResume[section.key] || ''}
                              onChange={(value) => handleChange(section.key, value)}
                              className="bg-white"
                            />
                          ) : section.type === 'input' ? (
                            <input
                              type="text"
                              className="form-control"
                              value={updatedResume[section.key] || ''}
                              onChange={(e) => handleChange(section.key, e.target.value)}
                            />
                          ) : (
                            <textarea
                              className="form-control"
                              value={updatedResume[section.key] || ''}
                              onChange={(e) => handleChange(section.key, e.target.value)}
                              rows="4"
                            />
                          )
                        ) : (
                          section.type === 'rich' ? (
                            <div
                              className="ql-editor"
                              dangerouslySetInnerHTML={{ 
                                __html: resume[section.key] || 'N/A' 
                              }}
                            />
                          ) : (
                            <p className="text-muted">
                              {resume[section.key] || 'N/A'}
                            </p>
                          )
                        )}
                      </div>
                    ))}

                    
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </section>
  );
};

export default ResumeDetail;
