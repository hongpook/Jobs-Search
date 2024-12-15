import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastNotification/toastNotification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ChildModal({ applicationData }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(applicationData.status);
  const [candidateNote, setCandidateNote] = useState(
    applicationData.candidateNote
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const statusOptions = ["Pending", "Interview", "Hired", "Rejected"];
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        ...applicationData,
        status,
        candidateNote,
        updatedAt: new Date().toISOString(),
      };

      // console.log("Dữ liệu gửi đi:", updatedData);

      const response = await axios.put(
        `http://localhost:5000/api/v1/application/${applicationData.id}`,
        updatedData
      );
      notifySuccess("Update successfully!!");
      // console.log("Response:", response.data);
      handleClose();
    } catch (err) {
      notifyError("Error for update!!", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Không thể cập nhật thông tin. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <button
        onClick={handleOpen}
        color="primary"
        className="btn col-5 m-2 p-0"
        style={{ border: "1px solid" }}
      >
        Update
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Update application</h2>
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              variant="outlined"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Note"
            variant="outlined"
            fullWidth
            margin="normal"
            value={candidateNote}
            onChange={(e) => setCandidateNote(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const EmployeeDetail = ({ id }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/jobs`);
        setJobs(response.data); // Gán danh sách công việc vào state
      } catch (error) {
        setError("Không thể lấy thông tin công việc. Vui lòng thử lại sau.");
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (applicationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/application/${applicationId}`
      );
      notifySuccess("Deleted successfully!");
      console.log("Response:", response.data);
  
      // Remove the application from the current list
      setJobs((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          applications: job.applications.filter(
            (app) => app.id !== applicationId
          ),
        }))
      );
    } catch (err) {
      console.error(
        "Error deleting application:",
        err.response?.data || err.message
      );
      notifyError("Failed to delete the application. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  const filteredJobs = jobs.filter((job) => job.employerId === id);

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center mt-5">
        <p style={{ color: "orange" }}>
          Không tìm thấy công việc nào cho nhân viên này.
        </p>
      </div>
    );
  }

  const handleOpenModal = (jobId) => {
    setCurrentJobId(jobId);
  };

  const handleCloseModal = () => {
    setCurrentJobId(null);
  };

  const currentJob = jobs.find((job) => job.id === currentJobId);

  return (
    <div className="mt-5">
      <h4>List application job</h4>
      {filteredJobs.map((job) => (
        <div key={job.id} className="mb-4">
          <h5 style={{ color: "blue" }}>{job.title}</h5>
          <p>
            <strong>Location:</strong> {job.location} <br />
            <strong>Salary Range:</strong> {job.salaryRange} <br />
          </p>
          <button onClick={() => handleOpenModal(job.id)}>
            Application list
          </button>
          <hr />
        </div>
      ))}

      <Modal
        open={currentJobId !== null}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "80%" }}>
          {currentJob && currentJob.applications.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Full name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Applydate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentJob.applications.map((application) => (
                  <tr key={application.id}>
                    {/* <td>{application.id}</td> */}
                    <td>{application.candidateName}</td>
                    <td>{application.candidateEmail}</td>
                    <td>{application.candidatePhone}</td>
                    <td>{application.status}</td>
                    <td>
                      {new Date(
                        application.applicationDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="row" style={{ display: "contents" }}>
                      <ChildModal applicationData={application} />
                      <button
                        className="btn btn-danger btn-sm col-5"
                        onClick={() => handleDelete(application.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có ứng viên nào ứng tuyển.</p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeDetail;
