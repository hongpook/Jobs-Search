import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "../candidateSide/UserProfile.css"; // Import file CSS
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import {
  notifySuccess,
  notifyError,
  notifyWarning,
} from "../../../utils/toastNotification/toastNotification";


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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Khai báo navigate để điều hướng sau khi cập nhật

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
    contactPerson: "",
    logo: null, // avatar file
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Gửi yêu cầu lấy thông tin employee từ backend
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
          setMessage("Failed to load employee info");
          console.error(error);
        });
    } else {
      setMessage("No access token found");
    }
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0], // Lấy file đầu tiên nếu có
    }));
  };
  // Xử lý thay đổi trong form
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

      console.log(response.data); 
      navigate(`/`); 
      notifySuccess("Update profile successfully!!")
    } catch (error) {
      // console.error(error); 
      notifyError("Error update fail!!")
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
                  alt="Logo"
                  className="profile-avatar"
                />
              </div>
              <div className="profile-details">
                <h3>{userInfo.companyName}</h3>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phone}
                </p>
                <p>
                  <strong>Address:</strong> {userInfo.address}
                </p>
                <p>
                  <strong>Website:</strong> {userInfo.website}
                </p>
                <p>
                  <strong>Contact Person:</strong> {userInfo.contactPerson}
                </p>
              </div>
            </div>
            <button onClick={handleOpen} className="section-btn btn btn-primary pull-left me-2">
              Update Profile
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
                    Update Your Information
                  </Typography>
                  <form onSubmit={handleSubmit} style={{ display: "flex" }}>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      disabled
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Website"
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                    ></textarea>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Contact Person"
                    />
                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                    />
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </Box>
              </Fade>
            </Modal>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
