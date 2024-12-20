import React from "react";
import "./resume.css";

const Resume = () => {
  return (
    <div id="cv">
      {/* Header Section */}
      <div className="header">
        <h1>John Doe</h1>
        <h2>Full Stack Developer</h2>
        <p>
          Email: john.doe@gmail.com | Phone: +123 456 7890 | LinkedIn:
          linkedin.com/in/johndoe
        </p>
      </div>

      {/* Career Objective */}
      <div className="section">
        <div className="section-title">Career Objective</div>
        <div className="content">
          <p>
            A passionate and dedicated software engineer with 5+ years of
            experience in building scalable web applications. Seeking to apply
            my skills to innovative projects and contribute to the success of
            your organization.
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <div className="section">
        <div className="section-title">Work Experience</div>
        <div className="content experience">
          <div>
            <h3>Senior Developer at TechCorp</h3>
            <p className="details">Jan 2018 - Present</p>
            <p>
              - Led a team of 5 developers to build a CRM system that increased
              sales efficiency by 30% <br />- Integrated third-party APIs for
              payment processing and user analytics.
            </p>
          </div>
          <div>
            <h3>Software Engineer at DevHub</h3>
            <p className="details">May 2015 - Dec 2017</p>
            <p>
              - Built and maintained a responsive e-commerce platform using
              React and Node.js. <br />- Collaborated with the design team to
              enhance UX/UI, increasing user retention by 20%.
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="section">
        <div className="section-title">Education</div>
        <div className="content">
          <p>
            <strong>Bachelor of Science in Computer Science</strong> <br />
            University of Technology, 2015 <br />
            GPA: 3.8/4.0
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="section">
        <div className="section-title">Skills</div>
        <div className="content skills">
          <div>JavaScript</div>
          <div>React</div>
          <div>Node.js</div>
          <div>SQL</div>
          <div>Git</div>
          <div>Docker</div>
        </div>
      </div>

      {/* Certificates */}
      <div className="section">
        <div className="section-title">Certificates</div>
        <div className="content">
          <p>Certified Kubernetes Administrator - 2022</p>
          <p>React Advanced Certification - 2021</p>
        </div>
      </div>

      {/* Projects */}
      <div className="section">
        <div className="section-title">Projects</div>
        <div className="content">
          <p>
            <strong>Portfolio Website:</strong> Built a personal portfolio
            website using React and deployed it on Vercel.
          </p>
          <p>
            <strong>Expense Tracker:</strong> Created a mobile-friendly expense
            tracker with user authentication.
          </p>
        </div>
      </div>

      {/* Interests */}
      <div className="section">
        
        <div className="section-title">Interests</div>
        <div className="content">
          <p>Reading, Open-source contributions, Traveling, Photography</p>
        </div>
      </div>

    </div>
  );
};

export default Resume;
