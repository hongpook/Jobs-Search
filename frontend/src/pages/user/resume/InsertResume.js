import React, { useState } from "react";
import ReactQuill from "react-quill";

const InsertResume = () => {
  const [formData, setFormData] = useState({
    careerObjective: "",
    workExperience: "",
    education: "",
    skills: "",
    certificates: "",
    projects: "",
    interests: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Thực hiện logic submit tại đây
  };

  return (
    <div className="container mt-4">
      <h2>Insert Resume</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Career Objective", field: "careerObjective" },
          { label: "Work Experience", field: "workExperience" },
          { label: "Education", field: "education" },
          { label: "Skills", field: "skills" },
          { label: "Certificates", field: "certificates" },
          { label: "Projects", field: "projects" },
          { label: "Interests", field: "interests" },
        ].map(({ label, field }) => (
          <div className="mb-4" key={field}>
            <label className="form-label">{label}</label>
            <ReactQuill
              theme="snow"
              value={formData[field]}
              onChange={(value) => handleChange(field, value)}
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InsertResume;
