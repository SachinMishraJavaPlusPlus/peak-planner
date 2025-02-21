import React, { useState } from 'react'
import "./../Newsletter/newsletter.css"
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
      // Here, you can add functionality to subscribe the user
      // For example, making an API call to save the email
      alert(`Subscribed with email: ${email}`);
      setEmail(''); // Clear the input field after subscription
    };
  
    return (
      <Container className="newsletter-section">
        <Row className="justify-content-center">
          <Col md={8} className="newsletter-box">
            <h2 className="newsletter-heading">Get weekly updates about our Trending Packages and New Offers!</h2>
            <div className="newsletter-input">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="primary" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Newsletter;
