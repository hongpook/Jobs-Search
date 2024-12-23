import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "../candidateSide/UserProfile.css"; 
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { useTranslation } from 'react-i18next';

import { notifySuccess, notifyError } from "../../../utils/toastNotification/toastNotification";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props;
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

const styleJob = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
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
    "flex-direction": "row",
    "flex-wrap": "wrap",
    gap: "1rem",
    width: "100%",
  },
  "& input": {
    width: "49%",
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

const CompanyProfile = () => {
  const { t } = useTranslation(); // Truyền vào hook i18n

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
    contactPerson: "",
    logo: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      axios
        .get(`http://localhost:5000/api/v1/employee/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setFormData({
            companyName: response.data.companyName,
            email: response.data.email,
            phone: response.data.phone,
            address: response.data.address,
            website: response.data.website,
            description: response.data.description,
            contactPerson: response.data.contactPerson,
            logo: response.data.logo,
          });
        })
        .catch((error) => {
          setMessage(t("error_update"));
          console.error(error);
        });
    } else {
      setMessage(t("error_update"));
    }
  }, [t]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/employee/${userId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess(t("success_update"));
      navigate(`/`);
    } catch (error) {
      notifyError(t("error_update"));
    }
  };

  return (
    <div>
      <div className="profile-container">
        {message && <p>{message}</p>}
        {userInfo ? (
          <div className="profile-card">
            <div className="profile-header">
              <div className="img-profile" >
                <img
                  src={userInfo.logo}
                  alt={t('companyProfile.logo')}
                  className="profile-avatar"
                />
              </div>
              <div className="profile-details">
                <h3>{userInfo.companyName}</h3>
                <p>
                  <strong>{t('companyProfile.email')}:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>{t('companyProfile.phone')}:</strong> {userInfo.phone}
                </p>
                <p>
                  <strong>{t('companyProfile.address')}:</strong> {userInfo.address}
                </p>
                <p>
                  <strong>{t('companyProfile.website')}:</strong> {userInfo.website}
                </p>
                <p>
                  <strong>{t('companyProfile.contact_person')}:</strong> {userInfo.contactPerson}
                </p>
              </div>
            </div>
            <button onClick={handleOpen} className="section-btn btn btn-primary pull-left me-2">
              {t('companyProfile.update_profile')}
            </button>
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
                    {t('companyProfile.update_profile')}
                  </Typography>
                  <form onSubmit={handleSubmit} style={{ display: "flex" }}>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder={t('companyProfile.company_name')}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('companyProfile.email')}
                      disabled
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('companyProfile.phone')}
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={t('companyProfile.address')}
                    />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder={t('companyProfile.website')}
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={t('companyProfile.description')}
                    ></textarea>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder={t('companyProfile.contact_person')}
                    />
                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                    />
                    <Button variant="contained" color="primary" type="submit">
                      {t('companyProfile.submit')}
                    </Button>
                  </form>
                </Box>
              </Fade>
            </Modal>
          </div>
        ) : (
          <p>{t('companyProfile.loading')}</p>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
