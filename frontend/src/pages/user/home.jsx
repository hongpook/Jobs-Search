import CaroudelSide from "../../components/carousel";
import product from "../../assets/images/product-2-720x480.jpg";
import contact from "../../assets/images/contact-1-600x400.jpg";

const HomePage = () => {
  return (
    <>
      {/* <section id="home">
        <div class="row">
          <div class="owl-carousel owl-theme home-slider">
            <div class="item item-first">
              <div class="caption">
                <div class="container">
                  <div class="col-md-6 col-sm-12">
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <h3>
                      Voluptas dignissimos esse, explicabo cum fugit eaque,
                      perspiciatis quia ab nisi sapiente delectus eiet.
                    </h3>
                    <a href="jobs.html" class="section-btn btn btn-default">
                      Browse Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="item item-second">
              <div class="caption">
                <div class="container">
                  <div class="col-md-6 col-sm-12">
                    <h1>
                      Distinctio explicabo vero animi culpa facere voluptatem.
                    </h1>
                    <h3>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nemo, excepturi.
                    </h3>
                    <a href="jobs.html" class="section-btn btn btn-default">
                      Browse Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="item item-third">
              <div class="caption">
                <div class="container">
                  <div class="col-md-6 col-sm-12">
                    <h1>Efficient Learning Methods</h1>
                    <h3>
                      Nam eget sapien vel nibh euismod vulputate in vel nibh.
                      Quisque eu ex eu urna venenatis sollicitudin ut at libero.
                    </h3>
                    <a href="jobs.html" class="section-btn btn btn-default">
                      Browse Jobs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <CaroudelSide />
      <main>
        <section>
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="text-center">
                  <h2>About us</h2>

                  <br />

                  <p class="lead">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Inventore molestias ipsa veritatis nihil iusto maiores natus
                    dolor, a reiciendis corporis obcaecati ex. Totam assumenda
                    impedit aut eum, illum distinctio saepe explicabo.
                    Consequuntur molestiae similique id quos, quasi quas
                    perferendis laboriosam, fugit natus odit totam! Id dolores
                    saepe, sint debitis rerum dolorem tempora aliquid, pariatur
                    enim nisi. Quia ab iusto assumenda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="section-title text-center">
                  <h2>
                    Featured Jobs <small>Lorem ipsum dolor sit amet.</small>
                  </h2>
                </div>
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="courses-thumb courses-thumb-secondary">
                  <div class="courses-top">
                    <div class="courses-image">
                      <img
                        src={product}
                        class="img-responsive"
                        alt=""
                        style={{ width: "100%" }}
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
                      <a href="job-details.html">Lorem ipsum dolor sit amet</a>
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

              <div class="col-md-4 col-sm-4">
                <div class="courses-thumb courses-thumb-secondary">
                  <div class="courses-top">
                    <div class="courses-image">
                      <img
                        src={product}
                        class="img-responsive"
                        alt=""
                        style={{ width: "100%" }}
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
                      <a href="job-details.html">Lorem ipsum dolor sit amet</a>
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

              <div class="col-md-4 col-sm-4">
                <div class="courses-thumb courses-thumb-secondary">
                  <div class="courses-top">
                    <div class="courses-image">
                      <img
                        src={product}
                        class="img-responsive"
                        alt=""
                        style={{ width: "100%" }}
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
                      <a href="job-details.html">Lorem ipsum dolor sit amet</a>
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
        </section>

        <section>
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="section-title text-center">
                  <h2>
                    Latest Blog posts <small>Lorem ipsum dolor sit amet.</small>
                  </h2>
                </div>
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="courses-thumb courses-thumb-secondary">
                  <div class="courses-top">
                    <div class="courses-image">
                      <img
                        src={product}
                        class="img-responsive"
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div class="courses-date">
                      <span title="Author">
                        <i class="fa fa-user"></i> John Doe
                      </span>
                      <span title="Date">
                        <i class="fa fa-calendar"></i> 12/06/2020 10:30
                      </span>
                      <span title="Views">
                        <i class="fa fa-eye"></i> 114
                      </span>
                    </div>
                  </div>

                  <div class="courses-detail">
                    <h3>
                      <a href="blog-post-details.html">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </a>
                    </h3>
                  </div>

                  <div class="courses-info">
                    <a
                      href="blog-post-details.html"
                      class="section-btn btn btn-primary btn-block"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="courses-thumb courses-thumb-secondary">
                  <div class="courses-top">
                    <div class="courses-image">
                      <img
                        src={product}
                        class="img-responsive"
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div class="courses-date">
                      <span title="Author">
                        <i class="fa fa-user"></i> John Doe
                      </span>
                      <span title="Date">
                        <i class="fa fa-calendar"></i> 12/06/2020 10:30
                      </span>
                      <span title="Views">
                        <i class="fa fa-eye"></i> 114
                      </span>
                    </div>
                  </div>

                  <div class="courses-detail">
                    <h3>
                      <a href="blog-post-details.html">
                        Tempora molestiae, iste, consequatur unde sint
                        praesentium!
                      </a>
                    </h3>
                  </div>

                  <div class="courses-info">
                    <a
                      href="blog-post-details.html"
                      class="section-btn btn btn-primary btn-block"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-sm-4">
                <div class="courses-thumb courses-thumb-secondary">
                  <div class="courses-top">
                    <div class="courses-image">
                      <img
                        src={product}
                        class="img-responsive"
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div class="courses-date">
                      <span title="Author">
                        <i class="fa fa-user"></i> John Doe
                      </span>
                      <span title="Date">
                        <i class="fa fa-calendar"></i> 12/06/2020 10:30
                      </span>
                      <span title="Views">
                        <i class="fa fa-eye"></i> 114
                      </span>
                    </div>
                  </div>

                  <div class="courses-detail">
                    <h3>
                      <a href="blog-post-details.html">
                        A voluptas ratione, error provident distinctio, eaque id
                        officia?
                      </a>
                    </h3>
                  </div>

                  <div class="courses-info">
                    <a
                      href="blog-post-details.html"
                      class="section-btn btn btn-primary btn-block"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonial">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="section-title text-center">
                  <h2>
                    Testimonials <small>from around the world</small>
                  </h2>
                </div>

                <div class="owl-carousel owl-theme owl-client">
                  <div class="col-md-4 col-sm-4">
                    <div class="item">
                      <div class="tst-image">
                        <img src={product} class="img-responsive" alt="" />
                      </div>
                      <div class="tst-author">
                        <h4>Jackson</h4>
                        <span>Shopify Developer</span>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ullam voluptas, facilis adipisci dolorem
                        exercitationem nemo aut error impedit repudiandae iusto.
                      </p>
                      <div class="tst-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-4">
                    <div class="item">
                      <div class="tst-image">
                        <img src={product} class="img-responsive" alt="" />
                      </div>
                      <div class="tst-author">
                        <h4>Camila</h4>
                        <span>Marketing Manager</span>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sapiente error, unde eos laborum consequatur
                        officiis perferendis vel debitis, dolore, ipsum
                        quibusdam culpa quisquam, reiciendis aspernatur.
                      </p>
                      <div class="tst-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-4">
                    <div class="item">
                      <div class="tst-image">
                        <img src={product} class="img-responsive" alt="" />
                      </div>
                      <div class="tst-author">
                        <h4>Barbie</h4>
                        <span>Art Director</span>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sit laborum minima autem, reprehenderit mollitia
                        amet id, beatae quo sequi culpa assumenda neque a
                        quisquam, magni.
                      </p>
                      <div class="tst-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 col-sm-4">
                    <div class="item">
                      <div class="tst-image">
                        <img src={product} class="img-responsive" alt="" />
                      </div>
                      <div class="tst-author">
                        <h4>Andrio</h4>
                        <span>Web Developer</span>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolore natus culpa laudantium sit dolores quidem
                        at nulla, iure atque laborum! Odit tempora, enim aliquid
                        at modi illum ducimus explicabo soluta.
                      </p>
                      <div class="tst-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section id="contact">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <form id="contact-form" role="form" action="" method="post">
                <div class="section-title">
                  <h2>
                    Contact us{" "}
                    <small>we love conversations. let us talk!</small>
                  </h2>
                </div>

                <div class="col-md-12 col-sm-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter full name"
                    name="name"
                    required
                  />

                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter email address"
                    name="email"
                    required
                  />

                  <textarea
                    class="form-control"
                    rows="6"
                    placeholder="Tell us about your message"
                    name="message"
                    required
                  />
                </div>

                <div class="col-md-4 col-sm-12">
                  <input
                    type="submit"
                    class="form-control"
                    name="send message"
                    value="Send Message"
                  />
                </div>
              </form>
            </div>

            <div class="col-md-6 col-sm-12">
              <div class="contact-image">
                <img
                  src={contact}
                  class="img-responsive"
                  alt="Smiling Two Girls"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
