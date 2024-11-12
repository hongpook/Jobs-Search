import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { IoCreateOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { PiBagSimple } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";



const HeaderSide = () => {

  const handleSignOut = () => {
    window.localStorage.removeItem('accessToken');
  }
  return (
    <>
      {/* <!-- MENU --> */}
      <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div class="container p-3">
        <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Jobs Agency</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/jobList">Jobs</Nav.Link>
            <Nav.Link href="/company-list">Companies</Nav.Link>
            <Nav.Link href="/candidate-list">Candidates</Nav.Link>

            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <NavDropdown.Item href="team.html"><IoCreateOutline />&nbsp;&nbsp; Create Resume</NavDropdown.Item>
              <NavDropdown.Item href="testimonials.html"><RiMenuSearchLine />&nbsp;&nbsp; Job search tips</NavDropdown.Item>
              <NavDropdown.Item href="terms.html"><PiBagSimple />&nbsp;&nbsp; Recruitment solutions</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="contact.html">Contact Us</Nav.Link> */}
          </Nav>

          {/* <Nav>
            <Nav.Link className="section-btn btn btn-primary btn-block me-2 px-4 " style={{padding: 0}} href="/login">Login</Nav.Link>
            <Nav.Link className="section-btn btn btn-primary btn-block px-4" style={{padding: 0}} href="/sign-up">Register</Nav.Link>
          </Nav> */}

          <Nav>
          <Nav.Link className="section-btn btn btn-primary btn-block px-4" href="/sign-up">Mark list</Nav.Link>
          <NavDropdown title="O" id="basic-nav-dropdown">
              <NavDropdown.Item href="/candidateSide"><FaUser /> &nbsp;&nbsp; Your profile</NavDropdown.Item>
              <NavDropdown.Item ><a onClick={handleSignOut}><IoIosLogOut /> &nbsp;&nbsp; Log out</a></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>
      </section>
    </>
  );
};

export default HeaderSide;
