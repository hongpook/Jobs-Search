import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CandidateProfile from './candidateProfile';
import CandidateApplications from './appliedList';
import ResumePages from '../resume/resumePages';
import CandidateResumes from '../resume/test';


function CandidateSide(props) {  // Đổi tên từ CompanySide thành TabPanel
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CandidateSide.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>

    
    <div className='container'>

        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab label="Your profile" {...a11yProps(0)} />
            <Tab label="Your application" {...a11yProps(1)} />
            <Tab label="Your resume list" {...a11yProps(2)} />
        </Tabs>
        <CandidateSide style={{width: '1130px'}} value={value} index={0}>
            <CandidateProfile/>
        </CandidateSide>
        <CandidateSide style={{width: '1130px'}} value={value} index={1}>
            <CandidateApplications/>
        </CandidateSide>
        <CandidateSide style={{width: '1130px'}} value={value} index={2}>
            {/* <ResumePages/> */}
            <CandidateResumes/>
        </CandidateSide>
        
        </Box>
    </div>
    </section>
  );
}
