import React from "react";
import "./resume.css";

const Resume2 = () => {
  return (
    <div id="cv">
      {/* Header Section */}
      <div className="header">
        <img src="https://via.placeholder.com/120" alt="Profile" />
        <div className="header-info">
          <h1>Lauren Chen</h1>
          <h2>Digital Marketing Specialist</h2>
          <p>Email: lauren.chen@gmail.com | Phone: +123 456 7890</p>
          <p>LinkedIn: linkedin.com/in/laurenchen</p>
        </div>
      </div>

      {/* Career Summary */}
      <div className="section">
        <div className="section-title">Summary</div>
        <div className="content">
          <p>
            Digital Marketing Specialist with 6+ years of experience in online
            marketing, branding, and business strategy across music, media, and
            entertainment industries. Skilled in evaluating financial needs and
            implementing multi-pronged digital strategies that increase revenue and
            drive brand growth.
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <div className="section">
        <div className="section-title">Professional Experience</div>
        <div className="content experience">
          <div>
            <h3>Digital Marketing Specialist at Triangle Music Group</h3>
            <p className="details">Jan 2019 - Present</p>
            <ul>
              <li>Manage digital sales and streaming accounts to improve brand positioning and growth.</li>
              <li>Collaborate with internal teams to execute digital advertising campaigns.</li>
              <li>Deploy and manage 1M+ consumer sales and marketing database.</li>
            </ul>
          </div>
          <div>
            <h3>Digital Marketing Associate at Mono Software</h3>
            <p className="details">Jan 2018 - Jan 2019</p>
            <ul>
              <li>Worked with the marketing team to develop and apply digital marketing plans.</li>
              <li>Increased conversions by 15% from paid sources (PPC, Grant, Display, and VOD).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="section">
        <div className="section-title">Education</div>
        <div className="content education">
          <p><strong>Bachelor of Arts, Communications</strong><br />New York University, May 2017</p>
        </div>
      </div>

      {/* Skills */}
      <div className="section">
        <div className="section-title">Skills</div>
        <div className="content skills">
          <div>Digital Data Analytics</div>
          <div>Digital Marketing</div>
          <div>Adobe Photoshop</div>
          <div>Adobe Illustrator</div>
        </div>
      </div>

      {/* Certificates */}
      <div className="section">
        <div className="section-title">Certificates</div>
        <div className="content certificates">
          <p>Certified Digital Marketing Expert - 2023</p>
          <p>Google Analytics Certified - 2022</p>
        </div>
      </div>

      {/* Projects */}
      <div className="section">
        <div className="section-title">Projects</div>
        <div className="content projects">
          <p><strong>Portfolio Website:</strong> Built a personal portfolio using React and deployed it on Vercel.</p>
        </div>
      </div>

      {/* Interests */}
      <div className="section">
        <div className="section-title">Interests</div>
        <div className="content interests">
          <p>Traveling, Photography, Music Production</p>
        </div>
      </div>
    </div>
  );
};

export default Resume2;
