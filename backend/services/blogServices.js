const db = require('../models/index');
const cloudinary = require("../config/cloudinary");

const createBlog = async (data, files) => {
    try {
      if (files && files.blogImg && files.blogImg[0]) {
        const result = await cloudinary.uploader.upload(files.blogImg[0].path, {
          folder: 'blogImages',
        });
        data.blogImg = result.secure_url; // URL hình ảnh sau khi upload
      }
  
      const blog = await db.Blogs.create(data);
      return blog;
    } catch (error) {
      console.error('Error during upload:', error);
      throw new Error(error.message);
    }
  };

// Service để lấy tất cả các bài blog
const getAllBlogs = async () => {
  return await db.Blogs.findAll({
    include: [{ model: db.Employees, as: 'author', attributes: ['id', 'companyName', 'contactPerson'] }]
  });
};

// Service để lấy một bài blog theo ID
const getBlogById = async (id) => {
  return await db.Blogs.findByPk(id, {
    include: [{ model: db.Employees, as: 'author', attributes: ['id', 'companyName', 'contactPerson'] }]
  });
};

const updateBlog = async (id, data, files) => {
    try {
      // Kiểm tra và xử lý hình ảnh nếu có
      if (files && files.blogImg && files.blogImg[0]) {
        const imageResult = await cloudinary.uploader.upload(files.blogImg[0].path, {
          folder: 'blogImages', // Folder của bạn trên Cloudinary
        });
        data.blogImg = imageResult.secure_url;  // Lưu URL của hình ảnh vào cơ sở dữ liệu
      }
  
      // Cập nhật dữ liệu blog
      const blog = await db.Blogs.update(data, {
        where: { id },  // Điều kiện tìm kiếm theo ID
        returning: true,  // Trả về dữ liệu đã cập nhật
      });
  
      if (blog[0] === 0) {
        throw new Error('Blog not found');  // Nếu không tìm thấy blog
      }
  
      return blog[1][0];  // Trả về đối tượng blog đã được cập nhật
    } catch (error) {
      console.error('Error during update:', error);
      throw new Error('Error updating blog: ' + error.message);
    }
  };
  

// Service để xóa bài blog
const deleteBlog = async (id) => {
  try {
    const blog = await db.Blogs.findByPk(id);

    if (!blog) {
      throw new Error('Blog not found');
    }

    await blog.destroy();
    return { message: 'Blog deleted successfully' };
  } catch (error) {
    console.error('Error during blog deletion:', error);
    throw new Error('Error deleting blog: ' + error.message);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
