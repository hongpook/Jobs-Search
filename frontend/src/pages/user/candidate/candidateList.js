import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box, Avatar, Rating, Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';  // Import i18n hook
import BreadCrumb from '../../../components/breadCrumb';

const CandidateList = () => {
  const { t } = useTranslation(); // Hook to use translations
  const [candidates, setCandidates] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Số lượng ứng viên hiển thị mỗi trang
  const totalPages = Math.ceil(candidates.length / itemsPerPage);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/candidates');
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
      <BreadCrumb title={t('candidateList.candidateListTitle')} />
      <Container sx={{ py: 5 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h2">
            {t('candidateList.testimonialsTitle')}
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {currentCandidates.map((candidate) => (
            <Grid item xs={12} sm={6} md={4} key={candidate.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Box display="flex" justifyContent="center" p={2}>
                  <Avatar
                    src={candidate.avt}
                    alt={candidate.fullName}
                    sx={{ width: 80, height: 80 }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    <a href={`/candidate/${candidate.id}`}>{candidate.fullName}</a>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {candidate.positionDesired}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" mt={2}>
                    {candidate.skills}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Rating
                      value={5} // Giả sử tất cả đều có rating là 5
                      readOnly
                      icon={<i className="fa fa-star" style={{ color: '#FFD700' }} />}
                      emptyIcon={<i className="fa fa-star-o" />}
                    />
                  </Box>
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

export default CandidateList;
