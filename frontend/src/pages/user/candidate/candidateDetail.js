import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Avatar, Rating, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import i18n hook
import PdfViewer from './PdfViewer';
import BreadCrumbDetail from '../../../components/breadCrumbDetail';

const CandidateDetail = () => {
  const { t } = useTranslation(); // Hook to use translations
  const { id } = useParams(); // Lấy ID từ URL
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    fetchCandidateDetail();
  }, [id]);

  const fetchCandidateDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/candidate/${id}`);
      const data = await response.json();
      setCandidate(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching candidate detail:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>{t('candidateDetail.loading')}</div>;
  }

  if (!candidate) {
    return <div>{t('candidateDetail.candidateNotFound')}</div>;
  }

  return (
    <section>
      <BreadCrumbDetail title={candidate.fullName} link="candidate-list" page={t('candidateDetail.candidateListLink')} />
      <Container sx={{ py: 5 }}>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Box display="flex" justifyContent="center" p={2}>
                  <Avatar
                    src={candidate.avt}
                    alt={candidate.fullName}
                    sx={{ width: 150, height: 150 }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    {candidate.fullName}
                  </Typography>
                  <Typography variant="body1" align="center" color="textSecondary">
                    {candidate.positionDesired}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Rating
                      value={5} // Giả sử tất cả ứng viên đều có 5 sao
                      readOnly
                      icon={<i className="fa fa-star" style={{ color: '#FFD700' }} />}
                      emptyIcon={<i className="fa fa-star-o" />}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {t('candidateDetail.aboutCandidate', { candidateName: candidate.fullName })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={2}>
                    <strong>{t('candidateDetail.birthDate')}:</strong> {new Date(candidate.birthDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>{t('candidateDetail.skills')}:</strong> {candidate.skills}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>{t('candidateDetail.experience')}:</strong> {candidate.experience || t('candidateDetail.noExperience')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>{t('candidateDetail.education')}:</strong> {candidate.education || t('candidateDetail.noEducation')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>{t('candidateDetail.location')}:</strong> {candidate.address || t('candidateDetail.noLocation')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>{t('candidateDetail.contact')}:</strong> {candidate.phone || t('candidateDetail.noContact')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={2}>
                    <strong>{t('candidateDetail.resume')}:</strong>
                  </Typography>
                  <img className='p-2' style={{ width: '100%' }} src={candidate.cvFile} alt="Resume" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default CandidateDetail;
