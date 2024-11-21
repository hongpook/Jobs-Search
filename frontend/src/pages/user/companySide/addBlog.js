import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode"; // Import jwt-decode để giải mã token

const EmployeeJobApplications = () => {
  const [employee, setEmployee] = useState(null);
  const [jobs, setJobs] = useState([]);  // Jobs của công ty
  const [applications, setApplications] = useState([]);  // Ứng viên của từng công việc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null); // Thêm state để lưu userId

  // Hàm giải mã token và lấy thông tin
  const getUserInfoFromToken = () => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Giải mã token
        setUserId(decodedToken.userId); // Giả sử trong token có trường userId
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  // Lấy thông tin của người dùng (employee) sau khi có userId
  useEffect(() => {
    getUserInfoFromToken(); // Gọi hàm giải mã token để lấy userId
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/employee/${userId}`);
          if (!response.ok) throw new Error("Failed to fetch employee data");
          const data = await response.json();
          setEmployee(data); // Lưu thông tin employee
          setJobs(data.jobs); // Lưu danh sách công việc (jobs) từ thông tin employee
          setLoading(false); // Đánh dấu đã tải xong dữ liệu
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchEmployeeData();
    }
  }, [userId]);

  // Lấy các ứng viên (applications) cho một công việc
  const fetchApplications = (jobId) => {
    const job = jobs.find(job => job.id === jobId); // Tìm công việc theo jobId
    if (job && job.applications) {
      setApplications(job.applications); // Lưu các ứng viên của công việc
    } else {
      setApplications([]); // Nếu không có ứng viên
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Danh sách Applications theo Công việc của {employee?.companyName}</h2>
      
      {jobs.length === 0 ? (
        <p>Không có công việc nào trong công ty này.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="mb-5">
            <h4>{job.title}</h4>
            <p><strong>Vị trí:</strong> {job.location}</p>
            <p><strong>Mức lương:</strong> {job.salaryRange}</p>

            <button className="btn btn-primary" onClick={() => fetchApplications(job.id)}>
              Xem ứng viên
            </button>

            {applications.length > 0 && (
              <div className="mt-3">
                <h5>Danh sách Applications:</h5>
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Tên ứng viên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Trạng thái</th>
                      <th>Ngày ứng tuyển</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.applications.map((application, index) => (
                      <tr key={application.id}>
                        <td>{index + 1}</td>
                        <td>{application.candidateName}</td>
                        <td>{application.candidateEmail}</td>
                        <td>{application.candidatePhone}</td>
                        <td>{application.status}</td>
                        <td>{new Date(application.applicationDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeJobApplications;
