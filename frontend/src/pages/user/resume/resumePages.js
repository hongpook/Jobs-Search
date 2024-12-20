import React, { useState } from "react";
import ReactQuill from "react-quill";
import BreadCrumb from "../../../components/breadCrumb";
import Resume from "./resume";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

const ResumePages = () => {
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
      <div className="container">
        {/* <BreadCrumb title={"Create your resume"} /> */}
        <div className="row">
          <div className="col-12">
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
  );
};

export default ResumePages;
