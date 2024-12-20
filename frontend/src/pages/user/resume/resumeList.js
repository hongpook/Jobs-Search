import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/resume');
        setResumes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>List of Resumes</h2>
      <div className="list-group">
        {resumes.length === 0 ? (
          <div>No resumes found.</div>
        ) : (
          resumes.map((resume) => (
            <div className="list-group-item" key={resume.id}>
              <h5 className="mb-1">{resume.name}</h5>
              <p><strong>Email:</strong> {resume.email}</p>
              <p><strong>Phone:</strong> {resume.phone}</p>
              <p><strong>Position:</strong> {resume.position}</p>
              <Link to={`/resume-list/${resume.id}`} className="btn btn-info">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumeList;
