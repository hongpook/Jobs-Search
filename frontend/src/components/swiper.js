import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import jwtDecode from "jwt-decode";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

export default function SwiperJob() {
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);


  // Hàm giải mã token và lấy thông tin người dùng
  const getUserInfoFromToken = () => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };
  // Effect khi component mount để lấy thông tin người dùng
  useEffect(() => {
    getUserInfoFromToken();
  }, []);

  // Fetch jobs from API when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/jobs');
        const data = await response.json();
        setJobs(data); // Assuming the API returns a list of jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <section>
        <div className='container'>

          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2000,
              reverseDirection: false
            }}
            className="mySwiper"
          >
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <SwiperSlide key={index}  className="col-lg-4 col-md-4 col-sm-6">
                {/* <div key={index} className="col-lg-4 col-md-4 col-sm-6"> */}
                  <div className="courses-thumb courses-thumb-secondary">
                    <div className="courses-top">
                      <div
                        className="courses-image"
                        style={{ height: "204px" }}
                      >
                        <img
                          style={{ width: "100%", height: "inherit" }}
                          src={job.imageUrl} // Nếu job không có image, dùng ảnh mặc định
                          className="img-responsive"
                          alt={job.title}
                        />
                      </div>
                      <div className="courses-date">
                        <span title="Posted on">
                          <i className="fa fa-calendar"></i>{" "}
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span title="Location">
                          <i className="fa fa-map-marker"></i>{" "}
                          {job.location}
                        </span>
                        <span title="Type">
                          <i className="fa fa-file"></i> {job.jobType}
                        </span>
                      </div>
                    </div>
                    {userInfo ? (
                      <>
                        <div className="courses-detail">
                          <h3 className="text" style={{    'white-space': 'pre-line'}}>
                            <a
                              href={`/job-details/${job.id}`}
                              className="text-threedot"
                              style={{ fontSize: "18px" }}
                              title={job.title}
                            >
                              {job.title}
                            </a>
                          </h3>
                          <p className="lead">
                            <strong>{job.salaryRange}</strong>
                          </p>
                        </div>
                        <div className="courses-info">
                          <a
                            href={`/job-details/${job.id}`}
                            className="section-btn btn btn-primary btn-block p-2"
                            style={{ padding: 0 }}
                          >
                            View Details
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="courses-detail">
                          <h3 className="text" style={{    'white-space': 'pre-line'}}>
                            <a
                              className="text-threedot"
                              style={{ fontSize: "18px" }}
                              title={job.title}
                            >
                              {job.title}
                            </a>
                          </h3>
                        </div>
                        <div className="courses-info">
                          <a
                            href={`/login`}
                            className="section-btn btn btn-primary btn-block p-2"
                            style={{ padding: 0 }}
                          >
                            Vui lòng đăng nhập để xem chi tiết
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                {/* </div> */}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="item">No jobs available</div>
              </SwiperSlide>
            )}
          </Swiper>

        </div>
      </section>
    </>
  );
}
