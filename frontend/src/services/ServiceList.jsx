import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Just curious about the weather, we help you stay prepared for whatever the skies may bring.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: " Our Guide offers expert insights. We turns every trip into an unforgettable adventure.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Customization allows you to tailor your travel experience to match your unique preferences and needs.",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
