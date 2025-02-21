import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
// import peakPlannerLogo from "./../../../assets/images/Peakplanner-logo.png";
import peakPlannerLogo from "./../../../assets/images/logo-header.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  // Sticky header function
  const isSticky = () => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 120
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const handleSeasonSelect = (season) => {
    navigate(`/seasonal-treks/${season}`);
  };

  return (
    <header className="header-section">
      <Container>
        <Row>
          <Navbar expand="sm" className="p-0">
            {/* Logo Section */}
            <Navbar.Brand href="#">
              <NavLink to="/">
                <img
                  className="imgLogo"
                  src={peakPlannerLogo} 
                  alt="Peak Planner Logo"
                />
              </NavLink>
            </Navbar.Brand>
            {/* End of Logo Section */}
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-lg`}
              onClick={toggleMenu}
            />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show={open}
              onHide={toggleMenu}
            >
              {/* Mobile Logo Section */}
              <Offcanvas.Header closeButton>
                <h1 className="Logo">Peak Planner</h1>
              </Offcanvas.Header>
              {/* End of Mobile Logo Section */}

              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  <NavLink className="mx-1 nav-link" to="/top-treks">
                    Top Treks
                  </NavLink>
                  <NavLink className="mx-1 nav-link" to="/seasonal-treks/winter">
                    Upcoming Treks
                  </NavLink>

                  <NavDropdown
                    title="Seasonal Treks"
                    id="seasonal-treks-dropdown"
                  >
                    <NavDropdown.Item
                      className="season-dropdown summer"
                      onClick={() => handleSeasonSelect("summer")}
                    >
                      Summer
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="season-dropdown monsoon"
                      onClick={() => handleSeasonSelect("monsoon")}
                    >
                      Monsoon
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="season-dropdown winter"
                      onClick={() => handleSeasonSelect("winter")}
                    >
                      Winter
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="season-dropdown all-seasons"
                      onClick={() => handleSeasonSelect("all seasons")}
                    >
                      All Seasons
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* Hiking Schools Dropdown */}
                  <NavDropdown
                    title="Hiking Schools"
                    id="hiking-schools-dropdown"
                  >
                    <NavDropdown.Item
                      href="https://www.nimindia.net/"
                      target="_blank"
                    >
                      Nehru Institute of Mountaineering (NIM)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://www.abvimas.org/course/list-of-courses/"
                      target="_blank"
                    >
                      Atal Bihari Vajpayee Institute of Mountaineering and
                      Allied Sports (ABVIMAS)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://hmidarjeeling.com/courses-offered/"
                      target="_blank"
                    >
                      Himalayan Mountaineering Institute (HMI)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://jawaharinstitutepahalgam.com/Mountaineering.php#gsc.tab=0"
                      target="_blank"
                    >
                      Jawahar Institute of Mountaineering & Winter Sports
                      (JIM&WS)
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="https://nimasdirang.com/Mountaineering-courses"
                      target="_blank"
                    >
                      National Institute of Mountaineering and Allied Sports
                      (NIMAS)
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavLink className="mx-1 nav-link" to="/articles">
                    Articles
                  </NavLink>

                  {/* Seasonal Treks Dropdown */}
                

                  <NavLink className="mx-1 nav-link" to="/about-us">
                    About Us
                  </NavLink>
                  <NavLink className="mx-1 nav-link" to="/contact-us">
                    Contact Us
                  </NavLink>

                  {/* <NavLink className="mx-1 btn btn-outline-primary" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="mx-1 btn btn-primary" to="/signup">
                    Sign Up
                  </NavLink> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
