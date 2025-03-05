import React from "react";
import Banner from "../../components/Banner/Banner";
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";
import Features from "../../components/Features/Features";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../components/Cards/Cards";
import "./home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { destinationsData } from "../../utils/data";
import PopularPlace from "../../components/PopularPlace/PopularPlace";
import BookTrek from "../../components/BookTrek/BookTrek"
// import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import Newsletter from "../../components/Newsletter/Newsletter";
import DestinationSlider from "../../components/Cards/Cards";

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
    ],
  };

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <Features />

      {/* tour seciton start */}

      {/* <section className="tours_section slick_slider"> */}
              <DestinationSlider destinationsData={destinationsData}/>
      {/* </section> */}

      {/* tour seciton end */}


      {/* Indias map here */}
      {/* <Container>
        <Row>
          <Col md="12">
            <div className="main_heading pt-5">
              <h1> India's map with the Most Famous Trekking Destinations </h1>
            </div>
          </Col>
        </Row>
        <PopularPlace />
      </Container> */}

     {/* easy steps trek booking */}
      <Container>
        <Row>
          <Col md="12">
            <div className="main_heading pt-5">
              <h1 className="why-us-heading"> Why Peak Planner? </h1>
              <div style={{ marginBottom: "20px" }}></div>
{/*               <p className="why-us-text">At Peak Planner, we believe in providing the best trekking experiences with safety, adventure, and affordability. 
              Our expert guides, curated trails, and high-quality gear ensure a memorable and safe journey. Join us to explore the 
              breathtaking beauty of nature while creating lifelong memories. </p> */}
              <div class="why-us-text">
                <p>We are the only trekking aggregator platform designed to streamline the trekking experience for enthusiasts.</p>
                <p>By consolidating information from leading trekking organizations, we enable users to easily compare and filter options based on their specific needs and expectations.</p>
                <ul>
                  <li>We offer a centralized platform with a user-friendly interface</li>
                  <li>Help make informed decisions for your next adventure</li>
                </ul>
              </div>    
            </div>
          </Col>
        </Row>
        {/* <BookTrek /> */}
      </Container>
     
      <Container>
        <Row>
          <Col md="12">
            <div className="main_heading pt-5">
              <h1> Book your next Trek in 3 Easy Steps </h1>
            </div>
          </Col>
        </Row>
        <BookTrek />
      </Container>

     {/* Customer Reviews  */}
      {/* <Container> */}
        {/* <Row>
          <Col md="12">
            <div className="main_heading pt-5">
              <h1> Look at what our Happy Customers say! </h1>
            </div>
          </Col>
        </Row> */}
        {/* <CustomerReviews /> */}
      {/* </Container> */}
      


      {/* <Newsletter /> */}


      {/* <Footer /> */}
    </>
  );
};

export default Home;
