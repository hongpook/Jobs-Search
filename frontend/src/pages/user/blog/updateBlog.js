import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbDetail from '../../../components/breadCrumbDetail';
import { notifyError, notifySuccess, notifyWarning } from '../../../utils/toastNotification/toastNotification';
import { useTranslation } from 'react-i18next';

const UpdateBlog = () => {
  const { t } = useTranslation();  // Lấy hàm t() từ useTranslation
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [blogImg, setBlogImg] = useState(null);
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = () => {
    notifyWarning(t('updateBlogCompany.cancel'));
    navigate('/companySide');
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/blog/${id}`);
        const { title, category, content, authorId, blogImg } = response.data;
        setTitle(title);
        setCategory(category);
        setContent(content);
        setAuthorId(authorId);
        setBlogImg(blogImg); // Lưu URL hình ảnh vào state
        
      } catch (error) {
        console.error('Error fetching blog:', error);
        notifyError(t('updateBlogCompany.failedToLoadBlog'));
      }
    };

    fetchBlog();
  }, [id, t]);

  const handleImageChange = (e) => {
    setBlogImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('authorId', authorId);
    if (blogImg) {
      formData.append('blogImg', blogImg);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/blog/${id}`, formData);
      notifySuccess(t('updateBlogCompany.blogUpdatedSuccessfully'));
      console.log(response.data);
      navigate('/companySide'); // Redirect sau khi cập nhật thành công
    } catch (error) {
      notifyError(t('updateBlogCompany.failedToUpdateBlog'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>

      <div className="container">
      <BreadCrumbDetail title={title} link={"companySide"} page={t('editJobCompany.yourProfile')}/>
        <h2 className="text-center mb-4 mt-4">{t('updateBlogCompany.updateBlog')}</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">{t('updateBlogCompany.title')}</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">{t('updateBlogCompany.category')}</label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">{t('updateBlogCompany.selectCategory')}</option>
              <option value="Job search tips">{t('updateBlogCompany.jobSearchTips')}</option>
              <option value="Recruitment solutions">{t('updateBlogCompany.recruitmentSolutions')}</option>
            </select>
          </div>

          <div className="mb-3" style={{display: 'none'}}>
            <label htmlFor="authorId" className="form-label">{t('updateBlogCompany.authorId')}</label>
            <input
              type="number"
              id="authorId"
              className="form-control"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              required
            />
          </div>

          {blogImg && (
            <div className="mb-3">
              <label htmlFor="currentImg" className="form-label">{t('updateBlogCompany.currentImage')}</label>
              <img
                src={blogImg}
                alt="Current Blog"
                id="currentImg"
                className="img-fluid mb-2"
                style={{ maxWidth: '200px' }} // Giới hạn kích thước hình ảnh
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="blogImg" className="form-label">{t('updateBlogCompany.changeImage')}</label>
            <input
              type="file"
              id="blogImg"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">{t('updateBlogCompany.content')}</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder={t('updateBlogCompany.writeContent')}
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
          <div className='col-6 p-3'>

          <div className='row'>
            <button type="submit" className="btn btn-primary col-3 me-3" disabled={loading}>
            {loading ? t('updateBlogCompany.updating') : t('updateBlogCompany.updateBlog')}
          </button>
            <button onClick={handleCancel} className="btn btn-danger col-3">
                {t('updateBlogCompany.cancel')}
            </button>
          </div>
        </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBlog;
