import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../../utils/toastNotification/toastNotification";
import { useTranslation } from "react-i18next";

const CreateBlog = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [blogImg, setBlogImg] = useState(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const navigate = useNavigate();

  const handleCancel = () => {
    notifyWarning(t("createBlogCompany.noAction"));
    navigate("/");
  };

  const handleImageChange = (e) => {
    setBlogImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("authorId", userId);
    if (blogImg) {
      formData.append("blogImg", blogImg);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/blogs",
        formData
      );
      notifySuccess(t("createBlogCompany.successMessage"));
      navigate("/");
      console.log(response.data);
      // Reset form after successful submission
      setTitle("");
      setCategory("");
      setContent("");
      setAuthorId("");
      setBlogImg(null);
    } catch (error) {
      notifyError(t("createBlogCompany.errorMessage"));
      console.error("Error creating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">{t("createBlogCompany.title")}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {t("createBlogCompany.titleLabel")}
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("createBlogCompany.titlePlaceholder")}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            {t("createBlogCompany.categoryLabel")}
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">{t("createBlogCompany.selectCategory")}</option>
            <option value="Job search tips">
              {t("createBlogCompany.category1")}
            </option>
            <option value="Recruitment solutions">
              {t("createBlogCompany.category2")}
            </option>
          </select>
        </div>

        <div className="mb-3" style={{ display: "none" }}>
          <label htmlFor="authorId" className="form-label">
            {t("createBlogCompany.authorIdLabel")}
          </label>
          <input
            type="number"
            id="authorId"
            className="form-control"
            value={userId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="blogImg" className="form-label">
            {t("createBlogCompany.imageLabel")}
          </label>
          <input
            type="file"
            id="blogImg"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            {t("createBlogCompany.contentLabel")}
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder={t("createBlogCompany.contentPlaceholder")}
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
          />
        </div>

        <div className="col-6 p-3">
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-3 me-3"
              disabled={loading}
            >
              {loading
                ? t("createBlogCompany.creating")
                : t("createBlogCompany.createButton")}
            </button>
            <button onClick={handleCancel} className="btn btn-danger col-3">
              {t("createBlogCompany.cancelButton")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
