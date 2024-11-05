import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderSide from "./layout/header";
import HomePage from "./pages/user/home";
import FooterSide from "./layout/footer";
import JobListPage from "./pages/user/jobList";
import ContactPage from "./pages/user/contact";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/style.css";

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
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
      <FooterSide />
    </div>
  );
}

export default App;
