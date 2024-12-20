import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateResumes = () => {
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
        setError("Không thể tải dữ liệu resumes.");
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Resumes list</h3>
      {resumes.length === 0 ? (
        <p className="text-center">No resumes have been created yet.</p>
      ) : (
        <div className="row g-4">
          {resumes.map((resume) => (
            <div className="col-md-3" key={resume.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-primary text-truncate">{resume.name}</h5>
                  <p className="card-text text-muted">Position: {resume.position || "N/A"}</p>
                  <a
                    href={`/resume-list/${resume.id}`}
                    className="btn btn-info mt-auto text-white"
                  >
                    Resume detail
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
