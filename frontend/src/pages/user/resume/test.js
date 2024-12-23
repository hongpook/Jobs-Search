import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const CandidateResumes = () => {
  const { t } = useTranslation(); // Hook để truy cập các hàm của i18n
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/candidate/18");
        setResumes(response.data.resumes); // Gán resumes từ API vào state
        setLoading(false);
      } catch (err) {
        setError(t("candidateResume.error")); 
        setLoading(false);
      }
    };

    fetchResumes();
  }, [t]);

  if (loading) return <p>{t("candidateResume.loading")}</p>; 
  if (error) return <p>{error}</p>; 

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">{t("candidateResume.resumesList")}</h3> 
      {resumes.length === 0 ? (
        <p className="text-center">{t("candidateResume.noResumes")}</p> 
      ) : (
        <div className="row g-4">
          {resumes.map((resume) => (
            <div className="col-md-3" key={resume.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-primary text-truncate">{resume.name}</h5>
                  <p className="card-text text-muted">{t("candidateResume.position")}: {resume.position || "N/A"}</p> 
                  <a
                    href={`/resume-list/${resume.id}`}
                    className="btn btn-info mt-auto text-white"
                  >
                    {t("candidateResume.resumeDetail")} 
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateResumes;
