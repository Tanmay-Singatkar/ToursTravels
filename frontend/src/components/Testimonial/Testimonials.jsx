import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slideToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slideToShow: 2,
          slideToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slideToShow: 1,
          slideToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial  py-4 px-3">
        <p>
          {" "}
          The travel and tourism industry has a significant impact on a
          country's GDP and the livelihoods of many people. It also contributes
          to the global economy, creates jobs, and improves international
          relations. Thailand improves international relations.Thailand is a
          popular tourist destination with a variety of attractions, including
          beaches, islands, and cultural experiences
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Mack Selmon</h6>
            <p> Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial  py-4 px-3">
        <p>
          {" "}
          This Bali tour was truly a dream come true. The attention to detail
          and the quality of service provided made for an unforgettable trip. If
          you're considering a visit to Bali, this tour is an excellent choice.
          I felt well taken care of throughout and came away with wonderful
          memories and a deeper appreciation for Balinese culture.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Lisa Moren</h6>
            <p> Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-4">
        <p>
          {" "}
          This tour was everything I hoped for and more. Paris is a city of
          dreams, and this tour allowed me to experience its beauty, culture,
          and charm in a way that felt both immersive and effortless. If you’re
          planning a trip to Paris, I highly recommend this tour for an
          unforgettable adventure in the City of Light.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Nicoles Henry</h6>
            <p> Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
