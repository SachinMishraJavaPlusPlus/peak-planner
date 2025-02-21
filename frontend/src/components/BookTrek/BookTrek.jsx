import React from "react";
import "./../BookTrek/book-trek.css";
import { Accordion, Container, Row, Col } from 'react-bootstrap';
// import trekImage from './../../assets/images/TrekImg.jpg'; // Replace with the actual path to your trek image
import trekImage from './../../assets/images/logo.png'; // Replace with the actual path to your trek image

const BookTrek = () => {
  return (
    <Container className="trek-steps-container">


      {/* Main Content Row */}
      <Row className="align-items-center">
        {/* Left Side with Accordions */}
        <Col md={6} className="steps-accordion">
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Step 1</Accordion.Header>
              <Accordion.Body>
                Choose your trek destination and dates based on your preference.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Step 2</Accordion.Header>
              <Accordion.Body>
                Compare different trekking packages for pricing and reviews.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Step 3</Accordion.Header>
              <Accordion.Body>
                Confirm your booking and prepare for the adventure of a lifetime.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        {/* Right Side with Image */}
        {/* <img src={trekImage} alt="Trek" className="img-fluid trek-steps-image" /> */}
        {/* <Col md={6} className="text-center trek-image">
          <img src={trekImage} alt="Trek" className="img-fluid trek-steps-image" />
        </Col> */}
      </Row>
    </Container>
  );
};

export default BookTrek;
