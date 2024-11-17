import React, { useState, useEffect } from 'react';
import { getCandidateInfo } from '../../../apis/authApi'; // Đảm bảo import đúng

const CandidatePro = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API khi component được render
    getCandidateInfo()
      .then(response => {
        // Cập nhật dữ liệu ứng viên khi API trả về
        setCandidateData(response.data);
        setLoading(false);
      })
      .catch(err => {
        // Xử lý lỗi nếu có
        setError(err.message);
        setLoading(false);
      });
  }, []); // Chạy once khi component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h1>Candidate Profile</h1>
      {candidateData ? (
        <div>
          <p><strong>Name:</strong> {candidateData.name}</p>
          <p><strong>Email:</strong> {candidateData.email}</p>
          {/* Hiển thị các trường dữ liệu khác */}
        </div>
      ) : (
        <div>No candidate data found.</div>
      )}
    </section>
  );
};

export default CandidatePro;
