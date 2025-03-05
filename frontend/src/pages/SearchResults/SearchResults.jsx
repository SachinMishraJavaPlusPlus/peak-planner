import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './search-results.css';
import Banner from "../../components/Banner/Banner"; 
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 
import { FaMountain, FaClock, FaCalendarAlt, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const { treks } = location.state || [];

  const normalizeSeason = (season) => {
    if (!season) return "";
    const lowercaseSeason = season.toLowerCase();
    
    const seasonMappings = {
      'all season': 'all-seasons',
      'all seasons': 'all-seasons',
      'summer': 'summer',
      'monsoon': 'monsoon',
      'winter': 'winter'
    };

    if (seasonMappings[lowercaseSeason]) {
      return seasonMappings[lowercaseSeason];
    }

    for (const [key, value] of Object.entries(seasonMappings)) {
      if (lowercaseSeason.includes(key)) {
        return value;
      }
    }

    return lowercaseSeason.replace(/ /g, '-');
  };

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <div className="search-results-page">
        {treks.length > 0 ? (
          treks.map((trek, index) => (
            <div key={trek.id || index} className="trek-card-searchResults">
              <div className="trek-header">
                <Link to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}>
                  <h2 className="trek-title">{trek["Trek Name"]}</h2>
                </Link>
                <span 
                  className={`season-tag ${normalizeSeason(trek["Best time to visit"])}`}
                >
                  {trek["Best time to visit"]}
                </span>
              </div>
              
              <div className="trek-info-boxes">
                <div className="info-box">
                  <FaMountain className="info-icon" />
                  <span className="info-label">{trek.Altitude || "N/A"}</span>
                </div>
                <div className="info-box">
                  <FaClock className="info-icon" />
                  <span className="info-label">{trek.Duration || "N/A"}</span>
                </div>
                <div className="info-box">
                  <FaCalendarAlt className="info-icon" />
                  <span className="info-label">{trek["Days Range"] || "N/A"}</span>
                </div>
                <div className="info-box">
                  <FaChartLine className="info-icon" />
                  <span className="info-label">{trek["Difficulty Level"] || "N/A"}</span>
                </div>
                <div className="info-box">
                  <FaMapMarkerAlt className="info-icon" />
                  <span className="info-label">{trek.State || "N/A"}</span>
                </div>
              </div>

              <div className="trek-details">
                <h2 className="trek-description-heading">Trek Description</h2>
                <p className="trek-description">{trek.Description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No treks found for your search criteria</div>
        )}
      </div>
    </>
  );
};

export default SearchResults;