import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Avatar, Button, Grid } from '@mui/material';

const CompanyDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    fetchCompanyDetail();
  }, [id]);

  const fetchCompanyDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/employee/${id}`);
      const data = await response.json();
      setCompany(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching company detail:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <Container sx={{ py: 5 }}>
      <Button variant="outlined" onClick={() => history('/company-list')}>
        Back to Company List
      </Button>

      <Card sx={{ boxShadow: 3, borderRadius: 2, mt: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={company.logo}
              alt={company.companyName}
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Typography variant="h5" component="div">
              {company.companyName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {company.contactPerson}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">About {company.companyName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Email:</strong> {company.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Phone:</strong> {company.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Address:</strong> {company.address || 'Location not specified'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Description:</strong> {company.description || 'No description available'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Contact Person:</strong> {company.contactPerson}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Status:</strong> {company.active ? 'Active' : 'Inactive'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CompanyDetail;
