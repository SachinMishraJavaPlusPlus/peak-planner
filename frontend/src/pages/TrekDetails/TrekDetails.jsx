import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './trek-details.css';
import Banner from "../../components/Banner/Banner"; 
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 
import { BACKEND_URL } from '../../constant';
import img1 from "../../assets/images/company_logos/India Hikes.jpeg";
import img2 from "../../assets/images/company_logos/Trekkers of India.jpeg";
import img3 from "../../assets/images/company_logos/Trek the Himalayas.jpeg";
import img4 from "../../assets/images/company_logos/The Searching Souls.jpeg";
import img5 from "../../assets/images/company_logos/Trek Up India.jpeg";
import img6 from "../../assets/images/company_logos/Himalayan Hikers.jpeg";

const TrekDetails = () => {
  const { trekName } = useParams();
  const [trekDetails, setTrekDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  // Create an object to map images
  const imageMap = {
    0: img1,
    1: img2,
    2: img3,
    3: img4,
    4: img5,
    5: img6
  };

  useEffect(() => {
    const fetchTrekDetails = async () => {
      try {
        const normalizedTrekName = trekName.toLowerCase().replace(/ /g, '-');
        const response = await axios.get(`${BACKEND_URL}/api/trek/${normalizedTrekName}`);
        console.log('Fetched Trek Details:', response.data);
        if (response.data.length > 0) {
          setTrekDetails(response.data);
        } else {
          setTrekDetails(null);
        }
      } catch (err) {
        setError("Unable to fetch trek details at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrekDetails();
  }, [trekName]);

  const toggleDescription = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!trekDetails) return <div>No details available for this trek.</div>;

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <div className="trek-details-container">
        {trekDetails.map((details, index) => (
          <div 
            key={index} 
            className="trek-card" 
            onClick={() => toggleDescription(index)}
          >
            <div className="trek-card-content">
              <div className="trek-card-left">
                <img 
                  src={imageMap[index] || img1} 
                  alt={`${details.website_name} logo`}
                  className="trek-card-image" 
                />
              </div>
              
              <div className="trek-card-right">
                <div className="trek-card-header">
                  <h2 className="trek-card-siteName">{details.website_name}</h2>
                  {details.website ? (
                    <a
                    href={details.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-card-itinerary-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Click For Prices
                  </a>
                    
                  ) : (
                    <span>Not Available</span>
                  )}
                </div>
                
                {/* <div className="trek-card-rating">{details.rating} Rating</div> */}
                
                <a
                  href={details.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-card-itinerary-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Itinerary
                </a>
                
                <div className="trek-card-meta">
                  <span>
                    <strong>Day/Night:</strong> {details.trekData?.Duration || 'Not specified'}
                  </span>
                  <span>
                    <strong>Guide to Trekkers Ratio:</strong> {details.Guide_to_trekker_ratio || 'N/A'}
                  </span>
                  <span>
                    <strong>Avg Batch Size:</strong> {details.Avg_batch_size || 'N/A'}
                  </span>
                  <span>
                    <strong>Rentals:</strong> {details.Rentals || 'N/A'}
                  </span>
                  <span className="toggle-description-btn-trekDetailsExpand">
                    <strong>Click here to view Description</strong>
                  </span>
                </div>
              </div>
            </div>

            {expandedCardIndex === index && (
              <div className="trek-card-description">
                <button 
                  className="toggle-description-btn-trekDetails"
                  onClick={() => toggleDescription(index)}
                >
                  Collapse Description
                </button>
                <div>
                  {details.trekData?.Description ? (
                    <div dangerouslySetInnerHTML={{ __html: details.trekData.Description }} />
                  ) : (
                    <p>No description available for this trek.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TrekDetails;