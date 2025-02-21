import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import indiaMap from '../../assets/images/india-map.png'; // Replace with your image path
import indiaMap from '../../assets/images/india.png'; // Replace with your image path
import "./../PopularPlace/popular-place.css"

const TrekPlaceholder = () => {
  return (
    <Container className="d-flex align-items-center trek-container">
      {/* Left Column with Placeholder Image */}
      <Col md={4} className="text-center">
        <img 
          src={indiaMap} 
          alt="Placeholder" 
          className="img-fluid placeholder-image"
        />
      </Col>

      {/* Right Column with 3 Rows */}
      <Col md={8} className="d-flex flex-column justify-content-between trek-list">
        <Row className="trek-item">
          <Col className="trek-box">
            Trek 1
          </Col>
        </Row>
        <Row className="trek-item">
          <Col className="trek-box">
            Trek 2
          </Col>
        </Row>
        <Row className="trek-item">
          <Col className="trek-box">
            Trek 3
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default TrekPlaceholder;
