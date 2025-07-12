import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Subtitle from "./../shared/Subtitle";

const Gallery = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col lg="12">
            <Subtitle subtitle={"Gallery"} />
            <h2 className="gallery__title">Visit Our Customers Tour Gallery</h2>
          </Col>
          <Col lg="12">
            <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Gallery;
