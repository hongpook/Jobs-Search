import React, { useState, useEffect } from 'react';
import './srm.css'

function ResumeCV() {
  const [cvData, setCvData] = useState({
    theme: 'professional',
    personalInfo: { name: '', title: '', email: '', phone: '', summary: '' },
    experience: [],
    education: [],
    skills: []
  });

  // Load saved data từ localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      setCvData(JSON.parse(savedData));
    }
  }, []);

  // Save data vào localStorage
  const saveData = () => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setCvData((prev) => ({ ...prev, theme }));
    document.body.setAttribute('data-theme', theme);
    saveData();
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [id]: value }
    }));
    saveData();
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...cvData.experience];
    updatedExperience[index][field] = value;
    setCvData({ ...cvData, experience: updatedExperience });
    saveData();
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...cvData.education];
    updatedEducation[index][field] = value;
    setCvData({ ...cvData, education: updatedEducation });
    saveData();
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
    saveData();
  };

  const removeExperience = (index) => {
    const updatedExperience = [...cvData.experience];
    updatedExperience.splice(index, 1);
    setCvData({ ...cvData, experience: updatedExperience });
    saveData();
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', description: '' }]
    }));
    saveData();
  };

  const removeEducation = (index) => {
    const updatedEducation = [...cvData.education];
    updatedEducation.splice(index, 1);
    setCvData({ ...cvData, education: updatedEducation });
    saveData();
  };

  const addSkill = (skill) => {
    if (skill.trim()) {
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
      saveData();
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...cvData.skills];
    updatedSkills.splice(index, 1);
    setCvData({ ...cvData, skills: updatedSkills });
    saveData();
  };

  // Render phần preview
  const renderCV = () => {
    return (
      <div className="cv-preview">
        <div className="cv-header">
          <h1>{cvData.personalInfo.name || 'Your Name'}</h1>
          <h2>{cvData.personalInfo.title || 'Your Title'}</h2>
          <p>{cvData.personalInfo.email}</p>
          <p>{cvData.personalInfo.phone}</p>
        </div>

        <div className="cv-section">
          <h2 className="section-title">Professional Summary</h2>
          <p>{cvData.personalInfo.summary}</p>
        </div>

        {cvData.experience.length > 0 && (
          <div className="cv-section">
            <h2 className="section-title">Work Experience</h2>
            {cvData.experience.map((exp, index) => (
              <div className="experience-item" key={index}>
                <h3>{exp.position}</h3>
                <h4>{exp.company} | {exp.duration}</h4>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {cvData.education.length > 0 && (
          <div className="cv-section">
            <h2 className="section-title">Education</h2>
            {cvData.education.map((edu, index) => (
              <div className="education-item" key={index}>
                <h3>{edu.degree}</h3>
                <h4>{edu.institution} | {edu.year}</h4>
                <p>{edu.description}</p>
              </div>
            ))}
          </div>
        )}

        {cvData.skills.length > 0 && (
          <div className="cv-section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-list">
              {cvData.skills.map((skill, index) => (
                <span className="skill-tag" key={index}>{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="editor-panel">
        <div className="theme-selector">
          <label htmlFor="theme">Select Theme:</label>
          <select id="theme" value={cvData.theme} onChange={handleThemeChange}>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="minimalist">Minimalist</option>
          </select>
        </div>

        <h2 className="section-title">Personal Information</h2>
        <div className="input-group">
          <input type="text" id="name" placeholder="Full Name" value={cvData.personalInfo.name} onChange={handleInputChange} />
          <input type="text" id="title" placeholder="Professional Title" value={cvData.personalInfo.title} onChange={handleInputChange} />
          <input type="email" id="email" placeholder="Email" value={cvData.personalInfo.email} onChange={handleInputChange} />
          <input type="tel" id="phone" placeholder="Phone" value={cvData.personalInfo.phone} onChange={handleInputChange} />
          <textarea id="summary" placeholder="Professional Summary" value={cvData.personalInfo.summary} onChange={handleInputChange}></textarea>
        </div>

        <h2 className="section-title">Work Experience</h2>
        <button onClick={addExperience}>Add Experience</button>
        {cvData.experience.map((exp, index) => (
          <div key={index} className="input-group">
            <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
            <input type="text" placeholder="Position" value={exp.position} onChange={(e) => handleExperienceChange(index, 'position', e.target.value)} />
            <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} />
            <textarea placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}></textarea>
            <button className="remove-btn" onClick={() => removeExperience(index)}>Remove</button>
          </div>
        ))}

        <h2 className="section-title">Education</h2>
        <button onClick={addEducation}>Add Education</button>
        {cvData.education.map((edu, index) => (
          <div key={index} className="input-group">
            <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} />
            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} />
            <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleEducationChange(index, 'year', e.target.value)} />
            <textarea placeholder="Description" value={edu.description} onChange={(e) => handleEducationChange(index, 'description', e.target.value)}></textarea>
            <button className="remove-btn" onClick={() => removeEducation(index)}>Remove</button>
          </div>
        ))}

        <h2 className="section-title">Skills</h2>
        <div className="input-group">
          <input type="text" id="skill-input" placeholder="Add a skill" onKeyUp={(e) => e.key === 'Enter' && addSkill(e.target.value)} />
          <button onClick={() => addSkill(document.getElementById('skill-input').value)}>Add Skill</button>
        </div>
        <div className="skills-list">
          {cvData.skills.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
              <button className="remove-btn" onClick={() => removeSkill(index)}>×</button>
            </div>
          ))}
        </div>

        <button onClick={() => window.print()} style={{ marginTop: '20px' }}>Download CV</button>
      </div>

      <div className="preview-panel">
        {renderCV()}
      </div>
    </div>
  );
}

export default ResumeCV;
