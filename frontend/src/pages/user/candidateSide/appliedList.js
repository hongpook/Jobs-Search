import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";

function CandidateApplications() {
  const [candidateData, setCandidateData] = useState(null);
  const [jobDetails, setJobDetails] = useState({});
  const [visibleJobId, setVisibleJobId] = useState(null); // State để lưu trữ jobId đang được hiển thị
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No access token found");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/v1/candidate/${userId}`)
        .then(response => {
          setCandidateData(response.data);
        })
        .catch(error => {
          console.error("Error fetching candidate data:", error);
        });
    }
  }, [userId]);

  const fetchJobDetails = (jobId) => {
    // Kiểm tra nếu jobId đã được hiển thị thì ẩn đi
    if (visibleJobId === jobId) {
      setVisibleJobId(null);
      return;
    }

    // Nếu chưa có trong jobDetails, gọi API lấy chi tiết công việc
    if (!jobDetails[jobId]) {
      axios.get(`http://localhost:5000/api/v1/job/${jobId}`)
        .then(response => {
          setJobDetails(prevDetails => ({
            ...prevDetails,
            [jobId]: response.data,
          }));
          setVisibleJobId(jobId); // Hiển thị chi tiết công việc sau khi lấy thành công
        })
        .catch(error => {
          console.error("Error fetching job details:", error);
        });
    } else {
      setVisibleJobId(jobId); // Hiển thị chi tiết công việc nếu đã có trong state
    }
  };

  if (!candidateData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Applications for {candidateData.fullName}</h2>
      <div className='row'>
        {candidateData.applications.map(application => (
          <div className='col-4' key={application.id}>
            <p>Status: {application.status}</p>
            <p>Application Date: {new Date(application.applicationDate).toLocaleString()}</p>
            <button onClick={() => fetchJobDetails(application.jobId)}>
              {visibleJobId === application.jobId ? "Hide Job Details" : "View Job Details"}
            </button>
            {visibleJobId === application.jobId && jobDetails[application.jobId] && (
              <div>
                <h3>Job Details:</h3>
                <img src={jobDetails[application.jobId].imageUrl} style={{width: '50%'}}/>
                <hr/>
                <p>Title: {jobDetails[application.jobId].title}</p>
                {/* <p>Description: {jobDetails[application.jobId].description}</p> */}
                <p>Location: {jobDetails[application.jobId].location}</p>
                <p>Salary: {jobDetails[application.jobId].salaryRange}</p>
                {/* Các chi tiết công việc khác */}
                <hr/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateApplications;
