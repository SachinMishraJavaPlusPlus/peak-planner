import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
// import image from "../../assets/images/new/contact-us.png";
import contactImage from "../../assets/images/Landscape2.jpg";

const Contact = () => {

  useEffect(() => {
    document.title = "Contact us  "
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <Breadcrumbs title="Contact us" pagename="Contact us" backgroundImage={contactImage} />
      <section className="contact  pt-5">
        <Container>
          <Row>
            <Col md="12">
              <p className="body-text mt-1">
                Get in touch with us for any queries, feedback, or assistance. We're here to help!
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2 ">
                      <i className="bi bi-headset h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Call US</Card.Title>
                  <p className="mb-3 body-text">
                  Have any questions or need assistance? Give us a call, and our team will be happy to help!
                  </p>
                  <div className="d-block justify-content-between">
                  For trek inquiries, booking assistance, or general questions, reach out to us at 
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-phone me-1"></i>
                      +91 8860859909
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2 ">
                      <i className="bi bi-envelope h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Email Us</Card.Title>
                  <p className="mb-3 body-text">
                  Prefer to communicate via email? Drop us a message, and we'll get back to you as soon as possible.
                  </p>
                  <div className="d-block justify-content-between">
                  For trek details, partnership inquiries, or support, email us at 
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-envelope me-2"></i>
                      peakplanner0310@gmail.com
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg="4" md="12" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2 ">
                      <i className="bi bi-globe h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Social Media</Card.Title>
                  <p className="mb-3 body-text">
                  Stay updated on upcoming treks, travel tips, and adventure stories. Follow us on
                  peakplannerofficial 
                  </p>
                  <div className="d-block justify-content-center">
                    <ListGroup horizontal className="justify-content-center">
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-youtube"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i
                          className="bi bi-instagram"
                          onClick={() => window.location.href = 'https://www.instagram.com/peakplannerofficial?igsh=Z3E1eGt0OGc4NnNw'}
                        ></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-twitter"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-youtube"></i>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <Row className="py-5 align-items-center">
            <Col xl="6" md="6" className="d-none d-md-block">
              <img src={image} alt="" className="img-fluid me-3" />
            </Col>
            <Col xl="6" md="6">
              <Card className="bg-light p-4 border-0 shadow-sm">
                <div className="form-box">
                  <h1 className="h3 font-bold mb-4">Send us message</h1>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FloatingLabel
                          controlId="name"
                          label="Full Name "
                          className="mb-4"
                        >
                          <Form.Control type="text" placeholder="Full Name" />
                        </FloatingLabel>
                      </Col>
                      <Col md="6">
                        <FloatingLabel
                          controlId="email"
                          label="Email address"
                          className="mb-4"
                        >
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                          />
                        </FloatingLabel>
                      </Col>

                      <Col md="12">
                        <FloatingLabel
                          controlId="phone"
                          label="Phone Number "
                          className="mb-4"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                          />
                        </FloatingLabel>
                      </Col>

                      <Col md="12">
                        <FloatingLabel controlId="message" label="Message">
                          <Form.Control
                            as="textarea"
                            placeholder="Message"
                            style={{ height: "126px" }}
                          />
                        </FloatingLabel>
                      </Col>

                     
                    </Row>
                    <button className="primaryBtn mt-3" type="button"> Send Message</button>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row> */}
        </Container>
      </section>
    </>
  );
};

export default Contact;