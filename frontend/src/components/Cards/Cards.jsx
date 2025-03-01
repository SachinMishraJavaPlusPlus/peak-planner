import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

const DestinationSlider = ({ destinationsData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };

  const handleCardClick = (destination, e) => {
    e.preventDefault();
    setSelectedDestination(destination);
    setShowModal(true);
    sliderRef.current.slickPause();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDestination(null);
    sliderRef.current.slickPlay();
  };

  return (
    <section className="tours_section">
      <Container>
        <Row>
          <Col md={12}>
            <div className="main_heading">
              <h1>Top Destinations for your next Trek</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Slider ref={sliderRef} {...settings}>
              {destinationsData.map((destination, idx) => (
                <div className="slide-item" key={idx}>
                  <div className="img-box">
                    <NavLink
                      className="body-text text-dark text-decoration-none"
                      to="#"
                      onClick={(e) => handleCardClick(destination, e)}
                    >
                      <Card>
                        <div className="card-img-wrapper">
                          <Card.Img
                            variant="top"
                            src={destination.image}
                            className="img-fluid"
                            alt={destination.name}
                          />
                        </div>
                        <Card.Title>{destination.name}</Card.Title>
                        <span className="tours">{destination.tours}</span>
                      </Card>
                    </NavLink>
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className='text-black'>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDestination?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {selectedDestination && (
    <div className="destination-details">
      <img
        src={selectedDestination.image}
        alt={selectedDestination.name}
        className="img-fluid mb-4"
      />
      <h4 className="mb-3">Tours Available: {selectedDestination.tours}</h4>
      <p className="mb-4">{selectedDestination.description}</p>

      {selectedDestination.points && selectedDestination.points.length > 0 && (
        <>
          <h4 className="mb-3">Points of Interest:</h4>
          <ul className="list-group">
            {selectedDestination.points.map((point, index) => (
              <li key={index} className="list-group-item">{point}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )}
</Modal.Body>

      </Modal>

    </section>
  );
};

export default DestinationSlider;