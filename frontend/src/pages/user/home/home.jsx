import React from "react";
import { useTranslation } from 'react-i18next';
import product from "../../../assets/images/product-2-720x480.jpg";
import contact from "../../../assets/images/contact-1-600x400.jpg";
import SearchSide from "../../../components/search/searchSide";
import SwiperJob from "../../../components/swiper";
import EmployeeList from "../../../components/companyInstro";

const HomePage = () => {
  const { t } = useTranslation(); // Hàm dịch t() được cung cấp từ i18next

  return (
    <>
      <SearchSide />
      <main>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title text-center">
                  <h2>
                    {t('home.featuredJobs')} <small>{t('home.testimonial')}</small>
                  </h2>
                </div>
              </div>

              <SwiperJob />
            </div>
          </div>
        </section>

        <section id="testimonial">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="section-title text-center">
                  <h2>
                    {t('home.testimonial')} <small>{t('home.testimonialFrom')}</small>
                  </h2>
                </div>

                <div className="owl-carousel owl-theme owl-client">
                  <EmployeeList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <form id="contact-form" role="form" action="" method="post">
                <div className="section-title">
                  <h2>
                    {t('home.contactUs')} <small>{t('home.companyContactText')}</small>
                  </h2>
                </div>

                <div className="col-md-12 col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t('home.enterFullName')}
                    name="name"
                    required
                  />

                  <input
                    type="email"
                    className="form-control"
                    placeholder={t('home.enterEmail')}
                    name="email"
                    required
                  />

                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder={t('home.tellUsMessage')}
                    name="message"
                    required
                  />
                </div>

                <div className="col-md-4 col-sm-12">
                  <input
                    type="submit"
                    className="form-control"
                    name="send message"
                    value={t('home.sendMessage')}
                  />
                </div>
              </form>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="contact-image">
                <img
                  src={contact}
                  className="img-responsive"
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
