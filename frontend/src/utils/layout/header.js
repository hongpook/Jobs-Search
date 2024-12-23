import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { IoCreateOutline } from "react-icons/io5";
import { RiMenuSearchLine } from "react-icons/ri";
import { PiBagSimple } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import logo from "../../assets/images/logoJob.png";
import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const HeaderSide = () => {
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

  const handleSignOut = () => {
    window.localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  return (
    <>
      {/* <!-- MENU --> */}
      <section class="navbar custom-navbar" role="navigation">
        <LanguageSwitcher />
        <div class="container">
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">
                <img src={logo} style={{ width: "40%" }} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">{t("header.home")}</Nav.Link>
                  <Nav.Link href="/jobList">{t("header.job")}</Nav.Link>
                  <Nav.Link href="/company-list">
                    {t("header.company")}
                  </Nav.Link>
                  <Nav.Link href="/candidate-list">
                    {t("header.candidate")}
                  </Nav.Link>
                  <Nav.Link href="/all-blogs">{t("header.blog")}</Nav.Link>

                  <NavDropdown title={t("header.tool")} id="basic-nav-dropdown">
                    {userInfo?.roleId === 3 ? (
                      <NavDropdown.Item href="/create-resume">
                        <IoCreateOutline />
                        &nbsp;&nbsp; {t("createResume")}
                      </NavDropdown.Item>
                    ) : (
                      <></>
                    )}
                    {/* <NavDropdown.Item href="/create-resume"><IoCreateOutline />&nbsp;&nbsp; Create Resume</NavDropdown.Item> */}
                    <NavDropdown.Item href="/job-tips">
                      <RiMenuSearchLine />
                      &nbsp;&nbsp; {t("header.jobSearchTip")}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/recruitment-solutions">
                      <PiBagSimple />
                      &nbsp;&nbsp; {t("header.solution")}
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link href="contact.html">Contact Us</Nav.Link> */}
                </Nav>

                {userInfo ? (
                  <>
                    <NavDropdown
                      title={userInfo.email}
                      id="basic-nav-dropdown"
                      className="mx-2"
                    >
                      {userInfo.roleId === 2 ? (
                        <NavDropdown.Item href="/companySide">
                          <FaUser /> &nbsp;&nbsp; {t("header.profile")}
                        </NavDropdown.Item>
                      ) : userInfo.roleId === 1 ? (
                        <NavDropdown.Item href="/adminSide">
                          <FaUser /> &nbsp;&nbsp; {t("header.adminSide")}
                        </NavDropdown.Item>
                      ) : (
                        <NavDropdown.Item href="/candidateSide">
                          <FaUser /> &nbsp;&nbsp; {t("header.profile")}
                        </NavDropdown.Item>
                      )}
                      <NavDropdown.Item>
                        <a onClick={handleSignOut}>
                          <IoIosLogOut /> &nbsp;&nbsp; {t("header.logOut")}
                        </a>
                      </NavDropdown.Item>
                    </NavDropdown>
                    {userInfo.roleId === 3 ? (
                      <Nav.Link
                        className="section-btn btn btn-primary btn-block px-2"
                        href="/jobmark"
                      >
                        <FaRegBookmark />
                      </Nav.Link>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  // Nếu không có userInfo, hiển thị login và register
                  <Nav>
                    <Nav.Link
                      className="section-btn btn btn-primary btn-block me-2 px-4"
                      style={{ padding: 0 }}
                      href="/login"
                    >
                      {t("header.login")}
                    </Nav.Link>
                    <Nav.Link
                      className="section-btn btn btn-primary btn-block px-4"
                      style={{ padding: 0 }}
                      href="/sign-up"
                    >
                      {t("header.register")}
                    </Nav.Link>
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
