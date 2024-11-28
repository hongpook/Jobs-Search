import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AddNewJob from './addJob';
import JobListSide from './jobList';
import CompanyProfile from './companyProfile';
import BlogList from './addBlog';
import AppliedList from './applied';

import jwtDecode from "jwt-decode";
import BlogListSide from './blogList';

function CompanySide(props) {
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

CompanySide.propTypes = {
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
  const [userInfo, setUserInfo] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Hàm giải mã token và lấy thông tin người dùng
  const getUserInfoFromToken = () => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken); // Lưu thông tin từ token vào state
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  useEffect(() => {
    getUserInfoFromToken(); // Lấy thông tin khi component mount
  }, []);

  return (
    <section>
      <div className="container">
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
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
            <Tab label="Your job list" {...a11yProps(1)} />
            <Tab label="Create job" {...a11yProps(2)} />
            <Tab label="Create blog" {...a11yProps(3)} />
            <Tab label="Applications" {...a11yProps(4)} />
            <Tab label="Your blog list" {...a11yProps(5)} />
          </Tabs>

          <CompanySide style={{ width: '1130px' }} value={value} index={0}>
            <CompanyProfile />
          </CompanySide>

          <CompanySide style={{ width: '1130px' }} value={value} index={1}>
            <JobListSide />
          </CompanySide>

          <CompanySide style={{ width: '1130px' }} value={value} index={2}>
            <AddNewJob />
          </CompanySide>

          <CompanySide style={{ width: '1130px' }} value={value} index={3}>
            <BlogList />
          </CompanySide>

          <CompanySide style={{ width: '1130px' }} value={value} index={4}>
            {userInfo ? (
              <>
                <AppliedList id={userInfo.id} />
              </>
            ) : (
              <h1>Không tìm thấy thông tin người dùng</h1>
            )}
          </CompanySide>

          <CompanySide style={{ width: '1130px' }} value={value} index={5}>
            <BlogListSide/>
          </CompanySide>
        </Box>
      </div>
    </section>
  );
}
