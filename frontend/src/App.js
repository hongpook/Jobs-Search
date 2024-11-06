import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderSide from "./layout/header";
import HomePage from "./pages/user/home";
import FooterSide from "./layout/footer";
import JobListPage from "./pages/user/jobList";
import ContactPage from "./pages/user/contact";
import CandidateForm from "./components/uploadCandidate";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/style.css";
import UpdateCandidate from "./components/delailCandidate";
import CreateJob from "./components/createJob";
import EditJob from "./components/jobDetail";
import AddEmployeeForm from "./components/createCompany";
import UpdateEmployeeForm from "./components/updateCompany";

const App = () => {
  return (
    <div className="App">
      <HeaderSide />
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobList" element={<JobListPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/create" element={<CandidateForm />} />
            <Route path="/create/:id" element={<UpdateCandidate />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/createJob/:id" element={<EditJob />} />
            <Route path="/createCompany" element={<AddEmployeeForm />} />
            <Route path="/createCompany/:id" element={<UpdateEmployeeForm />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
      <FooterSide />
    </div>
  );
}

export default App;
