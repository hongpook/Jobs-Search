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
import CompanySide from "./pages/user/companySide/companySide";
import CandidateSide from "./pages/user/candidateSide/candidateSide";

import CompanyList from "./pages/user/company/CompanyList";
import CandidateList from "./pages/user/candidate/candidateList";
import CandidateDetail from "./pages/user/candidate/candidateDetail";
import CompanyDetail from "./pages/user/company/companyDetail";

import LoginSide from "./pages/user/auth/loginSide";
import JobListMark from "./pages/user/job/jobMark";
import RegisterSide from "./pages/user/auth/registerSide";
import CreateBlog from "./pages/user/blog/createBlog";
import UpdateBlog from "./pages/user/blog/updateBlog";
import BlogDetails from "./pages/user/blog/blogDetail";
import SolutionBlog from "./pages/user/blog/solutionBlog";
import JobTipBlog from "./pages/user/blog/jobTipBlog";
import AllBlogs from "./pages/user/blog/allBlog";
import ResumeCreationForm from "./pages/user/resume/ResumeForm";
import ResumeList from "./pages/user/resume/resumeList";
import ResumeDetail from "./pages/user/resume/ResumePreview";
import ResumeCV from "./pages/user/resume/resumePrieview";
import AA from "./components/aa";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./components/LanguageSwitcher";

const App = () => {

  const { t } = useTranslation();
  return (
    <div className="App">
      {/* <LanguageSwitcher /> */}
      <HeaderSide style={{position: 'fixed', 'z-index': 100, right: 0, left: 0}} />
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

        {/* blog */}
            <Route path="/all-blogs" element={<AllBlogs />} />
            <Route path="/blog-detail/:id" element={<BlogDetails />} />
        {/* candidateList    */}
            <Route path="/candidate-list" element={<CandidateList />} />
            <Route path="/candidate/:id" element={<CandidateDetail />} />

        {/* auth */}
            <Route path="/login" element={<LoginSide />} />
            <Route path="/sign-up" element={<RegisterSide />} />
            
        {/* category blog */}
            <Route path="/recruitment-solutions" element={<SolutionBlog />} />
            <Route path="/job-tips" element={<JobTipBlog />} />


  {/* candidate */}
            {/* job */}
            <Route path="/jobList" element={<JobListPage />} />
            <Route path="/job-details/:id" element={<JobDetail />} />
        {/* company */}
            <Route path="/company-list" element={<CompanyList />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            
        {/* resume */}
            <Route path="/create-resume" element={<ResumeCreationForm />} />
            <Route path="/resume-list" element={<ResumeList />} />
            <Route path="/resume-list/:id" element={<ResumeDetail />} />
            <Route path="/cv" element={<ResumeCV />} />
        {/* candidateSide */}
            <Route path="/candidateSide" element={<CandidateSide />} />
            <Route path="/jobmark" element={<JobListMark />} />


      {/* employeeSide */}
            <Route path="/companySide" element={<CompanySide />} />
            <Route path="/edit-blog/:id" element={<UpdateBlog />} />




            <Route path="/create" element={<CandidateForm />} />
            <Route path="/create/:id" element={<UpdateCandidate />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/createJob/:id" element={<EditJob />} />
            <Route path="/createCompany" element={<AddEmployeeForm />} />
            <Route path="/createCompany/:id" element={<UpdateEmployeeForm />} />
            <Route path="/create-blog" element={<CreateBlog />} />

            



            
            
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
