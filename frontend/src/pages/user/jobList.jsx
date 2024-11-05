import React from "react";
import product from '../../assets/images/product-1-720x480.jpg'

const JobListPage = () => {
  return (
    <>
      <section>
        <div class="container">
          <div class="text-center">
            <h1>Jobs Listing</h1>

            <br />

            <p class="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
              alias.
            </p>
          </div>
        </div>
      </section>

      <section class="section-background">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-xs-12">
              <div class="form">
                <form>
                <h4>Search</h4>
                  <input type="search"/>
                  <button type="submit">Search</button>
                </form>
                <br/>
                <form action="#">
                  <h4>Type</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Contract (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Full time (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Internship (5)
                    </label>
                  </div>

                  <br />

                  <h4>Category</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Accounting / Finance / Insurance Jobs (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Accounting / Finance / Insurance Jobs (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Accounting / Finance / Insurance Jobs (5)
                    </label>
                  </div>

                  <br />

                  <h4>Career levels</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Entry Level (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Entry Level (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Entry Level (5)
                    </label>
                  </div>

                  <br />

                  <h4>Education levels</h4>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Associate Degree (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Associate Degree (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />
                      Associate Degree (5)
                    </label>
                  </div>

                  <br />

                  <h4>Years of experience</h4>

                  <div>
                    <label>
                      <input type="checkbox" />1 (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />1 (5)
                    </label>
                  </div>

                  <div>
                    <label>
                      <input type="checkbox" />1 (5)
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <div class="col-lg-9 col-xs-12">
              <div class="row">
                <div class="col-lg-6 col-md-4 col-sm-6">
                  <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                      <div class="courses-image">
                        <img
                          style={{width:'100%'}}
                          src={product}
                          class="img-responsive"
                          alt=""
                        />
                      </div>
                      <div class="courses-date">
                        <span title="Posted on">
                          <i class="fa fa-calendar"></i> 15-06-2020
                        </span>
                        <span title="Location">
                          <i class="fa fa-map-marker"></i> London
                        </span>
                        <span title="Type">
                          <i class="fa fa-file"></i> Contract
                        </span>
                      </div>
                    </div>

                    <div class="courses-detail">
                      <h3>
                        <a href="job-details.html">
                          Lorem ipsum dolor sit amet
                        </a>
                      </h3>

                      <p class="lead">
                        <strong>$60 000</strong>
                      </p>

                      <p>
                        Medical / Health Jobs for{" "}
                        <strong>BMI Kings Park Hospital</strong>
                      </p>
                    </div>

                    <div class="courses-info">
                      <a
                        href="job-details.html"
                        class="section-btn btn btn-primary btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-4 col-sm-6">
                  <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                      <div class="courses-image">
                        <img
                          style={{width:'100%'}}
                          src={product}
                          class="img-responsive"
                          alt=""
                        />
                      </div>
                      <div class="courses-date">
                        <span title="Posted on">
                          <i class="fa fa-calendar"></i> 15-06-2020
                        </span>
                        <span title="Location">
                          <i class="fa fa-map-marker"></i> London
                        </span>
                        <span title="Type">
                          <i class="fa fa-file"></i> Contract
                        </span>
                      </div>
                    </div>

                    <div class="courses-detail">
                      <h3>
                        <a href="job-details.html">
                          Lorem ipsum dolor sit amet
                        </a>
                      </h3>

                      <p class="lead">
                        <strong>$60 000</strong>
                      </p>

                      <p>
                        Medical / Health Jobs for{" "}
                        <strong>BMI Kings Park Hospital</strong>
                      </p>
                    </div>

                    <div class="courses-info">
                      <a
                        href="job-details.html"
                        class="section-btn btn btn-primary btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-4 col-sm-6">
                  <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                      <div class="courses-image">
                        <img
                          style={{width:'100%'}}
                          src={product}
                          class="img-responsive"
                          alt=""
                        />
                      </div>
                      <div class="courses-date">
                        <span title="Posted on">
                          <i class="fa fa-calendar"></i> 15-06-2020
                        </span>
                        <span title="Location">
                          <i class="fa fa-map-marker"></i> London
                        </span>
                        <span title="Type">
                          <i class="fa fa-file"></i> Contract
                        </span>
                      </div>
                    </div>

                    <div class="courses-detail">
                      <h3>
                        <a href="job-details.html">
                          Lorem ipsum dolor sit amet
                        </a>
                      </h3>

                      <p class="lead">
                        <strong>$60 000</strong>
                      </p>

                      <p>
                        Medical / Health Jobs for{" "}
                        <strong>BMI Kings Park Hospital</strong>
                      </p>
                    </div>

                    <div class="courses-info">
                      <a
                        href="job-details.html"
                        class="section-btn btn btn-primary btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-4 col-sm-6">
                  <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                      <div class="courses-image">
                        <img
                          style={{width:'100%'}}
                          src={product}
                          class="img-responsive"
                          alt=""
                        />
                      </div>
                      <div class="courses-date">
                        <span title="Posted on">
                          <i class="fa fa-calendar"></i> 15-06-2020
                        </span>
                        <span title="Location">
                          <i class="fa fa-map-marker"></i> London
                        </span>
                        <span title="Type">
                          <i class="fa fa-file"></i> Contract
                        </span>
                      </div>
                    </div>

                    <div class="courses-detail">
                      <h3>
                        <a href="job-details.html">
                          Lorem ipsum dolor sit amet
                        </a>
                      </h3>

                      <p class="lead">
                        <strong>$60 000</strong>
                      </p>

                      <p>
                        Medical / Health Jobs for{" "}
                        <strong>BMI Kings Park Hospital</strong>
                      </p>
                    </div>

                    <div class="courses-info">
                      <a
                        href="job-details.html"
                        class="section-btn btn btn-primary btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-5 col-sm-6">
                  <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                      <div class="courses-image">
                        <img
                          style={{width:'100%'}}
                          src={product}
                          class="img-responsive"
                          alt=""
                        />
                      </div>
                      <div class="courses-date">
                        <span title="Posted on">
                          <i class="fa fa-calendar"></i> 15-06-2020
                        </span>
                        <span title="Location">
                          <i class="fa fa-map-marker"></i> London
                        </span>
                        <span title="Type">
                          <i class="fa fa-file"></i> Contract
                        </span>
                      </div>
                    </div>

                    <div class="courses-detail">
                      <h3>
                        <a href="job-details.html">
                          Lorem ipsum dolor sit amet
                        </a>
                      </h3>

                      <p class="lead">
                        <strong>$60 000</strong>
                      </p>

                      <p>
                        Medical / Health Jobs for{" "}
                        <strong>BMI Kings Park Hospital</strong>
                      </p>
                    </div>

                    <div class="courses-info">
                      <a
                        href="job-details.html"
                        class="section-btn btn btn-primary btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-4 col-sm-6">
                  <div class="courses-thumb courses-thumb-secondary">
                    <div class="courses-top">
                      <div class="courses-image">
                        <img
                          style={{width:'100%'}}
                          src={product}
                          class="img-responsive"
                          alt=""
                        />
                      </div>
                      <div class="courses-date">
                        <span title="Posted on">
                          <i class="fa fa-calendar"></i> 15-06-2020
                        </span>
                        <span title="Location">
                          <i class="fa fa-map-marker"></i> London
                        </span>
                        <span title="Type">
                          <i class="fa fa-file"></i> Contract
                        </span>
                      </div>
                    </div>

                    <div class="courses-detail">
                      <h3>
                        <a href="job-details.html">
                          Lorem ipsum dolor sit amet
                        </a>
                      </h3>

                      <p class="lead">
                        <strong>$60 000</strong>
                      </p>

                      <p>
                        Medical / Health Jobs for{" "}
                        <strong>BMI Kings Park Hospital</strong>
                      </p>
                    </div>

                    <div class="courses-info">
                      <a
                        href="job-details.html"
                        class="section-btn btn btn-primary btn-block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default JobListPage;