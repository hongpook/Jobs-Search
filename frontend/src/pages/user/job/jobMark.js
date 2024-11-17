import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadCrumb from "../../../components/breadCrumb";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { removeMarkList } from "../../../redux/slice/jobItem";


const JobListMark = () => {
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng
  const dispatch = useDispatch();

  const markList = useSelector((state) => state.markList.MarkArr);
  const handleUnMark = (job) => {
    dispatch(removeMarkList(job)); 
  };
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

  return (
    <>
      <section>
        <BreadCrumb title={"Jobs list mark"} />
        <div className="container">
          <div className="text-center">
            <h1>Jobs list mark</h1>
            <br />
          </div>
        </div>
      </section>

      <section className="section-background">
        <div className="container">
          <div className="row">
            {/* Job listings */}
            <div className="col-lg-12 col-xs-12">
                {markList.length > 0 ? (
              <div className="row">
                  
                    {markList.map((job) => (
                      <div key={job.id} className="col-lg-3 col-md-3 col-sm-6">
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
                                className="section-btn btn btn-primary btn-block p-2 me-3"
                                style={{padding: 0}}
                              >
                                View Details
                              </a>

                              <a
                                onClick={() => handleUnMark(job)}
                                className="section-btn btn btn-danger btn-block p-2"
                                style={{padding: 0}}
                              >
                                Un Mark
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
                  
                ) : (
                  <p>No jobs marked</p>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListMark;
