import React from 'react';
import './resume3.css';

const Resume3 = () => {
  return (
    <div className="resume-container">
      <header className="header">
        <div className="profile-pic">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="personal-info">
          <h1>John Doe</h1>
          <h2>Software Engineer</h2>
          <p>Location: New York, USA</p>
          <p>Email: johndoe@example.com</p>
        </div>
      </header>
      
      <section className="section">
        <h3>About Me</h3>
        <p>I am a software engineer with 5 years of experience building web applications...</p>
      </section>

      <section className="section">
        <h3>Skills</h3>
        <ul>
          <li>React.js</li>
          <li>Node.js</li>
          <li>JavaScript</li>
          <li>CSS, HTML</li>
          <li>SQL</li>
        </ul>
      </section>

      <section className="section">
        <h3>Experience</h3>
        <div className="experience">
          <h4>Software Engineer - Company XYZ</h4>
          <p>June 2020 - Present</p>
          <p>Developed web applications using React and Node.js...</p>
        </div>
        <div className="experience">
          <h4>Frontend Developer - Company ABC</h4>
          <p>Jan 2018 - May 2020</p>
          <p>Built responsive web pages using HTML, CSS, and JavaScript...</p>
        </div>
      </section>

      <section className="section">
        <h3>Education</h3>
        <p>Bachelor of Science in Computer Science, University of XYZ</p>
        <p>Graduated: 2017</p>
      </section>
      
      <footer className="footer">
        <p>© 2024 John Doe</p>
      </footer>
    </div>
  );
};

export default Resume3;
