import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Đảm bảo đã cài ReactQuill và các style của nó
import 'react-quill/dist/quill.snow.css'; // Style mặc định của ReactQuill
import { notifyError, notifySuccess, notifyWarning } from '../utils/toastNotification/toastNotification';
import BreadCrumbDetail from './breadCrumbDetail';

function EditJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salaryRange: '',
    jobType: 'Full-time',
    location: '',
    employerId: '',  // Employer ID được điền sau
    imageUrl: '',  // Để lưu URL của hình ảnh
  });

  const [file, setFile] = useState(null);  // Để lưu trữ file hình ảnh mới nếu có
  const [loading, setLoading] = useState(true);  // Biến trạng thái loading

  const { id } = useParams(); // Lấy ID công việc từ URL (dành cho edit công việc theo ID)
  const navigate = useNavigate();  // Dùng để điều hướng sau khi lưu

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
    setFile(files[0]);  // Chỉ lấy file đầu tiên
  };

  // Hàm xử lý thay đổi nội dung của ReactQuill cho description
  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  // Hàm xử lý thay đổi nội dung của ReactQuill cho requirements
  const handleRequirementsChange = (value) => {
    setFormData({
      ...formData,
      requirements: value,
    });
  };

  const handleCancel = () =>{
    notifyWarning("Nothing for update!!")
    navigate('/companySide')
  }

  // Hàm xử lý submit form để cập nhật công việc
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
      // Gửi yêu cầu cập nhật công việc
      const response = await axios.put(`http://localhost:5000/api/v1/job/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Cấu hình gửi file
        },
      });
      console.log('Job updated successfully:', response.data);
      notifySuccess('Job updated successfully');
      navigate(`/companySide`); // Điều hướng đến trang chi tiết công việc
    } catch (error) {
      console.error('Error updating job:', error);
      notifyError('Error updating job');
    }
  };

  // Hàm tải thông tin công việc từ API khi component được mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);  // Set trạng thái loading trước khi gọi API
        const response = await axios.get(`http://localhost:5000/api/v1/job/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
        alert('Error fetching job data');
      } finally {
        setLoading(false);  // Đặt lại trạng thái loading sau khi API trả về
      }
    };

    fetchJob();
  }, [id]);  // Chạy lại khi ID thay đổi

  if (loading) {
    return <div>Loading...</div>;  // Nếu đang tải, hiển thị "Loading"
  }

  return (
    <section className='container'>
      <BreadCrumbDetail title={"Update job"}
          link={"companySide"}
          page={"Your profile"}/>
      <div className="form-container">
        <h2>Edit Job</h2>
        <form onSubmit={handleSubmit} className="row">
          <div className="form-group col-6">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="form-control"
            />
          </div>

          <div className="form-group col-6">
            <label>Salary Range</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="Enter salary range"
              className="form-control"
            />
          </div>

          <div className="form-group col-12">
            <label>Description</label>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}  // Sử dụng hàm xử lý riêng cho ReactQuill
              placeholder="Enter job description"
              theme="snow"
              modules={{
                toolbar: [
                  [{ font: [] }], // Thay đổi phông chữ
                  [{ header: [1, 2, 3, false] }], // Tiêu đề
                  ["bold", "italic", "underline", "strike"], // Định dạng văn bản
                  [{ color: [] }, { background: [] }], // Màu chữ, màu nền
                  [{ align: [] }], // Căn lề
                  ["link", "image"], // Chèn liên kết và hình ảnh
                  ["clean"], // Xóa định dạng
                ],
              }}
              className="form-control"
            />
          </div>

          <div className="form-group col-12">
            <label>Requirements</label>
            <ReactQuill
              value={formData.requirements}
              onChange={handleRequirementsChange}  // Sử dụng hàm xử lý riêng cho ReactQuill
              placeholder="Enter job requirements"
              theme="snow"
              modules={{
                toolbar: [
                  [{ font: [] }], // Thay đổi phông chữ
                  [{ header: [1, 2, 3, false] }], // Tiêu đề
                  ["bold", "italic", "underline", "strike"], // Định dạng văn bản
                  [{ color: [] }, { background: [] }], // Màu chữ, màu nền
                  [{ align: [] }], // Căn lề
                  ["link", "image"], // Chèn liên kết và hình ảnh
                  ["clean"], // Xóa định dạng
                ],
              }}
              className="form-control"
            />
          </div>

          

          <div className="form-group col-6 mt-2">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="form-control"
              style={{padding: '9px'}}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group col-6">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
              required
              className="form-control"
            />
          </div>

          <div className="form-group col-6">
            <label>Job Image</label>
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
            <button type="submit" className="btn btn-success col-6 me-2">Update Job</button>
            <button type="button" onClick={handleCancel} className="btn btn-danger col-5">Cancel</button>
          </div>
        </form>
      </div>

    </section>
  );
}

export default EditJob;
