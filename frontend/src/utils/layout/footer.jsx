import logo from '../../assets/images/logoJob.png';

const FooterSide = () => {
  return (
    <>
      <footer id="footer">
        <div class="container">
          <img src={logo} style={{    width: '20%', 'margin-bottom': '20px'}}/>
          <div class="row">
            <div class="col-md-4 col-sm-6">
              <div class="footer-info">
                <div class="section-title">
                  <h2>Headquarter</h2>
                </div>
                <address>
                  <p>
                    566/137/60A Ward 5 <br />
                    Nguyen Thai Son St, Go Vap Dist, HCMC
                  </p>
                </address>

                <ul class="social-icon">
                  <li>
                    <a
                      href="#"
                      class="fa fa-facebook-square"
                      attr="facebook icon"
                    ></a>
                  </li>
                  <li>
                    <a href="#" class="fa fa-twitter"></a>
                  </li>
                  <li>
                    <a href="#" class="fa fa-instagram"></a>
                  </li>
                </ul>

                <div class="copyright-text">
                  <p>Copyright &copy; 2024 @hongpook12</p>
                  
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-6">
              <div class="footer-info">
                <div class="section-title">
                  <h2>Contact Info</h2>
                </div>
                <address>
                  <p>+84 394 421 371</p>
                  <p>
                    <a href="mailto:dauhongphuc.011203@gmail.com">dauhongphuc.011203@gmail.com</a>
                  </p>
                </address>

                <div class="footer_menu">
                  <h2>Quick Links</h2>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="about-us.html">Jobs</a>
                    </li>
                    <li>
                      <a href="terms.html">Companies</a>
                    </li>
                    <li>
                      <a href="contact.html">Candidates</a>
                    </li>
                    <li>
                      <a href="contact.html">Blogs</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-12">
              <div class="footer-info newsletter-form">
                <div class="section-title">
                  <h2>Newsletter Signup</h2>
                </div>
                <div>
                  <div class="form-group">
                    <form action="#" method="get">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        style={{border: '1px solid #29ca8e', color: '#000', backgroundColor: '#fff'}}
                        required
                      />
                      <input
                        type="submit"
                        class="form-control"
                        name="submit"
                        id="form-submit"
                        value="Send me"
                        style={{border: '1px solid #29ca8e'}}
                      />
                    </form>
                    <span>
                      <sup>*</sup> Please note - we do not spam your email.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSide;
