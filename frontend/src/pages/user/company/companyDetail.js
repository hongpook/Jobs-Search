import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import BreadCrumbDetail from "../../../components/breadCrumbDetail";

import jwtDecode from "jwt-decode";

const CompanyDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng

  // Hàm giải mã token và lấy thông tin
  const getUserInfoFromToken = () => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken); // Lưu toàn bộ thông tin từ token vào state
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  useEffect(() => {
    getUserInfoFromToken(); // Gọi hàm khi component được mount
  }, []);
  useEffect(() => {
    fetchCompanyDetail();
  }, [id]);

  const fetchCompanyDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/employee/${id}`
      );
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
    <section>
      <BreadCrumbDetail
        title={"Company detail"}
        link={"company-list"}
        page={"Company list"}
      />
      <Container sx={{ py: 5 }}>
        {/* <Button variant="outlined" onClick={() => history('/company-list')}>
          Back to Company List
        </Button> */}

        <Card sx={{ boxShadow: 3, borderRadius: 2, mt: 3 }}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={3}
            >
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
                <Typography variant="h6">
                  About {company.companyName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Website:</strong>{" "}
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.website}
                  </a>
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
                  <strong>Address:</strong>{" "}
                  {company.address || "Location not specified"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Description:</strong>{" "}
                  {company.description || "No description available"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Contact Person:</strong> {company.contactPerson}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong>{" "}
                  {company.active ? "Active" : "Inactive"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <section>
        <Container>
          <h2>Related jobs</h2>
          <CardContent>
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              slidesPerView={3}
              slidesPerGroup={1}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 2000,
                reverseDirection: false,
              }}
              className="mySwiper"
            >
              {company.jobs.length > 0 ? (
                company.jobs.map((job) => (
                  <SwiperSlide key={job.id}>
                    <Card sx={{ marginBottom: 2 }}>
                      {userInfo ? (
                        <CardContent>
                          <Typography variant="h6">
                            <a href={`/job-details/${job.id}`}>{job.title}</a>
                          </Typography>
                          <img
                            src={job.imageUrl}
                            alt={job.title}
                            style={{ width: "100%", height: "auto" }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginTop: 1 }}
                          >
                            Salary: {job.salaryRange}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Location: {job.location}
                          </Typography>
                          <Typography variant="body2" sx={{ marginTop: 2 }}>
                            Type: {job.jobType}
                          </Typography>
                        </CardContent>
                      ) : (
                        <CardContent>
                          <Typography variant="h6">
                            <a >{job.title}</a>
                          </Typography>
                          <img
                            src={job.imageUrl}
                            alt={job.title}
                            style={{ width: "100%", height: "auto" }}
                          />
                          
                          <Typography variant="body2" sx={{ marginTop: 2 }}>
                            Type: {job.jobType}
                          </Typography>
                          <div className="courses-info">
                            <a
                              href={`/login`}
                              className="section-btn btn btn-primary btn-block p-2"
                              style={{padding: 0}}
                            >
                              Vui lòng đăng nhập để xem chi tiết
                            </a>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </SwiperSlide>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 2 }}
                >
                  Hiện tại không có công việc nào
                </Typography>
              )}
            </Swiper>
          </CardContent>
        </Container>
      </section>
    </section>
  );
};

export default CompanyDetail;
