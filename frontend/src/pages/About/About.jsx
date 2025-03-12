import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./about.css";
import aboutImage from "../../assets/images/Landscape5.jpg";
import aboutImg from "../../assets/images/Landscape3.jpg";
import icons1 from "../../assets/images/trekImages/Bhrigu Lake.png";
import icons2 from "../../assets/images/trekImages/Ali Bedni Bugyal.png";
import icons3 from "../../assets/images/trekImages/Rupin Pass.png";

const About = () => {
  useEffect(() => {
    document.title = "About us";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="About us" pagename="About us" backgroundImage={aboutImage} />
      <section className="about-section">
        <div className="container">
          <div className="row">
            <div className="column-main">
              <div className="about-content">
                <div className="about-image-wrapper">
                  <img
                    src={aboutImg}
                    alt="about"
                    className="about-img"
                  />
                  <div className="about-image-content">
                    <h3 className="banner-heading">
                      HOW WE ARE BEST FOR TREKKING !
                    </h3>
                  </div>
                </div>
              </div>
              <h2 className="section-heading">
                Welcome to Peakplanner, your ultimate trekking companion!
              </h2>
              <p className="body-text">
                We are an aggregator platform dedicated to helping adventurers find, compare, and book the best trekking experiences across India—all in one place. Peakplanner connects you with a wide range of trekking companies, allowing you to explore a variety of treks based on your preferred location, distance, difficulty level, Altitude, duration, and seasonal preferences.
              </p>
              <p className="body-text">
                At Peakplanner, we believe that planning a trek should be as exciting as the adventure itself. We make it easy to explore different options for each trek in any region. You can discover all the treks a region offers and view details of multiple trekking companies operating on each route. Each trek listing showcases comprehensive details such as price, itinerary, reviews & ratings, batch size, and the trekkers-to-guide ratio, empowering you to choose a trek that best suits your preferences. Once you've found the ideal trek, you can easily redirect to the trekking company's website to complete your booking. In addition to trek bookings, Peakplanner provides comprehensive information about various mountaineering schools, helping you prepare for your next adventure.
              </p>
              <p className="body-text">
                We're constantly collaborating with top trekking organizations to bring together their offerings on one platform, simplifying your search for the perfect trek. Whether you're a first-time hiker or a seasoned trekker, Peakplanner is designed to help you choose confidently and embark on memorable journeys through nature's most beautiful landscapes.
              </p>
              <p className="body-text">
                Embark on your next adventure with Peakplanner—where the mountains call, and we make planning easy and Unforgettable experiences.
              </p>
            </div>
            <div className="column-sidebar">
              <div className="feature-card">
                <div className="icon-wrapper">
                  <div className="icon-circle">
                    <img src={icons1} alt="icon" className="icon-image" />
                  </div>
                </div>
                <h5 className="card-title">50+ Destination</h5>
                <p className="card-text"></p>
              </div>

              <div className="feature-card">
                <div className="icon-wrapper">
                  <div className="icon-circle">
                    <img src={icons2} alt="icon" className="icon-image" />
                  </div>
                </div>
                <h5 className="card-title">Best Price In The Industry</h5>
                <p className="card-text"></p>
              </div>

              <div className="feature-card">
                <div className="icon-wrapper">
                  <div className="icon-circle">
                    <img src={icons3} alt="icon" className="icon-image" />
                  </div>
                </div>
                <h5 className="card-title">Super Fast Booking</h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;