
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box, Avatar, Rating, Pagination } from '@mui/material';

const CompanyList = () => {
  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Số lượng ứng viên hiển thị mỗi trang
  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/employees');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Cắt mảng ứng viên cho trang hiện tại
  const currentCandidates = candidates.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section id="testimonial">
      <Container sx={{ py: 5 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h2">
            Companies <small>from around the world</small>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {currentCandidates.map((candidate) => (
            <Grid item xs={12} sm={12} md={12} key={candidate.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, display:"flex", 'align-items': 'center' }}>
              <Box display="flex"  p={2}>
                <Avatar
                  src={candidate.logo}
                  alt={candidate.companyName}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  <a href={`/company/${candidate.id}`}>{candidate.companyName}</a>
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {candidate.contactPerson}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages} // Số lượng trang dựa trên tổng số ứng viên
            page={page} // Trang hiện tại
            onChange={handlePageChange} // Hàm xử lý khi thay đổi trang
            color="primary"
          />
        </Box>
      </Container>
    </section>
  );
};

export default CompanyList;
