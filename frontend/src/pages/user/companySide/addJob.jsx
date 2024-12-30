import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { notifySuccess, notifyError, notifyWarning } from '../../../utils/toastNotification/toastNotification';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';

function AddNewJob() {
  const { t } = useTranslation(); // Hook để sử dụng t từ i18n
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
    notifyWarning(t('createJobCompany.noAction'));
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
      // console.log('Job created successfully:', response.data);
      notifySuccess(t('createJobCompany.jobCreatedSuccess'));
      navigate('/');
    } catch (error) {
      // console.error('Error creating job:', error);
      notifyError(t('createJobCompany.jobCreatedError'));
    }
  };

  return (
    <div className="form-container">
      <h2>{t('createJobCompany.createJob')}</h2> 
      <form onSubmit={handleSubmit} className="row">
        <div className="form-group col-6">
          <label>{t('createJobCompany.title')}</label> 
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('createJobCompany.titlePlaceholder')} 
            required
          />
        </div>

        <div className="form-group col-6">
          <label>{t('createJobCompany.salaryRange')}</label> 
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            placeholder={t('createJobCompany.salaryRangePlaceholder')} 
          />
        </div>

        <div className="form-group col-12">
          <label>{t('createJobCompany.location')}</label> 
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={t('createJobCompany.locationPlaceholder')} 
            required
          />
        </div>

        <div className="form-group col-12">
          <label>{t('createJobCompany.description')}</label> 
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder={t('createJobCompany.descriptionPlaceholder')}
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
          <label>{t('createJobCompany.requirements')}</label> 
          <ReactQuill
            value={formData.requirements}
            onChange={handleRequirementsChange}
            placeholder={t('createJobCompany.requirementsPlaceholder')} 
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
          <label>{t('createJobCompany.jobType')}</label> 
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            style={{ width: '100%', padding: '15px 0', marginTop: '5px' }}
          >
            <option value="Full-time">{t('createJobCompany.fullTime')}</option> 
            <option value="Part-time">{t('createJobCompany.partTime')}</option> 
            <option value="Internship">{t('createJobCompany.internship')}</option> 
            <option value="Freelance">{t('createJobCompany.freelance')}</option> 
          </select>
        </div>

        <div className="form-group col-6">
          <label>{t('createJobCompany.jobImage')}</label> 
          <input type="file" name="imageUrl" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="form-group col-6">
          <div className="row p-3">
            <button type="submit" className="btn btn-success col-3 me-2">
              {t('createJobCompany.createJobButton')} 
            </button>
            <button type="button" className="btn btn-danger col-3" onClick={cancel}>
              {t('createJobCompany.cancelButton')} 
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewJob;
