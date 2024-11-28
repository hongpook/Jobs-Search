import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BreadCrumbDetail from '../../../components/breadCrumbDetail';
import BannerBlog from '../../../components/bannerBlog';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading blog details...</p>;
  }

  return (
    <section>

        <div className='container'>
          <BreadCrumbDetail title={blog.title} link={"all-blogs"}
          page={"Blogs list"}/>
                    <h2 className='mt-5 mb-3'>{blog.title}</h2>
            <div className='row'>
                <div className='col-8'>
                    <p>Category: {blog.category}</p>
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: blog.content }} />

                </div>
                <div className='col-4'>
                  <BannerBlog/>
                </div>
            </div>
        </div>
    </section>
  );
};

export default BlogDetails;
