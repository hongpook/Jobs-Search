import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/loading';

function CandidateApplications() {
  const { t } = useTranslation();
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

  if (!candidateData) return <Loading/>;

  return (
    <div>
      <h2>{t('candidateApplied.applicationsFor')} {candidateData.fullName}</h2>
      <div className='row'>
        {candidateData.applications.map(application => (
          <div className='col-4' key={application.id}>
            <p>{t('candidateApplied.status')}: {application.status}</p>
            <p>{t('candidateApplied.applicationDate')}: {new Date(application.applicationDate).toLocaleString()}</p>
            <button onClick={() => fetchJobDetails(application.jobId)}>
              {visibleJobId === application.jobId ? t('candidateApplied.hideJobDetails') : t('candidateApplied.viewJobDetails')}
            </button>
            {visibleJobId === application.jobId && jobDetails[application.jobId] && (
              <div>
                <h3>{t('candidateApplied.jobDetails')}:</h3>
                <img src={jobDetails[application.jobId].imageUrl} style={{width: '50%'}}/>
                <hr/>
                <p>{t('candidateApplied.title')}: {jobDetails[application.jobId].title}</p>
                <p>{t('candidateApplied.location')}: {jobDetails[application.jobId].location}</p>
                <p>{t('candidateApplied.salary')}: {jobDetails[application.jobId].salaryRange}</p>
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
