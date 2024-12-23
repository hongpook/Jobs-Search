import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/breadCrumb";
import { useTranslation } from 'react-i18next';

const AllBlogs = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Lấy danh sách các bài viết từ API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/blogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Đặt filteredBlogs ban đầu bằng tất cả các bài viết
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Xử lý thay đổi category khi người dùng chọn
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    if (e.target.value === "") {
      setFilteredBlogs(blogs); // Hiển thị tất cả bài blog nếu không chọn category
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.category === e.target.value)
      );
    }
  };

  return (
    <section>
      <BreadCrumb title={t('blogList.allBlogsTitle')} />
      <h2>{t('blogList.allBlogsTitle')}</h2>
      <div className="container">
        <div className="mb-3 ">
          <label htmlFor="category" className="form-label">
          {t('blogList.filterByCategory')}
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-select" // Bootstrap class for styled select dropdown
          >
            <option value="">{t('blogList.allCategories')}</option>
            <option value="Job search tips">{t('blogList.jobSearchTips')}</option>
            <option value="Recruitment solutions">{t('blogList.recruitmentSolutions')}</option>
            {/* Add more categories here */}
          </select>
        </div>

        {filteredBlogs.length === 0 ? (
          <p>{t('blogList.noBlogsFound')}</p>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-8">
                {filteredBlogs.map((blog) => (
                  <Link to={`/blog-detail/${blog.id}`}>
                    <div
                      className="row mb-4"
                      key={blog.id}
                      style={{
                        "box-shadow": "0 2px 6px rgba(26, 31, 28, .08)",
                      }}
                    >
                      <div className="col-3">
                        <img
                          src={blog.blogImg}
                          alt={blog.title}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-9 p-3">
                        <div>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <h4>{blog.title}</h4>
                        {/* Sử dụng dangerouslySetInnerHTML để hiển thị nội dung HTML */}
                        <div
                        className="truncated-text"
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="col-4"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;
