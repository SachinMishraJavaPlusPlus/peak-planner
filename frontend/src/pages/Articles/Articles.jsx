import React, { useState, useEffect } from "react";
import "./articles.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
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
import articleImage from "./../../assets/images/Landscape1.jpg"
import {
  Button,
  Col,
  Form,
  Container,
  Row,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";
import { BACKEND_URL } from "../../constant";

// const imageMapping = {
//   "Kuari Pass Trek": "/images/kuari-pass.png",
//   "Dayara Bugyal Trek": "/images/dayara-bugyal.jpg",
//   "Brahmatal Trek": "/images/brahmatal.jpg",
//   "Kedarkantha Winter Trek": "/images/kedarkantha.jpg",
// };

// const imageMapping = require('../../assets/images/articlesTrekImgs/image_mapping.json');

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [expandedArticleIndex, setExpandedArticleIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy] = useState("date");
  const articlesPerPage = 5;

  // const featuredArticles = [
  //   { name: "Kuari Pass Trek", image: kuariPaas },
  //   { name: "Dayara Bugyal Trek", image: dayaraBugyal },
  //   { name: "Brahmatal Lake Trek", image: brahmatal },
  //   { name: "Kedarkantha Winter Trek", image: kedarkantha },
  //   { name: "Nag Tibba Trek", image: nagTibba },
  //   { name: "Kheerganga Trek", image: kheerganga },
  //   { name: "Hampta Pass Trek", image: hamptaPass },
  //   { name: "Chopta-Chandrashila Trek", image: choptaChandrashila },
  //   { name: "Gaumukh Tapovan Trek", image: gaumukhTapovan },
  //   { name: "Sandakphu Phalut Trek", image: sandakphu },
  // ];

  const formatGeminiResponse = (response) => {
    try {
      const parsedResponse = typeof response === 'string' 
        ? JSON.parse(response).response 
        : response.response;

      // Split into title and content if the text contains a title (marked with **)
      const parts = parsedResponse.split('\n\n');
      
      return (
        <div className="gemini-response">
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              // It's a heading
              return (
                <h3 key={index} className="gemini-heading">
                  {part.replace(/\*\*/g, '')}
                </h3>
              );
            } else if (part.includes('*')) {
              // It's a bullet list
              const items = part.split('\n').filter(item => item.trim());
              return (
                <ul key={index} className="gemini-list">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="gemini-list-item">
                      {item.replace(/\*/g, '').trim()}
                    </li>
                  ))}
                </ul>
              );
            } else {
              // Regular paragraph
              return (
                <p key={index} className="gemini-paragraph">
                  {part}
                </p>
              );
            }
          })}
        </div>
      );
    } catch (error) {
      return <div className="gemini-response">{response}</div>;
    }
  };

  // Normalize season for CSS class
  const normalizeSeason = (season) => {
    if (!season) return "";
    const lowercaseSeason = season.toLowerCase();

    const seasonMappings = {
      "all season": "all-seasons",
      "all seasons": "all-seasons",
      summer: "summer",
      monsoon: "monsoon",
      winter: "winter",
    };

    // Check for exact match first
    if (seasonMappings[lowercaseSeason]) {
      return seasonMappings[lowercaseSeason];
    }

    // Check for partial match
    for (const [key, value] of Object.entries(seasonMappings)) {
      if (lowercaseSeason.includes(key)) {
        return value;
      }
    }

    // Fallback to hyphenated lowercase
    return lowercaseSeason.replace(/ /g, "-");
  };

  // Fetch featured articles on component mount
  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/featured-treks`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch featured articles");
      }
      const data = await response.json();
      console.log("Fetched Featured Articles:", data);

      setFeaturedArticles(data);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
      // setError("Failed to load featured articles");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/gemini/?query=${encodeURIComponent(searchQuery)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.details || "Failed to fetch article"
        );
      }

      if (!data) {
        throw new Error("No data received from server");
      }

      setArticles([data, ...articles]);
      setSearchQuery("");
    } catch (error) {
      setError(
        error.message || "Failed to generate article. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const toggleDescription = (index) => {
    setExpandedArticleIndex(expandedArticleIndex === index ? null : index);
  };

  // Sorting and Pagination
  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "difficulty":
        return a.difficultyLevel.localeCompare(b.difficultyLevel);
      default:
        return new Date(b.date || Date.now()) - new Date(a.date || Date.now());
    }
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="articles-page">
      <Breadcrumbs title="Articles" pagename="Articles" backgroundImage={articleImage}/>

      <Container className="headingContainer">
        <Row>
          <Col md="12">
            <div className="main_heading">
              <h1>What are you looking for?</h1>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="search-and-filter-container">
        <div className="search-bar-container">
          <Col xs="auto" className="searchBar">
            <Form.Control
              type="text"
              placeholder="Get started..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mr-sm-2"
            />
          </Col>
          <div className="item-search-search-button">
            <Button
              className="primaryBtn d-flex justify-content-center"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                <i className="searchBtn bi bi-search me-2"></i>
              )}
              Search
            </Button>
          </div>
        </div>

        {/* Popular Searches Section */}
        <div className="popular-searches">
          <Container className="headingContainer">
            <Row>
              <Col md="12">
                <div className="main_heading">
                  <h1>Popular Searches</h1>
                </div>
              </Col>
            </Row>
          </Container>
          <ul>
            <li>
              <a
                href="https://example.com/trek/kuari-pass"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kuari Pass Trek
              </a>
            </li>
            <li>
              <a
                href="https://example.com/trek/dayara-bugyal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dayara Bugyal Trek
              </a>
            </li>
            <li>
              <a
                href="https://example.com/trek/brahmatal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brahmatal Trek
              </a>
            </li>
            <li>
              <a
                href="https://example.com/trek/kedarkantha"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kedarkantha Winter Trek
              </a>
            </li>
          </ul>
        </div>
      </div>

      {error && (
        <Alert
          variant="danger"
          className="mx-auto my-3"
          style={{ width: "90%" }}
        >
          {error}
        </Alert>
      )}

{currentArticles.map((article, index) => (
        <div
          key={index}
          className="article-card"
          onClick={() => toggleDescription(index)}
        >
          <div className="article-card-content">
            <div className="article-card-right">
              <div className="article-card-header">
                {formatGeminiResponse(article)}
              </div>
              {/* ... rest of your article card content ... */}
            </div>
          </div>
        </div>
      ))}

      <div className="pagination">
        {Array.from({
          length: Math.ceil(sortedArticles.length / articlesPerPage),
        }).map((_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            variant={currentPage === index + 1 ? "primary" : "outline-primary"}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {featuredArticles.length > 0 && (
        <div className="featured-articles">
          <Container className="headingContainer">
            <Row>
              <Col md="12">
                <div className="main_heading">
                  <h1 className="featuredTreksHeading">Featured Treks: </h1>
                </div>
              </Col>
            </Row>
          </Container>

          {featuredArticles.map((trek, index) => (
            <div
              key={index}
              className="article-card"
              onClick={() => toggleDescription(index)}
            >
              <div className="article-card-content">

                {/*<div className="article-card-left">
                   <img
                    src={trek.image_url || "https://via.placeholder.com/200"}
                    alt={trek.title}
                    className="article-card-image"
                  />

                  <img
                    src={`http://localhost:5000${trek.image_path}`}
                    alt={trek.title}
                    className="article-card-image"
                  />
                </div> */}



{/* <div className="article-card-left">
  {trek["Trek Name"] && imageMapping[trek["Trek Name"]] ? (
    <img
      src={`frontend/src/assets/images/articlesTrekImgs
frontend/src/assets/images/articlesTrekImgs/${imageMapping[trek["Trek Name"]].split('/').pop()}`}
      alt={trek["Trek Name"]}
      className="article-card-image"
      onError={(e) => {
        // e.target.src = "https://via.placeholder.com/200";
        console.error(`Failed to load image for ${trek["Trek Name"]}`);
      }}
    />
  ) : (
    <img
      // src="https://via.placeholder.com/200"
      alt="Placeholder"
      className="article-card-image"
    />
  )}
</div> */}

<Card.Img variant="top" src={trek.image} alt={trek.name} className="trek-card-image" />



                <div className="article-card-right">
                  <div className="article-card-header">
                    <h2 className="trek-title">{trek["Trek Name"]}</h2>
                    <span
                      className={`season-tag ${normalizeSeason(
                        trek["Best time to visit"]
                      )}`}
                    >
                      {trek["Best time to visit"]}
                    </span>
                  </div>

                  <div className="trek-card-meta">
                    <span>
                      <strong>Altitude:</strong> {trek.Altitude || "N/A"}
                    </span>
                    <span>
                      <strong>Duration:</strong> {trek.Duration || "N/A"}
                    </span>
                    <span>
                      <strong>Season:</strong> {trek.season || "N/A"}
                    </span>
                    {trek.itinerary_link && (
                      <a
                        href={trek.itinerary_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="trek-card-itinerary-link"
                      >
                        View Full Itinerary
                      </a>
                    )}
                    <span className="toggle-description-btnDescription">
                      <strong>Click here to view Description</strong>{" "}
                    </span>
                  </div>
                </div>
              </div>
              {expandedArticleIndex === index && (
                <div className="trek-card-description">
                  <button
                    className="toggle-description-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDescription(index);
                    }}
                  >
                    Collapse Description
                  </button>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: trek.Description || "No Description Available",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
