import { BrowserRouter, Routes, Route } from "react-router-dom";

// css
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { ToastContainer } from "react-toastify";
import HeaderSide from "./utils/layout/header";
import HomePage from "./pages/user/home/home";
import FooterSide from "./utils/layout/footer";
import JobListPage from "./pages/user/job/jobList";
import CandidateForm from "./components/uploadCandidate";

import UpdateCandidate from "./components/delailCandidate";
import CreateJob from "./components/createJob";
import EditJob from "./pages/user/companySide/editJob";
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
import ResumeDetail from "./pages/user/resume/ResumePreview";
import ResumeCV from "./pages/user/resume/resumePrieview";
import { useTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
const App = () => {
  const { t } = useTranslation();
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
  return (
    <div className="App">
      {/* <LanguageSwitcher /> */}
      <HeaderSide
        style={{ position: "fixed", "z-index": 100, right: 0, left: 0 }}
      />
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
            <Route path="/jobList" element={<JobListPage />} />
            <Route path="/job-details/:id" element={<JobDetail />} />
            <Route path="/company-list" element={<CompanyList />} />
            <Route path="/company/:id" element={<CompanyDetail />} />

            {userInfo ? (
              <>
                {userInfo.roleId === 3 ? (
                  <>
                    <Route
                      path="/create-resume"
                      element={<ResumeCreationForm />}
                    />
                    <Route path="/resume-list/:id" element={<ResumeDetail />} />
                    <Route path="/cv" element={<ResumeCV />} />
                    <Route path="/candidateSide" element={<CandidateSide />} />
                    <Route path="/jobmark" element={<JobListMark />} />
                  </>
                ) : userInfo.roleId === 2 ? (
                  <>
                    <Route path="/companySide" element={<CompanySide />} />
                    <Route path="/edit-blog/:id" element={<UpdateBlog />} />

                    <Route path="/create" element={<CandidateForm />} />
                    <Route path="/create/:id" element={<UpdateCandidate />} />
                    <Route path="/createJob" element={<CreateJob />} />
                    <Route path="/editJob/:id" element={<EditJob />} />
                    <Route
                      path="/createCompany"
                      element={<AddEmployeeForm />}
                    />
                    <Route
                      path="/createCompany/:id"
                      element={<UpdateEmployeeForm />}
                    />
                    <Route path="/create-blog" element={<CreateBlog />} />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* <Route path="/load" element={<Loading/>} /> */}

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
};

export default App;
