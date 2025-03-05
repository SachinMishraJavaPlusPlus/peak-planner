import React from "react";
import "../Features/features.css";
import feature1 from "../../assets/images/beach-umbrella.png";
import feature2 from "../../assets/images/deal.png";
import feature3 from "../../assets/images/location.png";
import feature4 from "../../assets/images/medal (1).png";
import { Card, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Features = () => {
  const settings = {
    dots: true,  // Enable dots for better navigation
    infinite: true,
    autoplay: false,
    autoplaySpeed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,  // Updated breakpoint
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,  // Standard bootstrap large breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,  // Medium breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          autoplay: true
        }
      },
      {
        breakpoint: 576,  // Small mobile breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          prevArrow: false,
          nextArrow: false
        }
      }
    ]
  };

  const featureList = [
    {
      id: 0,
      image: feature1,
      title: "Discover New Trails",
      des: "Explore hundreds of trekking routes across India, from the Himalayas to the Western Ghats.",
    },
    {
      id: 1,
      image: feature2,
      title: "Unbeatable Trekking Deals",
      des: "Find top-rated treks at the best prices, designed to fit your budget and adventure level.",
    },
    {
      id: 2,
      image: feature3,
      title: "Plan Your Trek Effortlessly",
      des: "Book last-minute treks, get real-time updates, and enjoy hassle-free cancellations.",
    },
    {
      id: 3,
      image: feature4,
      title: "Trek with Confidence",
      des: "Read trusted reviews, get expert advice, and enjoy reliable support on every trek.",
    }
  ];

  return (
    <section className="feature-section">
      <Container>
        <Row>
          <Col md="12">
            <Slider {...settings}>
              {featureList.map((feature, inx) => (
                <Card key={inx}>
                  <Card.Img
                    variant="top"
                    src={feature.image}
                    className="img-fluid"
                    alt={feature.title}
                  />
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.des}</Card.Text>
                </Card>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;