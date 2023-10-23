import "./homebgslider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

const HomeBgSlider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      effect={"fade"}
      slidesPerView={1}
      navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
      className="relative swiperMain"
      centeredSlides={true}
      // autoplay={{
      //   delay: 3500,
      //   disableOnInteraction: false,
      // }}
    >
      <button id="swiper-back" className="absolute z-50 bottom-2/4">
        <BsChevronLeft size={50} className="text-black" />
      </button>
      <SwiperSlide className="swiperSlider w-full">
        <img
          className="imgs "
          src={
            "https://cdn.wccftech.com/wp-content/uploads/2022/01/hx-ces-2022-group-shot-1920x1170-1.jpg"
          }
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="swiperSlider w-full">
        <img
          className="imgs "
          src={
            "https://i.pinimg.com/1200x/b8/ee/ed/b8eeed64f7af5d099945c89d0ab0b457.jpg"
          }
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="swiperSlider w-full">
        <img
          className="imgs "
          src={
            "https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg"
          }
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide className="swiperSlider w-full">
        <img
          className="imgs "
          src={
            "https://graphicsfamily.com/wp-content/uploads/edd/2020/12/Furniture-Web-Banner-Design-scaled.jpg"
          }
          alt=""
        />
      </SwiperSlide>
      <button id="swiper-forward" className="absolute z-50 bottom-2/4 right-0">
        <BsChevronRight size={50} className="text-black" />
      </button>
    </Swiper>
  );
};
export default HomeBgSlider;
