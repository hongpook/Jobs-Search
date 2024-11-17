import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadCrumb from "../../../components/breadCrumb";
import jwtDecode from "jwt-decode";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng

  // Hàm giải mã token và lấy thông tin
  const getUserInfoFromToken = () => {
    const token = window.localStorage.getItem('accessToken');
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
    axios.get("http://localhost:5000/api/v1/jobs")
      .then(response => {
        setJobs(response.data); // Giả sử API trả về danh sách jobs trực tiếp trong `response.data`
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <>
      <section>
        <BreadCrumb title={"Job list"}/>
        <div className="container">
          <div className="text-center">
            <h1>Jobs Listing</h1>
            <br />
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, alias.
            </p>
          </div>
        </div>
      </section>

      <section className="section-background">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div class="col-lg-3 col-xs-12">
              <div class="form">
                <form>
                <h4>Search</h4>
                  <input type="search"/>
                  <button type="submit">Search</button>
                </form>
                <br/>
                <form action="#">
                  <h4>Type</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Contract (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Full time (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Internship (5)
                    </label>
                  </div>

                  <br />

                  <h4>Category</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Accounting / Finance / Insurance Jobs (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Accounting / Finance / Insurance Jobs (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Accounting / Finance / Insurance Jobs (5)
                    </label>
                  </div>

                  <br />

                  <h4>Career levels</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Entry Level (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Entry Level (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Entry Level (5)
                    </label>
                  </div>

                  <br />

                  <h4>Education levels</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Associate Degree (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Associate Degree (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Associate Degree (5)
                    </label>
                  </div>

                  <br />

                  <h4>Years of experience</h4>

                  <div>
                    <label>
                      <input type="checkbox" />1 (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />1 (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />1 (5)
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/* Job listings */}
            <div className="col-lg-9 col-xs-12">
              <div className="row">
                {jobs.map((job, index) => (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-6">
                    <div className="courses-thumb courses-thumb-secondary">
                      <div className="courses-top">
                        <div className="courses-image" style={{ height: "204px" }}>
                          <img
                            style={{ width: "100%", height: "inherit"}}
                            src={job.imageUrl} // Nếu job không có image, dùng ảnh mặc định
                            className="img-responsive"
                            alt={job.title}
                          />
                        </div>
                        <div className="courses-date">
                          <span title="Posted on">
                            <i className="fa fa-calendar"></i> {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                          <span title="Location">
                            <i className="fa fa-map-marker"></i> {job.location}
                          </span>
                          <span title="Type">
                            <i className="fa fa-file"></i> {job.jobType}
                          </span>
                        </div>
                      </div>
                      {
                        userInfo ?(
                          <>
                            <div className="courses-detail">
                              <h3 className="text">
                                <a href={`/job-details/${job.id}`} className=" text-threedot" style={{'font-size': '18px'}} title={job.title} >{job.title}</a>
                              </h3>
                              <p className="lead">
                                <strong>{job.salaryRange}</strong>
                              </p>
                              {/* <p>
                                {job.category} for <strong>{job.company}</strong>
                              </p> */}
                            </div>
                            <div className="courses-info">
                            <a
                              href={`/job-details/${job.id}`}
                              className="section-btn btn btn-primary btn-block p-2"
                              style={{padding: 0}}
                            >
                              View Details
                            </a>
                          </div>
                          </>

                        ): (
                          <>
                          <div className="courses-detail">
                          <h3 className="text">
                            <a  className=" text-threedot" style={{'font-size': '18px'}} title={job.title} >{job.title}</a>
                          </h3>
                          
                        </div>
                        <div className="courses-info">
                            <a
                              href={`/login`}
                              className="section-btn btn btn-primary btn-block p-2"
                              style={{padding: 0}}
                            >
                              Vui lòng đăng nhập để xem chi tiết
                            </a>
                          </div>
                          </>
                        )
                      }

                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListPage;
