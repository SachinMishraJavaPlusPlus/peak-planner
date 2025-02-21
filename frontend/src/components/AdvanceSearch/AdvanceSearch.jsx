import React, { useState } from "react";
import "../AdvanceSearch/search.css";
import "react-datepicker/dist/react-datepicker.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../constant";

const AdvanceSearch = () => {
  const [trek, setTrek] = useState("");
  const [destination, setDestination] = useState("");
  const [daysRange, setdaysRange] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [resetDropdowns, setResetDropdowns] = useState(false);

  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (trek) params.append('trek', trek);
      if (destination) params.append('destination', destination);
      if (daysRange) params.append('daysRange', daysRange);
      if (difficulty) params.append('difficulty', difficulty);

      const response = await axios.get(
        `${BACKEND_URL}/api/search-treks?${params.toString()}`
      );

      navigate("/search-results", { state: { treks: response.data } });

      // Reset the search fields after navigation
      resetSearchFields();
    } catch (error) {
      console.error("Error searching treks:", error);
    }
  };

  // Function to reset the search fields
  const resetSearchFields = () => {
    setTrek("");
    setDestination("");
    setdaysRange("");
    setDifficulty("");

    // Trigger the dropdowns to reset
    setResetDropdowns(true);

    // Reset after a short delay to ensure the UI updates correctly
    setTimeout(() => {
      setResetDropdowns(false);
    }, 100);
  };

  return (
    <section className="box-search-advance">
      <Container>
        <Row>
          <Col md={12} xs={12}>
            <div className="explore-box">
              <p>Explore your next adventures with us!</p>
            </div>
            <div className="box-search shadow-sm">
              {/* Search by Trek Dropdown */}
              <div className="item-search">
                <label className="item-search-label2">Search by Trek</label>
                <CustomDropdown
                  onSelect={(value) => setTrek(value)}
                  selectedValue={trek} // Set the selected value
                  options={[
                    "Kuari Pass Trek",
                    "Dayara Bugyal Trek",
                    "Brahmatal Lake Trek",
                    "Kedarkantha Winter Trek",
                    "Rupin Pass Trek",
                    "Har Ki Dun Trek",
                    "Nag Tibba Trek",
                    "Pindari Glacier Trek",
                    "Valley of Flowers Trek",
                    "Kareri Lake Trek",
                    "Indrahar Pass Trek",
                    "Kheerganga Trek",
                    "Bhrigu Lake Trek",
                    "Pin Parvati Pass Trek",
                    "Beas Kund Trek",
                    "Triund Trek",
                    "Hampta Pass Trek",
                    "Chadar Trek",
                    "Chopta-Chandrashila Trek",
                    "Gaumukh Tapovan Trek",
                    "Dodital Lake Trek",
                    "Deoria Tal Trek",
                    "Binsar Trek",
                    "Chandrakhani Pass Trek",
                    "Prashar Lake Trek",
                    "Great Himalayan National Park Trek",
                    "Kashmir Great Lakes Trek",
                    "Tarsar Marsar Trek",
                    "Goechala Trek",
                    "Sandakphu Phalut Trek",
                    "Pangarchulla Peak trek",
                    "Sar Pass Trek",
                    "Ali Bedni Bugyal",
                    "Phulara Ridge Trek",
                    "Surya Top",
                    "Bun Buni Pass Trek",
                    "Roopkund Trek",
                    "Mukta Top Trek",
                    "Deoban Trek",
                    "Auden's Col Trek",

                    // Add more treks as needed
                  ]}
                  reset={resetDropdowns}
                />
              </div>

              {/* Search by Destination Dropdown */}
              <div className="item-search">
                <label className="item-search-label2">
                  Search by Destination
                </label>
                <CustomDropdown
                  onSelect={(value) => setDestination(value)}
                  selectedValue={destination} // Set the selected value
                  options={[
                    "Uttarakhand",
                    "Himachal Pradesh",
                    "Jammu & Kashmir",
                    "Sikkim",
                    // Add more destinations as needed
                  ]}
                  reset={resetDropdowns}
                />
              </div>

              {/* Duration Dropdown */}
              <div className="item-search">
                <label className="item-search-label2">Duration</label>
                <CustomDropdown
                  onSelect={(value) => setdaysRange(value)}
                  selectedValue={daysRange} // Set the selected value
                  options={[
                    "< 3 Days",
                    "3 - 5 Days",
                    "6 - 8 Days",
                    "8 - 10 Days",
                  ]}
                  reset={resetDropdowns}
                />
              </div>

              {/* Difficulty Level Dropdown */}
              <div className="item-search bd-none">
              {/* <div className="item-search"> */}
                <label className="item-search-label2">Difficulty Level</label>
                <CustomDropdown
                  onSelect={(value) => setDifficulty(value)}
                  selectedValue={difficulty} // Set the selected value
                  options={["Easy", "Moderate", "Difficult"]}
                  reset={resetDropdowns}
                />
              </div>

              {/* Search Button */}
              <div className="item-search-search-button">
              
                <Button
                  className="primaryBtn my-custom-button d-flex justify-content-center"
                  onClick={handleSearchSubmit}
                >
                  <i className="bi bi-search me-2"></i> Search
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdvanceSearch;
