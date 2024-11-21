import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadCrumb from "../../../components/breadCrumb";
import jwtDecode from "jwt-decode";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    jobTypes: "", // Bộ lọc jobType
    salaryRange: "",
    location: "",
  });

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

  // Lấy danh sách công việc từ API với các bộ lọc
  const fetchJobs = () => {
    // Xây dựng query string cho search (title) theo endpoint cũ
    const searchQuery = filters.search ? `search=${filters.search}` : "";

    // Xây dựng query string cho các bộ lọc còn lại (jobType, salaryRange, location)
    const filterQuery = [];
    if (filters.jobTypes) filterQuery.push(`jobType=${filters.jobTypes}`);
    if (filters.salaryRange)
      filterQuery.push(`salaryRange=${filters.salaryRange}`);
    if (filters.location) filterQuery.push(`location=${filters.location}`);

    // Nối searchQuery với filterQuery
    const query = [searchQuery, ...filterQuery].filter(Boolean).join("&");

    // Nếu có query, gửi request
    if (query) {
      axios
        .get(`http://localhost:5000/api/v1/filter-job?${query}`)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setJobs(response.data.data);
          } else {
            console.error("Data is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    } else {
      // Nếu không có bộ lọc nào, lấy danh sách công việc không lọc
      axios
        .get(`http://localhost:5000/api/v1/filter-job`)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setJobs(response.data.data);
          } else {
            console.error("Data is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    }
  };

  // Effect khi component mount để lấy thông tin người dùng
  useEffect(() => {
    getUserInfoFromToken();
  }, []);

  // Effect để lấy danh sách công việc khi có thay đổi trong bộ lọc
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  // Hàm thay đổi giá trị bộ lọc
  const handleFilterChange = (e, filterType) => {
    const { value } = e.target; // Lấy giá trị mới từ input
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value, // Cập nhật giá trị của bộ lọc tương ứng
    }));
  };

  return (
    <>
      <section>
        <BreadCrumb title={"Job list"} />
        <div className="container">
          <div className="text-center">
            <h1>Jobs Listing</h1>
            <br />
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
              alias.
            </p>
          </div>
        </div>
      </section>

      <section className="section-background">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-xs-12">
              <div className="form">
                <form>
                  <div class="mb-3">
                    <h4>Search</h4>
                    <input
                      type="search"
                      class="form-control"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      placeholder="Search jobs"
                    />
                  </div>

                  <div class="mb-3">
                    <h4>Salary Range</h4>
                    <select
                      class="form-select"
                      name="salaryRange"
                      value={filters.salaryRange}
                      onChange={(e) => handleFilterChange(e, "salaryRange")}
                    >
                      <option value="">All Salary Range</option>
                      <option value="1000-2500">5000 - 10000</option>
                      <option value="10000-15000">10000 - 15000</option>
                      <option value="15000-20000">15000 - 20000</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <h4>Job Type</h4>
                    <select
                      class="form-select"
                      name="jobTypes"
                      value={filters.jobTypes}
                      onChange={(e) => handleFilterChange(e, "jobTypes")}
                    >
                      <option value="">All Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <h4>Location</h4>
                    <select
                      class="form-select"
                      name="location"
                      value={filters.location}
                      onChange={(e) => handleFilterChange(e, "location")}
                    >
                      <option value="">Choose location</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="An Giang">An Giang</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Bình Định">Bình Định</option>
                      <option value="Vĩnh Long">Vĩnh Long</option>
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Quảng Ninh">Quảng Ninh</option>
                      <option value="Thái Nguyên">Thái Nguyên</option>
                      <option value="Lào Cai">Lào Cai</option>
                      <option value="Hạ Long">Hạ Long</option>
                      <option value="Phú Thọ">Phú Thọ</option>
                      <option value="Quảng Bình">Quảng Bình</option>
                      <option value="Nam Định">Nam Định</option>
                      <option value="Vũng Tàu">Vũng Tàu</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() =>
                      setFilters({
                        search: "",
                        salaryRange: "",
                        jobTypes: "",
                        location: "",
                      })
                    }
                  >
                    Reset Filters
                  </button>
                </form>
              </div>
            </div>

            {/* Job listings */}
            <div className="col-lg-9 col-xs-12">
              <div className="row">
                {Array.isArray(jobs) && jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <div key={index} className="col-lg-4 col-md-4 col-sm-6">
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
                              <h3 className="text">
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
                              <h3 className="text">
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
                    </div>
                  ))
                ) : (
                  <p>No jobs available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListPage;
