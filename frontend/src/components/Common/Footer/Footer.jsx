import React from 'react'
import "./footer.css"
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row>
          {/* Column 1: Social Links */}
          <Col md={4} sm={12} className="footer-column">
            <h5>Connect with Us</h5>
            <ul className="social-links">
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
              <li><a href="https://www.instagram.com/peakplannerofficial?igsh=Z3E1eGt0OGc4NnNw" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a></li>
            </ul>
          </Col>

          {/* Column 2: Contact Information */}
          <Col md={4} sm={12} className="footer-column">
            <h5>Contact Us</h5>
{/*             <p>123 Trekking Lane</p> */}
{/*             <p>Adventure City, AC 45678</p> */}
            <p>Phone: +91 8860859909</p>
            <p>Email: peakplanner0310@gmail.com</p>
          </Col>

          {/* Column 3: Quick Links */}
          <Col md={4} sm={12} className="footer-column">
            <h5>Quick Links</h5>
            <ul className="quick-links">
              <li><a href="https://peak-planner-jade.vercel.app/about-us">About Us</a></li>
              <li><a href="https://peak-planner-jade.vercel.app/seasonal-treks/summer">Upcoming Treks</a></li>
              <li><a href="https://peak-planner-jade.vercel.app/top-treks">Top Treks</a></li>
{/*               <li><a href="hiking-schools">Hiking Schools</a></li> */}
              <li><a href="https://peak-planner-jade.vercel.app/articles">Articles</a></li>
              <li><a href="https://peak-planner-jade.vercel.app/contact-us">Contact Us</a></li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Trekking Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
