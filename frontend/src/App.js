import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HeaderSide from "./utils/layout/header"; 
import HomePage from "./pages/user/home";
import FooterSide from "./utils/layout/footer";
import JobListPage from "./pages/user/jobList";
import CandidateForm from "./components/uploadCandidate";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/style.css";
import UpdateCandidate from "./components/delailCandidate";
import CreateJob from "./components/createJob";
import EditJob from "./components/jobDetail";
import AddEmployeeForm from "./components/createCompany";
import UpdateEmployeeForm from "./components/updateCompany";
import JobDetail from "./pages/user/jobDetail";
import AddNewJob from "./pages/user/company/addJob";
import CompanySide from "./pages/user/company/companySide";
import UpdateJob from "./pages/user/company/updateJob";
import CvForm from "./pages/user/cv/resumeForm";

const App = () => {
  return (
    <div className="App">
      <HeaderSide />
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobList" element={<JobListPage />} />
            <Route path="/job-details/:id" element={<JobDetail />} />
            <Route path="/create" element={<CandidateForm />} />
            <Route path="/create/:id" element={<UpdateCandidate />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/createJob/:id" element={<UpdateJob />} />
            <Route path="/createCompany" element={<AddEmployeeForm />} />
            <Route path="/createCompany/:id" element={<UpdateEmployeeForm />} />
            <Route path="/createResume" element={<CvForm />} />




            <Route path="/companySide" element={<CompanySide />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
      <FooterSide />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      
    </div>
  );
}

export default App;
