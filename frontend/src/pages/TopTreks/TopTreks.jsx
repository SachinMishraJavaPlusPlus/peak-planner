// import React from 'react'
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
// // import Banner from "../../components/Banner/Banner"

// const TopTreks = () => {
//   return (
//     <div>
//       {/* <Banner /> */}
//       <Breadcrumbs title="Top treks" pagename="Top treks" />
//       <h1>top treks</h1>
//     </div>
//   )
// }

// export default TopTreks


import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
// import kuariPaas from "./../../assets/images/topTrekImgs/kuari_pass.png";
// import dayaraBugyal from "./../../assets/images/topTrekImgs/dayara_bugyal.png";
// import brahmatal from "./../../assets/images/topTrekImgs/brahmatal.png";
// import kedarkantha from "./../../assets/images/topTrekImgs/kedarkantha.png";
// import nagTibba from "./../../assets/images/topTrekImgs/nag_tibba.png";
// import kheerganga from "./../../assets/images/topTrekImgs/kheerganga.png";
// import hamptaPass from "./../../assets/images/topTrekImgs/hampta_pass.png";
// import choptaChandrashila from "./../../assets/images/topTrekImgs/chopta_chandrashila.png";
// import gaumukhTapovan from "./../../assets/images/topTrekImgs/gaumukh_tapovan.png";
// import sandakphu from "./../../assets/images/topTrekImgs/sandakphu.png";
import kuariPaas from "./../../assets/images/trekImages/Kuari pass.png";
import dayaraBugyal from "./../../assets/images/trekImages/Dayara Bugyal.png";
import brahmatal from "./../../assets/images/trekImages/Brahmatal.png";
import kedarkantha from "./../../assets/images/trekImages/Kedarkantha.png";
import nagTibba from "./../../assets/images/trekImages/Nag Tibba.png";
import kheerganga from "./../../assets/images/trekImages/Kheerganga.png";
import hamptaPass from "./../../assets/images/trekImages/Hampta Pass.png";
import choptaChandrashila from "./../../assets/images/trekImages/Chopta-Chandrashila.png";
import gaumukhTapovan from "./../../assets/images/trekImages/Gaumukh Tapovan.png";
import sandakphu from "./../../assets/images/trekImages/Sandakphu.png";
import "./top-treks.css";
import Banner from "../../components/Banner/Banner"; 
import { NavLink } from "react-router-dom";
// import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const TopTreks = () => {
  // Trek data
  const treks = [
    { name: "Kuari Pass Trek", image: kuariPaas },
    { name: "Dayara Bugyal Trek", image: dayaraBugyal },
    { name: "Brahmatal Lake Trek", image: brahmatal },
    { name: "Kedarkantha Winter Trek", image: kedarkantha },
    { name: "Nag Tibba Trek", image: nagTibba },
    { name: "Kheerganga Trek", image: kheerganga },
    { name: "Hampta Pass Trek", image: hamptaPass },
    { name: "Chopta-Chandrashila Trek", image: choptaChandrashila },
    { name: "Gaumukh Tapovan Trek", image: gaumukhTapovan },
    { name: "Sandakphu Phalut Trek", image: sandakphu },
  ];

  return (
    <div >
      {/* <Breadcrumbs title="Top Treks" pagename="Top Treks" /> */}
      <Banner />
      <div className="top-treks-page">
      <Container className="headingContainer">
        <Row>
          <Col md="12">
            <div className="main_heading">
              <h1>Top Treks :</h1>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {treks.map((trek, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
              <Card className="trek-card">
                <Card.Img variant="top" src={trek.image} alt={trek.name} className="trek-card-image" />
                <Card.Body className="trek-card-body">
                    <NavLink to={`/trek-details/${trek.name}`}>
                  <Card.Title className="trek-card-title">
                      {trek.name}
                    </Card.Title>
                    </NavLink>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default TopTreks;
