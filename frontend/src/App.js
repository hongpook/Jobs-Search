import { BrowserRouter, Routes, Route } from "react-router-dom";


// css
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { ToastContainer } from 'react-toastify';
import HeaderSide from "./utils/layout/header"; 
import HomePage from "./pages/user/home/home";
import FooterSide from "./utils/layout/footer";
import JobListPage from "./pages/user/job/jobList";
import CandidateForm from "./components/uploadCandidate";

import UpdateCandidate from "./components/delailCandidate";
import CreateJob from "./components/createJob";
import EditJob from "./components/jobDetail";
import AddEmployeeForm from "./components/createCompany";
import UpdateEmployeeForm from "./components/updateCompany";
import JobDetail from "./pages/user/job/jobDetail";
import AddNewJob from "./pages/user/companySide/addJob";
import CompanySide from "./pages/user/companySide/companySide";
import CandidateSide from "./pages/user/candidateSide/candidateSide";
import UpdateJob from "./pages/user/companySide/updateJob";
import CvForm from "./pages/user/cv/resumeForm";

import Login from "./pages/user/auth/candidateAuth/login";
import Register from "./pages/user/auth/candidateAuth/register";

import CompanyList from "./pages/user/company/CompanyList";
import CandidateList from "./pages/user/candidate/candidateList";
import CandidateDetail from "./pages/user/candidate/candidateDetail";
import CompanyDetail from "./pages/user/company/companyDetail";

import LoginCompany from "./pages/user/auth/companyauth/loginCompany";
import RegisterCompany from "./pages/user/auth/companyauth/registerCompany";
import CompanyJobs from "./pages/user/resume/resume";
import LoginSide from "./pages/user/auth/loginSide";
import CandidatePro from "./pages/user/auth/loginForm";
import JobListMark from "./pages/user/job/jobMark";

const App = () => {
  return (
    <div className="App">
      <HeaderSide />
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} /> */}

            {/* <Route path="/login" element={<LoginCompany />} />
            <Route path="/sign-up" element={<RegisterCompany />} /> */}


            <Route path="/jobList" element={<JobListPage />} />
            <Route path="/job-details/:id" element={<JobDetail />} />
            <Route path="/create" element={<CandidateForm />} />
            <Route path="/create/:id" element={<UpdateCandidate />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/createJob/:id" element={<UpdateJob />} />
            <Route path="/createCompany" element={<AddEmployeeForm />} />
            <Route path="/createCompany/:id" element={<UpdateEmployeeForm />} />
            <Route path="/createResume" element={<CvForm />} />
            <Route path="/company-list" element={<CompanyList />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/candidate-list" element={<CandidateList />} />
            <Route path="/candidate/:id" element={<CandidateDetail />} />
            <Route path="/companyJob" element={<CompanyJobs />} />
            <Route path="/jobmark" element={<JobListMark />} />



            <Route path="/dangnhap" element={<CandidatePro />} />
            <Route path="/login" element={<LoginSide />} />




            <Route path="/companySide" element={<CompanySide />} />
            <Route path="/candidateSide" element={<CandidateSide />} />
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
