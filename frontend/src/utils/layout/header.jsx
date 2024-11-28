
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { IoCreateOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { PiBagSimple } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import logo from '../../assets/images/logoJob.png';
import React, { useEffect, useState } from "react";
import {  FaRegBookmark } from "react-icons/fa";
import jwtDecode from "jwt-decode"; 


const HeaderSide = () => {
  const [userInfo, setUserInfo] = useState(null); // State để lưu thông tin người dùng

  // Hàm giải mã token và lấy thông tin
  const getUserInfoFromToken = () => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo(decodedToken); // Lưu toàn bộ thông tin từ token vào state
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  useEffect(() => {
    getUserInfoFromToken(); // Gọi hàm khi component được mount
  }, []);


  const handleSignOut = () => {
    window.localStorage.removeItem('accessToken');
    window.location.href = '/login'; 
  }
  return (
    <>
      {/* <!-- MENU --> */}
      <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div class="container p-3">
        <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/"><img src={logo} style={{width: '40%'}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/jobList">Jobs</Nav.Link>
            <Nav.Link href="/company-list">Companies</Nav.Link>
            <Nav.Link href="/candidate-list">Candidates</Nav.Link>
            <Nav.Link href="/all-blogs">Blogs</Nav.Link>

            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <NavDropdown.Item href="/create-resume"><IoCreateOutline />&nbsp;&nbsp; Create Resume</NavDropdown.Item>
              <NavDropdown.Item href="/job-tips"><RiMenuSearchLine />&nbsp;&nbsp; Job search tips</NavDropdown.Item>
              <NavDropdown.Item href="/recruitment-solutions"><PiBagSimple />&nbsp;&nbsp; Recruitment solutions</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="contact.html">Contact Us</Nav.Link> */}
          </Nav>


          {userInfo ? (
  <>
    
    <NavDropdown title={userInfo.email} id="basic-nav-dropdown" className="mx-2">
      {/* Kiểm tra roleId và hiển thị menu tương ứng */}
      {userInfo.roleId === 2 ? (
        <NavDropdown.Item href="/companySide"><FaUser /> &nbsp;&nbsp; Your profile</NavDropdown.Item>
      ) : userInfo.roleId === 1 ? (
        <NavDropdown.Item href="/adminSide"><FaUser /> &nbsp;&nbsp; Admin side</NavDropdown.Item>
      ) : (
        <NavDropdown.Item href="/candidateSide"><FaUser /> &nbsp;&nbsp; Your profile</NavDropdown.Item>
      )}
      <NavDropdown.Item><a onClick={handleSignOut}><IoIosLogOut /> &nbsp;&nbsp; Log out</a></NavDropdown.Item>
    </NavDropdown>
    <Nav.Link className="section-btn btn btn-primary btn-block px-2" href="/jobmark"><FaRegBookmark/></Nav.Link>
  </>
) : (
  // Nếu không có userInfo, hiển thị login và register
  <Nav>
    <Nav.Link className="section-btn btn btn-primary btn-block me-2 px-4" style={{ padding: 0 }} href="/login">Login</Nav.Link>
    <Nav.Link className="section-btn btn btn-primary btn-block px-4" style={{ padding: 0 }} href="/sign-up">Register</Nav.Link>
  </Nav>
)}

          

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
      </section>
    </>
  );
};

export default HeaderSide;
