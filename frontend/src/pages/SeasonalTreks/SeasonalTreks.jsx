// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './../SeasonalTreks/seasonaltreks.css';
// import Banner from "../../components/Banner/Banner";
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";

// const SeasonalTreks = () => {
//   const { season } = useParams(); // Get the season from the URL parameters
//   const [treks, setTreks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTreks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/trekking-packages?season=${season}`);
//         setTreks(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching seasonal treks:', err);
//         setError('Failed to load treks');
//         setLoading(false);
//       }
//     };
//     fetchTreks();
//   }, [season]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//     <Banner />
//     <AdvanceSearch />
//     <div className="seasonal-treks-page">
//       <h1 className="seasonHeading">{season.charAt(0).toUpperCase() + season.slice(1)} Treks</h1>
//       {treks.length > 0 ? (
//         treks.map((trek) => (
//           <div key={trek.id} className="trek-card">
//             <div className="trek-header">
//               <h2 className="trek-title">{trek.title}</h2>
//               <span className={`season-tag ${season}`}>{season.charAt(0).toUpperCase() + season.slice(1)}</span>
//             </div>
//             <img src={trek.image_url} alt={trek.title} className="trek-image" />
//             <div className="trek-details">
//               <p className="trek-description">{trek.description}</p>
//               <p className="trek-altitude">Altitude: {trek.altitude}</p>
//               <p className="trek-duration">Duration: {trek.duration}</p>
//               <a href={trek.itinerary_link} target="_blank" rel="noopener noreferrer" className="trek-itinerary-link">
//                 View Itinerary
//               </a>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="no-results">No treks found for this season</div>
//       )}
//     </div>
//     </>
//   );
// };

// export default SeasonalTreks;

// LAST WORKING SEASONALTREKS.JSX
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./seasonaltreks.css";
import Banner from "../../components/Banner/Banner";
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch";
import { FaCalendarAlt, FaChartLine, FaClock, FaMapMarkerAlt, FaMountain } from "react-icons/fa";
import { BACKEND_URL } from "../../constant";

// const SeasonalTreks = () => {
//   const { season } = useParams(); // Get the season from the URL parameters
//   const [treks, setTreks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTreks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/trekking-packages?season=${season}`);
//         setTreks(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching seasonal treks:', err);
//         setError('Failed to load treks');
//         setLoading(false);
//       }
//     };
//     fetchTreks();
//   }, [season]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="seasonal-treks-page">
//         <h1 className={`seasonHeading ${season}`}>{season.charAt(0).toUpperCase() + season.slice(1)} Treks</h1>
//         {treks.length > 0 ? (
//           treks.map((trek) => (
//             <div key={trek.id} className="trek-card">
//               <div className="trek-header">
//                 <h2 className="trek-title">{trek.title}</h2>
//                 <span className={`season-tag ${season}`}>{season.charAt(0).toUpperCase() + season.slice(1)}</span>
//               </div>
//               <img src={trek.image_url} alt={trek.title} className="trek-image" />
//               <div className="trek-details">
//                 <p className="trek-description">{trek.description}</p>
//                 <p className="trek-altitude">Altitude: {trek.altitude}</p>
//                 <p className="trek-duration">Duration: {trek.duration}</p>
//                 <a href={trek.itinerary_link} target="_blank" rel="noopener noreferrer" className="trek-itinerary-link">
//                   View Itinerary
//                 </a>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">No treks found for this season</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SeasonalTreks;

//LAST WORKING SEASONALTREKS.JSX
// const SeasonalTreks = () => {
//   const { season } = useParams(); // Get the season from the URL parameters
//   const [treks, setTreks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to normalize the season value for CSS class usage
//   const normalizedSeason = (season) => {
//     if (!season) return "";
//     if (season.toLowerCase().includes("all season")) {
//       return "all-seasons";
//     } else if (season.toLowerCase().includes("summer")) {
//       return "summer";
//     } else if (season.toLowerCase().includes("monsoon")) {
//       return "monsoon";
//     } else if (season.toLowerCase().includes("winter")) {
//       return "winter";
//     } else {
//       return season.toLowerCase();
//     }
//   };

//   useEffect(() => {
//     const fetchTreks = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/trekking-packages?season=${season}`
//         );
//         setTreks(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching seasonal treks:", err);
//         setError("Failed to load treks");
//         setLoading(false);
//       }
//     };
//     fetchTreks();
//   }, [season]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="seasonal-treks-page">
//         <h1 className={`seasonHeading ${normalizedSeason(season)}`}>
//           {season.charAt(0).toUpperCase() + season.slice(1)} Treks
//         </h1>
//         {treks.length > 0 ? (
//           treks.map((trek) => (
//             <div key={trek.id} className="trek-card">
//               <div className="trek-header">
//                 <h2 className="trek-title">{trek.title}</h2>
//                 {/* <span className={`season-tag ${normalizedSeason(trek["Best time to visit"])}`}>
//                   {normalizedSeason(trek["Best time to visit"]).replace('-', ' ')}
//                 </span> */}

//                 <span
//                   className={`season-tag ${season
//                     .toLowerCase()
//                     .replace(/ /g, "-")}`}
//                 >
//                   {season.charAt(0).toUpperCase() + season.slice(1)}
//                 </span>
//               </div>
//               <img
//                 src={trek.image_url}
//                 alt={trek.title}
//                 className="trek-image"
//               />
//               <div className="trek-details">
//                 <p className="trek-description">{trek.description}</p>
//                 <p className="trek-altitude">Altitude: {trek.altitude}</p>
//                 <p className="trek-duration">Duration: {trek.duration}</p>
//                 <a
//                   href={trek.itinerary_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="trek-itinerary-link"
//                 >
//                   View Itinerary
//                 </a>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">No treks found for this season</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SeasonalTreks;

const SeasonalTreks = () => {
  const { season } = useParams();
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug log to verify season
  console.log("Current Season:", season);

  // More robust normalization with fallback
  const normalizedSeason = (seasonStr) => {
    if (!seasonStr) return "all-seasons";

    const lowercaseSeason = seasonStr.toLowerCase();
    const seasonMappings = {
      "all season": "all-seasons",
      summer: "summer",
      monsoon: "monsoon",
      winter: "winter",
    };

    // Exact match first
    if (seasonMappings[lowercaseSeason]) {
      return seasonMappings[lowercaseSeason];
    }

    // Partial match
    for (const [key, value] of Object.entries(seasonMappings)) {
      if (lowercaseSeason.includes(key)) {
        return value;
      }
    }

    // Fallback to hyphenated lowercase
    return lowercaseSeason.replace(/ /g, "-");
  };

  // Capitalize first letter helper
  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/search-treks?season=${season}`
        );
        setTreks(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching seasonal treks:", err);
        setError("Failed to load treks");
        setLoading(false);
      }
    };

    if (season) {
      fetchTreks();
    }
  }, [season]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <div className="seasonal-treks-page">
        <h1 className={`seasonHeading ${normalizedSeason(season)}`}>
          {capitalizeFirstLetter(season)} Treks
        </h1>
        {/* {treks.length > 0 ? (
          treks.map((trek) => (
            <div key={trek.id} className="trek-card">
              <div className="trek-header">
                <Link
                  to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}
                >
                  <h2 className="trek-title">{trek["Trek Name"]}</h2>
                </Link>
                <span className={`season-tag ${normalizedSeason(season)}`}>
                  {capitalizeFirstLetter(season)}
                </span>
              </div>
              <img
                src={trek.image_url}
                alt={trek.title}
                className="trek-image"
              />
              <div className="trek-details">
                <p className="trek-description">{trek.description}</p>
                <p className="trek-altitude">Altitude: {trek.altitude}</p>
                <p className="trek-duration">Duration: {trek.duration}</p>
                <a
                  href={trek.itinerary_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trek-itinerary-link"
                >
                  View Itinerary
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No treks found for this season</div>
        )} */}
        {treks.length > 0 ? (
                treks.map((trek, index) => (
                  <div key={trek.id || index} className="trek-card-searchResults">
                    <div className="trek-header">
                      <Link to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}>
                        <h2 className="trek-title">{trek["Trek Name"]}</h2>
                      </Link>
                      <span 
                        className={`season-tag ${normalizedSeason(trek["Best time to visit"])}`}
                      >
                        {trek["Best time to visit"]}
                      </span>
                    </div>
                    
                    {/* Icon Boxes Section */}
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
        
                    {/* Trek Description */}
                    <div className="trek-details">
                      <p className="trek-description">
                        <h2 className="trek-description-heading"> Trek Description 
                          </h2>{trek.Description}</p>
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

export default SeasonalTreks;
