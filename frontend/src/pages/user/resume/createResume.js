import React, { useState } from "react";
import ReactQuill from "react-quill";
import BreadCrumb from "../../../components/breadCrumb";
import Resume from "./resume";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InsertResume from "./InsertResume";
import Resume2 from "./resume2";
import Resume3 from "./resume3";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateResume = () => {
  const [value, setValue] = React.useState(0);

  const handleChangeBtn = (event, newValue) => {
    setValue(newValue);
  };


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
    <section>
      <div className="container">
        <BreadCrumb title={"Create your resume"} />
        <h2>Create resume by yourself</h2>
        <div className="row">
          <div className="col-4">
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
          <div className="col-8">
            <Box >
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChangeBtn} centered>
        <Tab label="Item One" className="col-3"/>
        <Tab label="Item Two" className="col-3"/>
        <Tab label="Item Three" className="col-3"/>
      </Tabs>
    </Box>
              <CustomTabPanel value={value} index={0}>
                <Resume />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Resume2/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Resume3/>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateResume;
