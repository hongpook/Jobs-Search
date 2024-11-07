import React from "react";

const HeaderSide = () => {
  return (
    <>
      {/* <!-- MENU --> */}
      <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div class="container p-3">
          <div class="navbar-header">
            <button
              class="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span class="icon icon-bar"></span>
              <span class="icon icon-bar"></span>
              <span class="icon icon-bar"></span>
            </button>

            {/* <!-- lOGO TEXT HERE --> */}
            <a href="#" class="navbar-brand">
              Jobs Agency
            </a>
          </div>

          {/* <!-- MENU LINKS --> */}
          <div class="navbar-header">
            <ul class="nav">
              <li class="active">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/jobList">Jobs</a>
              </li>
              <li>
                <a href="about-us.html">About Us</a>
              </li>
              <li>
                <a href="blog-posts.html">Blog</a>
              </li>
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  More <span class="caret"></span>
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a href="team.html">Team</a>
                  </li>
                  <li>
                    <a href="testimonials.html">Testimonials</a>
                  </li>
                  <li>
                    <a href="terms.html">Terms</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="contact.html">Contact Us</a>
              </li>
            </ul>
          </div>
          <div class="navbar-header">
            <a href="/" className="p-2">
              Login
            </a>
            <a href="/" className="p-2">
              Register
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderSide;
