import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import './login.css';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <>
    <section>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          slidesPerView={3}      
          slidesPerGroup={1}       
          spaceBetween={20}        
          loop={true}              
          autoplay={{
            delay: 2000,           
            reverseDirection: false 
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="item">Item 1</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 2</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 3</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 4</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 5</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 6</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 7</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 8</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item">Item 9</div>
          </SwiperSlide>
        </Swiper>

    </section>
    </>
  );
}