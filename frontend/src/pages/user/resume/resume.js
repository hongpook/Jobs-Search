import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Carousel } from 'react-bootstrap';  // Import Carousel from react-bootstrap

const CompanyJobs = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // Call API to get company and jobs information
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/employee/2') // Lấy thông tin công ty (id = 2 trong ví dụ)
      .then((response) => {
        setCompany(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
      {company && (
        <>
          {/* Hiển thị thông tin công ty */}
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h4">{company.companyName}</Typography>
              <Typography variant="body1" color="text.secondary">{company.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                Email: {company.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">Phone: {company.phone}</Typography>
              <Typography variant="body2" color="text.secondary">Address: {company.address}</Typography>
              <Typography variant="body2" color="text.secondary">
                Website: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
              </Typography>
              <img src={company.logo} alt={company.companyName} style={{ width: '200px', height: 'auto', marginTop: '1rem' }} />
            </CardContent>
          </Card>

          {/* Hiển thị danh sách công việc */}
          <Typography variant="h5" sx={{ marginBottom: 2 }}>Available Jobs</Typography>

          {/* Bootstrap Carousel Component */}
          <Carousel>
            {company.jobs.map((job) => (
              <Carousel.Item key={job.id}>
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <img src={job.imageUrl} alt={job.title} style={{ width: '100%', height: 'auto' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                      Salary: {job.salaryRange}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {job.location}
                    </Typography>   
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                      Type: {job.jobType}
                    </Typography>
                  </CardContent>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Navigation buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIosNew />}
              onClick={() => { /* Go to previous slide */ }}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIos />}
              onClick={() => { /* Go to next slide */ }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CompanyJobs;
