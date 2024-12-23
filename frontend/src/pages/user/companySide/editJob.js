import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { notifyError, notifySuccess, notifyWarning } from '../../../utils/toastNotification/toastNotification';
import BreadCrumbDetail from '../../../components/breadCrumbDetail';
import { useTranslation } from 'react-i18next';

function EditJob() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salaryRange: '',
    jobType: 'Full-time',
    location: '',
    employerId: '',  
    imageUrl: '',  
  });

  const [file, setFile] = useState(null);  
  const [loading, setLoading] = useState(true);  

  const { id } = useParams(); 
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);  
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleRequirementsChange = (value) => {
    setFormData({
      ...formData,
      requirements: value,
    });
  };

  const handleCancel = () => {
    notifyWarning(t("nothingToUpdate"));
    navigate('/companySide');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (file) {
      data.append('imageUrl', file);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/job/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Job updated successfully:', response.data);
      notifySuccess(t('editJobCompany.jobUpdatedSuccess'));
      navigate(`/companySide`);
    } catch (error) {
      console.error('Error updating job:', error);
      notifyError(t('editJobCompany.jobUpdatedError'));
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/job/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
        alert('Error fetching job data');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div>{t('editJobCompany.loading')}</div>;
  }

  return (
    <section className='container'>
      <BreadCrumbDetail title={t('editJobCompany.editJob')}
          link={"companySide"}
          page={t('editJobCompany.yourProfile')}/>
      <div className="form-container">
        <h2>{t('editJobCompany.editJob')}</h2>
        <form onSubmit={handleSubmit} className="row">
          <div className="form-group col-6">
            <label>{t('editJobCompany.title')}</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('editJobCompany.titlePlaceholder')}
              required
              className="form-control"
            />
          </div>

          <div className="form-group col-6">
            <label>{t('editJobCompany.salaryRange')}</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder={t('editJobCompany.salaryRangePlaceholder')}
              className="form-control"
            />
          </div>

          <div className="form-group col-12">
            <label>{t('editJobCompany.description')}</label>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              placeholder={t('editJobCompany.descriptionPlaceholder')}
              theme="snow"
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              className="form-control"
            />
          </div>

          <div className="form-group col-12">
            <label>{t('editJobCompany.requirements')}</label>
            <ReactQuill
              value={formData.requirements}
              onChange={handleRequirementsChange}
              placeholder={t('editJobCompany.requirementsPlaceholder')}
              theme="snow"
              modules={{
                toolbar: [
                  [{ font: [] }],
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              className="form-control"
            />
          </div>

          <div className="form-group col-6 mt-2">
            <label>{t('editJobCompany.jobType')}</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="form-control"
              style={{ padding: '9px' }}
            >
              <option value="Full-time">{t('editJobCompany.fullTime')}</option>
              <option value="Part-time">{t('editJobCompany.partTime')}</option>
              <option value="Internship">{t('editJobCompany.internship')}</option>
              <option value="Freelance">{t('editJobCompany.freelance')}</option>
            </select>
          </div>

          <div className="form-group col-6">
            <label>{t('editJobCompany.location')}</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t('editJobCompany.locationPlaceholder')}
              required
              className="form-control"
            />
          </div>

          <div className="form-group col-6">
            <label>{t('editJobCompany.jobImage')}</label>
            <input
              type="file"
              name="imageUrl"
              onChange={handleFileChange}
              accept="image/*"
              className="form-control"
            />
            {formData.imageUrl && <img src={formData.imageUrl} alt="current" width="100" className="mt-2" />}
          </div>

          <div className="form-group col-6 pt-4">
            <button type="submit" className="btn btn-success col-6 me-2">{t('editJobCompany.updateJob')}</button>
            <button type="button" onClick={handleCancel} className="btn btn-danger col-5">{t('editJobCompany.cancel')}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditJob;
