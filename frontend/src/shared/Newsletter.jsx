import React, { useState } from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handelClick = (e) => {
    e.preventDefault();
    alert("Email Joined Successfully!");
    setEmail("");
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>
                Join us now for the further useful travellinng information.
              </h2>

              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter the email"
                  onChange={(e) => setEmail(e)}
                />
                <button className="btn newsletter__btn" onClick={handelClick}>
                  Join
                </button>
              </div>

              <p>
                Soon we'll be posting the details about the latest offers and
                updates regarding the tours.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
