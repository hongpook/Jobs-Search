import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../components/breadCrumb";

const BlogByCategory = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryToFilter = category; // Lấy category từ props

  // Lấy danh sách các bài viết từ API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/blogs");
        // Lọc các bài blog theo category cụ thể
        const filteredBlogs = response.data.filter(
          (blog) => blog.category === categoryToFilter
        );
        setBlogs(filteredBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [categoryToFilter]); // Thêm dependency để fetch lại nếu category thay đổi

  if (loading) {
    return <p>Loading...</p>; // Hiển thị loading khi đang fetch dữ liệu
  }

  return (
    <section>
      <BreadCrumb title={`${categoryToFilter}`} />
      <h2>Blogs in Category: {categoryToFilter}</h2>

      {blogs.length === 0 ? (
        <p>No blogs found for the selected category</p>
      ) : (
        <div className="container">
          <div className="row mb-3">
            <div className="col-8">
              {blogs.map((blog) => (
                <Link to={`/blog-detail/${blog.id}`}>
                  <div
                    className="row"
                    key={blog.id}
                    style={{ "box-shadow": "0 2px 6px rgba(26, 31, 28, .08)" }}
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
                        <a>{categoryToFilter}</a> &nbsp;
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
    </section>
  );
};

export default BlogByCategory;
