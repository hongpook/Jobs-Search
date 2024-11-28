const blogService = require('../services/blogServices');
const cloudinary = require('../config/cloudinary'); 

const createBlog = async (req, res) => {
    try {
      const blogData = req.body;
      const files = req.files; // Nếu sử dụng multer để upload file
      const newBlog = await blogService.createBlog(blogData, files);
      return res.status(201).json(newBlog);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
// Controller để lấy tất cả các bài blog
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller để lấy một bài blog theo ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;  // Lấy ID từ URL
      const data = req.body;      // Lấy dữ liệu từ form
      const files = req.files;    // Lấy files (hình ảnh) từ form-data (sử dụng middleware như multer để xử lý file)
  
      // Gọi service để cập nhật bài blog
      const updatedBlog = await blogService.updateBlog(id, data, files);
  
      // Trả về blog đã được cập nhật
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: error.message });  // Trả về lỗi nếu có
    }
  };
  
// Controller để xóa bài blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await blogService.deleteBlog(id);
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
