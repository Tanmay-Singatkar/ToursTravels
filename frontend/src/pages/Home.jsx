import React from "react";
import "../styles/home.css";

import { Container, Row, Col } from "react-bootstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "./../shared/Subtitle";

import SearchBar from "../shared/SearchBar";
import ServiceList from "./../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* -------------hero section start ------------*/}
      <section>
        <Container>
          <Row>
            <Col>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center  ">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Travelling Opens the Door to Creating{" "}
                  <span className="highlight"> Memories</span>
                </h1>
                <p>
                  Welcome to TravelWorld, your ultimate gateway to unforgettable
                  journeys! You're dreaming journeys can become true by getting
                  ur best destination. We tried to made it easier to find you
                  for it. Our platform offers a seamless experience for
                  discovering, planning your perfect trip.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ----------------hero section start---------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What We Serve</h5>
              <h2 className="services__title">We Offer Our Best Services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*-----------featured tour section started*--------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/*-----------featured tour section ended--------------*/}

      {/*-----------experience section start ----------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />

                <h2>
                  With Our All Experience <br /> We Will Serve You{" "}
                </h2>
                
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>1k+</span>
                  <h6>Succesful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>200+</span>
                  <h6>Succesful Clients</h6>
                </div>
                <div className="counter__box">
                  <span>1</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*-----------experience section end ----------------*/}

      {/*------------gallery section start-----------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit Our Customers Tour Gallery
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/*------------gallery section end-----------------*/}

      {/*------------testimonial section start-----------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">
                WHAT OUR FAN SAYS ABOUT US!
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/*------------testimonial section end-----------------*/}
      <Newsletter />
    </>
  );
};

export default Home;
