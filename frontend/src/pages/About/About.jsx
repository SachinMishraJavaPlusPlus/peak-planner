import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./about.css";
// import aboutImg from "../../assets/images/about/aboutimg.png";
// import icons1 from "../../assets/images/icons/destination.png";
// import icons2 from "../../assets/images/icons/best-price.png";
// import icons3 from "../../assets/images/icons/quick.png";
import aboutImage from "../../assets/images/Landscape5.jpg";
import aboutImg from "../../assets/images/Landscape3.jpg";
import icons1 from "../../assets/images/trekImages/Bhrigu Lake.png";
import icons2 from "../../assets/images/trekImages/Ali Bedni Bugyal.png";
import icons3 from "../../assets/images/trekImages/Rupin Pass.png";

const About = () => {

  useEffect(()=>{
    document.title ="About us "
    window.scroll(0, 0)
  },[])

  return (
    <>
      <Breadcrumbs title="About us" pagename="About us" backgroundImage={aboutImage}/>
      <section className="py-5">
        <Container>
          <Row>
            <Col md="8">
              <div className="about-content">
                <div className="about-image position-relative">
                  <img
                    src={aboutImg}
                    alt="about "
                    className="img-fluid rounded-5"
                  />
                  <div className="about-image-content position-absolute top-0 end-0 p-md-4 p-3 rounded-5 shadow-sm">
                    <h3 className="h2 fw-bold  text-white">
                      {" "}
                      HOW WE ARE BEST FOR TREKKING !
                    </h3>
                  </div>
                </div>
              </div>
              <h2 className="h2 font-bold  pt-4 pb-2">
              Welcome to Peakplanner, your ultimate trekking companion!
              </h2>
              <p className="body-text mb-2">
              We are an aggregator platform dedicated to helping adventurers find, compare, and book the best trekking experiences across India—all in one place. Peakplanner connects you with a wide range of trekking companies, allowing you to explore a variety of treks based on your preferred location, distance, difficulty level, Altitude, duration, and seasonal preferences.
              </p>
              <p className="body-text mb-2">
              At Peakplanner, we believe that planning a trek should be as exciting as the adventure itself. We make it easy to explore different options for each trek in any region.  You can discover all the treks a region offers and view details of multiple trekking companies operating on each route. Each trek listing showcases comprehensive details such as price, itinerary, reviews & ratings, batch size, and the trekkers-to-guide ratio, empowering you to choose a trek that best suits your preferences. Once you’ve found the ideal trek, you can easily redirect to the trekking company’s website to complete your booking. In addition to trek bookings, Peakplanner provides comprehensive information about various mountaineering schools, helping you prepare for your next adventure.
              </p>
              <p className="body-text mb-2">
              We're constantly collaborating with top trekking organizations to bring together their offerings on one platform, simplifying your search for the perfect trek. Whether you’re a first-time hiker or a seasoned trekker, Peakplanner is designed to help you choose confidently and embark on memorable journeys through nature’s most beautiful landscapes.
              </p>
              <p className="body-text mb-2">
              Embark on your next adventure with Peakplanner—where the mountains call, and we make planning easy and Unforgettable experiences.
              </p>
            </Col>
            <Col md="4">
              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                <div className="d-flex justify-content-center align-item-search my-2">
                  <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2 ">
                    <img src={icons1} alt="icon" className="img-fluid" />
                  </div>
                   </div>
                  <Card.Title className="fw-bold h5"> 50+ Destination  </Card.Title>
                  <p className="mb-2 body-text">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                <div className="d-flex justify-content-center align-item-search my-2">
                  <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2 ">
                    <img src={icons2} alt="icon" className="img-fluid" />
                  </div>
                   </div>
                  <Card.Title className="fw-bold h5">  Best Price In The Industry  </Card.Title>
                  <p className="mb-2 body-text">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                <div className="d-flex justify-content-center align-item-search my-2">
                  <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2 ">
                    <img src={icons3} alt="icon" className="img-fluid" />
                  </div>
                   </div>
                  <Card.Title className="fw-bold h5">  Super Fast Booking  </Card.Title>
                  <p className="mb-2 body-text">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;