import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS cho ReactQuill
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [blogImg, setBlogImg] = useState(null);
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await axios.post('http://localhost:5000/api/v1/blogs', formData);
      alert('Blog created successfully');
      console.log(response.data);
      // Reset form after successful submission
      setTitle('');
      setCategory('');
      setContent('');
      setAuthorId('');
      setBlogImg(null);
    } catch (error) {
      setError('Failed to create blog. Please try again.');
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
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
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Job search tips">Job search tips</option>
            <option value="Recruitment solutions">Recruitment solutions</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="authorId" className="form-label">Author ID</label>
          <input
            type="number"
            id="authorId"
            className="form-control"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="blogImg" className="form-label">Image</label>
          <input
            type="file"
            id="blogImg"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your blog content here..."
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
