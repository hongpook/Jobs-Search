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
import { useTranslation } from 'react-i18next';
import { notifyError, notifySuccess } from "../../../utils/toastNotification/toastNotification";

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
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(applicationData.status);
  const [candidateNote, setCandidateNote] = useState(applicationData.candidateNote);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const statusOptions = [t("applicationListCompany.pending"), t("applicationListCompany.interview"), t("applicationListCompany.hired"), t("applicationListCompany.rejected")];
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

      const response = await axios.put(
        `http://localhost:5000/api/v1/application/${applicationData.id}`,
        updatedData
      );
      notifySuccess(t("applicationListCompany.updateSuccess"));
      handleClose();
    } catch (err) {
      notifyError(t("applicationListCompany.updateError"), err.response?.data || err.message);
      setError(
        err.response?.data?.message || t("applicationListCompany.updateError")
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
        {t("applicationListCompany.update")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">{t("applicationListCompany.updateApplication")}</h2>
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-select-label">{t("applicationListCompany.status")}</InputLabel>
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
            label={t("applicationListCompany.note")}
            variant="outlined"
            fullWidth
            margin="normal"
            value={candidateNote}
            onChange={(e) => setCandidateNote(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              {t("applicationListCompany.cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? t("applicationListCompany.loading") : t("applicationListCompany.update")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const EmployeeDetail = ({ id }) => {
  const { t } = useTranslation();
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
        setError(t("applicationListCompany.error"));
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (applicationId) => {
    const result = await Swal.fire({
      title: t("applicationListCompany.deleteConfirmation"),
      text: t("applicationListCompany.deleteConfirmation"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("applicationListCompany.delete"),
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/application/${applicationId}`
      );
      notifySuccess(t("applicationListCompany.deleteSuccess"));
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
      notifyError(t("applicationListCompany.error"));
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>{t("applicationListCompany.loading")}</p>
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
        <p style={{ color: "orange" }}>{t("applicationListCompany.noJobsFound")}</p>
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
      <h4>{t("applicationListCompany.applicationList")}</h4>
      {filteredJobs.map((job) => (
        <div key={job.id} className="mb-4">
          <h5 style={{ color: "blue" }}>{job.title}</h5>
          <p>
            <strong>{t("jobDetail.location")}:</strong> {job.location} <br />
            <strong>{t("jobDetail.salaryRange")}:</strong> {job.salaryRange} <br />
          </p>
          <button onClick={() => handleOpenModal(job.id)}>
            {t("applicationListCompany.applicationList")}
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
                  <th>{t("applicationListCompany.fullName")}</th>
                  <th>{t("applicationListCompany.email")}</th>
                  <th>{t("applicationListCompany.phone")}</th>
                  <th>{t("applicationListCompany.status")}</th>
                  <th>{t("applicationListCompany.applyDate")}</th>
                  <th>{t("applicationListCompany.action")}</th>
                </tr>
              </thead>
              <tbody>
                {currentJob.applications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.candidateName}</td>
                    <td>{application.candidateEmail}</td>
                    <td>{application.candidatePhone}</td>
                    <td>{application.status}</td>
                    <td>
                      {new Date(application.applicationDate).toLocaleDateString()}
                    </td>
                    <td className="row" style={{ display: "contents" }}>
                      <ChildModal applicationData={application} />
                      <button
                        className="btn btn-danger col-5"
                        onClick={() => handleDelete(application.id)}
                      >
                        {t("applicationListCompany.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>{t("applicationListCompany.noApplications")}</div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeeDetail;
