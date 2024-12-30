import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { TfiBag } from "react-icons/tfi";
import { AiOutlineFile } from "react-icons/ai";
import { FaRegEnvelope, FaRegBookmark } from "react-icons/fa";
import { RiFacebookCircleLine, RiLinkedinBoxLine } from "react-icons/ri";

import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import BreadCrumbDetail from "../../../components/breadCrumbDetail";

import { useSelector, useDispatch } from "react-redux";
import { addToMarkList } from "../../../redux/slice/jobItem";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastNotification/toastNotification";
import { useTranslation } from "react-i18next";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const styleJob = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  "& form": {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  "& input": {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  "& textarea": {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    "&:focus": {
      borderColor: "#3f51b5",
    },
  },
  "& button": {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

const JobDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const markList = useSelector((state) => state.markList.MarkArr);

  const [userInfo, setUserInfo] = useState(null);
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
  
    useEffect(() => {
      getUserInfoFromToken();
    }, []);
  const handleAddToMark = (job) => {
    dispatch(addToMarkList(job));
    // console.log("click");
  };

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const [formData, setFormData] = useState({
    candidateId: userId,
    jobId: id,
    status: "Pending",
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateNote: "",
    applicationDate: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/applications",
        formData
      );
      console.log("Response:", response.data);
      notifySuccess(t("jobDetail.applicationSubmitted"));
    } catch (error) {
      // console.error("Error submitting application:", error);
      notifyError("Error submitting application");
    }
  };

  useEffect(() => {
    // Gọi API để lấy thông tin công việc
    axios
      .get(`http://localhost:5000/api/v1/job/${id}`)
      .then((response) => {
        setJob(response.data);
        return response.data.employerId;
      })
      .then((employerId) => {
        // Gọi API để lấy thông tin employer dựa vào employerId
        return axios.get(`http://localhost:5000/api/v1/employee/${employerId}`);
      })
      .then((response) => setEmployer(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!job || !employer) return <p>Loading...</p>;
  // console.log("usserid: ", userId);

  return (
    <>
      <section>
        <BreadCrumbDetail
          title={t("jobDetail.jobDetail")}
          link={"jobList"}
          page={t("jobList.jobList")}
        />
        <div class="container mt-4">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <div style={{ display: "flex" }}>
                <br />

                <img
                  src={job.imageUrl}
                  alt={job.title}
                  class="img-responsive wc-image"
                  style={{ width: "100%" }}
                />

                <br />
              </div>
            </div>

            <div class="col-lg-9 col-md-9 col-xs-12">
              <form class="form">
                <h2>{job.title}</h2>

                <p class="lead">
                  <strong class="text-primary">Mức lương: {job.salaryRange}</strong>
                </p>

                <p class="lead">
                  <TfiBag /> {job.title} &nbsp;&nbsp;
                  <CiLocationOn /> {job.location} &nbsp;&nbsp;
                  <SlCalender /> {new Date(
                    job.createdAt
                  ).toLocaleDateString()}{" "}
                  &nbsp;&nbsp;
                  <AiOutlineFile /> Contract
                </p>
              </form>
            </div>
          </div>
          <br />
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4> {t("jobDetail.jobDetail")}:</h4>
            </div>
            <div class="panel-body">
              {/* <h4>{t("jobDetail.responsibilities")}:</h4> */}
              <div
                dangerouslySetInnerHTML={{ __html: job.description }}
                style={{ whiteSpace: "pre-wrap" }}
              ></div>
              {/* <h4>{t("jobDetail.requirements")}:</h4> */}
              <div
                dangerouslySetInnerHTML={{ __html: job.requirements }}
                style={{ whiteSpace: "pre-wrap" }}
              ></div>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>
                {t("jobDetail.aboutCompany")}: {employer.companyName}
              </h4>
            </div>

            <div class="panel-body">
              <p>
                Looking to improve the security at your place of business? If
                so, we will provide you with the trained security officers and
                professionally licensed personnel needed for any business. From
                a security guard for construction site security to private event
                security, you can be sure to get the very best from our staff.
                Alternatively we provide tailor-made security guard training for
                your existing security staff.
              </p>

              <div class="row">
                <div class="col-lg-6"></div>

                <div class="col-lg-6"></div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <p>
                    <span>{t("jobDetail.companyName")}:</span>

                    <br />

                    <strong>
                      <a href={`/company/${employer.id}`}>
                        {employer.companyName}
                      </a>
                    </strong>
                  </p>
                </div>

                <div class="col-md-6">
                  <p>
                    <span>{t("jobDetail.contact")}:</span>

                    <br />

                    <strong>{employer.contactPerson}</strong>
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <p>
                    <span>{t("jobDetail.phone")}:</span>

                    <br />

                    <strong>
                      <a href={employer.phone}>{employer.phone}</a>
                    </strong>
                  </p>
                </div>

                <div class="col-md-6">
                  <p>
                    <span>{t("jobDetail.mobilePhone")}:</span>

                    <br />

                    <strong>
                      <a href={employer.phone}>{employer.phone}</a>
                    </strong>
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <p>
                    <span>{t("jobDetail.email")}:</span>

                    <br />

                    <strong>
                      <a href={employer.email}>{employer.email}</a>
                    </strong>
                  </p>
                </div>

                <div class="col-md-6">
                  <p>
                    <span>{t("jobDetail.website")}:</span>

                    <br />

                    <strong>
                      <a href={employer.website}>{employer.website}</a>
                    </strong>
                  </p>
                </div>
              </div>

              <p>
                <span>{t("jobDetail.city")}:</span>

                <br />

                <strong>{employer.address}</strong>
              </p>
            </div>
          </div>

          {userInfo.roleId === 3 ? (
            <div
              class=""
              style={{ display: "flex", "justify-content": "space-between" }}
            >
              <div>
                <a
                  class="section-btn btn btn-primary pull-left me-2"
                  onClick={handleOpen}
                >
                  {t("jobDetail.applyForJob")}
                </a>
                <a
                  class="section-btn btn btn-primary pull-left"
                  onClick={() => handleAddToMark(job)}
                >
                  <FaRegBookmark /> &nbsp; {t("jobDetail.markJob")}
                </a>
              </div>

              <ul class="social-icon pull-right">
                <li className="p-1">
                  <a href="#" class="p-1">
                    <RiFacebookCircleLine />
                  </a>
                </li>
                <li className="p-1">
                  <a href="#" class=" p-1">
                    <FaRegEnvelope />
                  </a>
                </li>
                <li className="p-1">
                  <a href="#" class="p-1">
                    <RiLinkedinBoxLine />
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}

          <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  TransitionComponent: Fade,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={styleJob}>
                  <Typography
                    id="spring-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {t("jobDetail.submitApplication")}
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="number"
                      name="candidateId"
                      value={userId}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      required
                    />

                    <input
                      type="number"
                      name="jobId"
                      value={formData.jobId}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      required
                    />
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      placeholder={t("jobDetail.fullName")}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="candidateEmail"
                      value={formData.candidateEmail}
                      placeholder={t("jobDetail.yourEmail")}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="candidatePhone"
                      value={formData.candidatePhone}
                      placeholder={t("jobDetail.yourPhone")}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      name="candidateNote"
                      value={formData.candidateNote}
                      placeholder={t("jobDetail.yourNote")}
                      onChange={handleChange}
                    />
                    <button
                      type="submit"
                      class="section-btn btn btn-primary pull-left"
                    >
                      {t("jobDetail.applyNow")}
                    </button>
                  </form>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetail;
