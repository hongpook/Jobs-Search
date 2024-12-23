import React, { useEffect, useState } from "react";
import axios from "axios";
import BreadCrumb from "../../../components/breadCrumb";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

const JobListPage = () => {
  const { t } = useTranslation(); // Hook để sử dụng i18n
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    jobTypes: "", // Bộ lọc jobType
    salaryRange: "",
    location: "",
  });

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

  const fetchJobs = () => {
    const searchQuery = filters.search ? `search=${filters.search}` : "";
    const filterQuery = [];
    if (filters.jobTypes) filterQuery.push(`jobType=${filters.jobTypes}`);
    if (filters.salaryRange) filterQuery.push(`salaryRange=${filters.salaryRange}`);
    if (filters.location) filterQuery.push(`location=${filters.location}`);
    const query = [searchQuery, ...filterQuery].filter(Boolean).join("&");

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

  useEffect(() => {
    getUserInfoFromToken();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e, filterType) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <>
      <section>
        <BreadCrumb title={t("jobList.jobList")} />
        <div className="container">
          <div className="text-center">
            <h1>{t("jobList.jobsListing")}</h1>
            <br />
            {/* <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
              alias.
            </p> */}
          </div>
        </div>
      </section>

      <section className="section-background">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-xs-12">
              <div className="form">
                <form>
                  <div className="mb-3">
                    <h4>{t("jobList.search")}</h4>
                    <input
                      type="search"
                      className="form-control"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      placeholder={t("jobList.searchJobs")}
                    />
                  </div>

                  <div className="mb-3">
                    <h4>{t("jobList.salaryRange")}</h4>
                    <select
                      className="form-select"
                      name="salaryRange"
                      value={filters.salaryRange}
                      onChange={(e) => handleFilterChange(e, "salaryRange")}
                    >
                      <option value="">{t("jobList.allSalaryRange")}</option>
                      <option value="1000-2500">5000 - 10000</option>
                      <option value="10000-15000">10000 - 15000</option>
                      <option value="15000-20000">15000 - 20000</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <h4>{t("jobList.jobType")}</h4>
                    <select
                      className="form-select"
                      name="jobTypes"
                      value={filters.jobTypes}
                      onChange={(e) => handleFilterChange(e, "jobTypes")}
                    >
                      <option value="">{t("jobList.allJobType")}</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <h4>{t("jobList.location")}</h4>
                    <select
                      className="form-select"
                      name="location"
                      value={filters.location}
                      onChange={(e) => handleFilterChange(e, "location")}
                    >
                      <option value="">{t("jobList.chooseLocation")}</option>
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
                    className="btn btn-secondary"
                    onClick={() =>
                      setFilters({
                        search: "",
                        salaryRange: "",
                        jobTypes: "",
                        location: "",
                      })
                    }
                  >
                    {t("jobList.resetFilters")}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-9 col-xs-12">
              <div className="row">
                {Array.isArray(jobs) && jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <div key={index} className="col-lg-4 col-md-4 col-sm-6">
                      <div className="courses-thumb courses-thumb-secondary">
                        <div className="courses-top">
                          <div className="courses-image" style={{ height: "204px" }}>
                            <img
                              style={{ width: "100%", height: "inherit" }}
                              src={job.imageUrl}
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
                                {t("jobList.viewDetails")}
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
                                {t("jobList.pleaseLoginToViewDetails")}
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{t("jobList.noJobsAvailable")}</p>
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
