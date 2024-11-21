import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RegisterForm from './candidateAuth/register';
import RegisterCompany from './companyauth/registerCompany';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
    style={{ 'justify-content': 'center'}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    > 
      {value === index && <Box sx={{ p: 3}}>{children}</Box>}
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RegisterSide() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className='container'>

      <Box sx={{ width: '100%'}}>
        <Box >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Register for recruiter" {...a11yProps(0)} />
            <Tab label="Register for candidate" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <RegisterCompany/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RegisterForm/>
        </CustomTabPanel>
      </Box>
    </section>
  );
}
