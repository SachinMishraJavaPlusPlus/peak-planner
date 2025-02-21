// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Or you can use fetch()
// import './../SearchResults/search-results.css'; // Make sure to style as per your requirements
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const SearchResults = () => {
//     const [trekkingPackages, setTrekkingPackages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch data from the backend when the component mounts
//     useEffect(() => {
//         const fetchTrekkingPackages = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/trekking-packages');
//                 setTrekkingPackages(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching trekking packages:', err);
//                 setError('Failed to load trekking packages');
//                 setLoading(false);
//             }
//         };
//         fetchTrekkingPackages();
//     }, []);

//     // Render a loading indicator while the data is being fetched
//     if (loading) {
//         return <div className="loading">Loading...</div>;
//     }

//     // Render an error message if there was a problem fetching the data
//     if (error) {
//         return <div className="error-message">{error}</div>;
//     }

//     // Render the list of trekking packages
//     return (
//         <>
//         <Banner />
//         <AdvanceSearch />
//         <div className="search-results">
//             {trekkingPackages.length > 0 ? (
//                 trekkingPackages.map((trek) => (
//                     <div key={trek.id} className="trek-card">
//                         <img src={trek.image_url} alt={trek.title} className="trek-image" />
//                         <div className="trek-details">
//                             <h2 className="trek-title">{trek.title}</h2>
//                             <p className="trek-description">{trek.description}</p>
//                             <p className="trek-altitude">Altitude: {trek.altitude}</p>
//                             <p className="trek-duration">Duration: {trek.duration}</p>
//                             <a href={trek.itinerary_link} target="_blank" rel="noopener noreferrer" className="trek-itinerary-link">
//                                 View Itinerary
//                             </a>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="no-results">No trekking packages found</div>
//             )}
//         </div>
//         </>
//     );
// };

// export default SearchResults;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './../SearchResults/search-results.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const SearchResults = () => {
//   const location = useLocation();
//   const { treks } = location.state || [];

//   return (
//     <>
//     <Banner />
//     <AdvanceSearch />
//     <div className="search-results-page">
//       {/* <h1>Search Results</h1> */}
//       {treks.length > 0 ? (
//         treks.map((trek) => (
//           <div key={trek.id} className="trek-card">
//             <div className="trek-header">
//               <h2 className="trek-title">{trek["Trek Name"]}</h2>
//               <span className={`season-tag ${trek["Best time to visit"].toLowerCase()}`}>
//                 {trek["Best time to visit"]}
//               </span>
//             </div>
//             <div className="trek-details">
//               <p className="trek-description">{trek.Description}</p>
//               <p className="trek-altitude">Altitude: {trek.Altitude}</p>
//               <p className="trek-duration">Duration: {trek.Duration}</p>
//               <p className="trek-difficulty">Difficulty: {trek["Difficulty Level"]}</p>
//               <p className="trek-state">State: {trek.State}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="no-results">No treks found for your search criteria</div>
//       )}
//     </div>
//     </>
//   );
// };

// export default SearchResults;


// Working searchresults
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './../SearchResults/search-results.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const SearchResults = () => {
//   const location = useLocation();
//   const { treks } = location.state || [];

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="search-results-page">
//         {treks.length > 0 ? (
//           treks.map((trek) => (
//             <div key={trek["Trek Name"]} className="trek-card">
//               <div className="trek-header">
//                 <h2 className="trek-title">{trek["Trek Name"]}</h2>
//                 <span className={`season-tag ${trek["Best time to visit"].toLowerCase()}`}>
//                   {trek["Best time to visit"]}
//                 </span>
//               </div>
//               <div className="trek-details">
//                 <p className="trek-description">{trek.Description}</p>
//                 <p className="trek-altitude">Altitude: {trek.Altitude}</p>
//                 <p className="trek-duration">Duration: {trek.Duration}</p>
//                 <p className="trek-difficulty">Difficulty: {trek["Difficulty Level"]}</p>
//                 <p className="trek-state">State: {trek.State}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">No treks found for your search criteria</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchResults;


// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import './../SearchResults/search-results.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const SearchResults = () => {
//   const location = useLocation();
//   const { treks } = location.state || [];

//   return (
//     <>
//       <Banner />
//       <AdvanceSearch />
//       <div className="search-results-page">
//         {treks.length > 0 ? (
//           treks.map((trek) => (
//             <div key={trek["Trek Name"]} className="trek-card">
//               <div className="trek-header">
//                 <h2 className="trek-title">
//                   <Link to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}>
//                     {trek["Trek Name"]}
//                   </Link>
//                 </h2>
//                 <span className={`season-tag ${trek["Best time to visit"].toLowerCase()}`}>
//                   {trek["Best time to visit"]}
//                 </span>
//               </div>
//               <div className="trek-details">
//                 <p className="trek-description">{trek.Description}</p>
//                 <p className="trek-altitude">Altitude: {trek.Altitude}</p>
//                 <p className="trek-duration">Duration: {trek.Duration}</p>
//                 <p className="trek-difficulty">Difficulty: {trek["Difficulty Level"]}</p>
//                 <p className="trek-state">State: {trek.State}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">No treks found for your search criteria</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchResults;


// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import './../SearchResults/search-results.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const SearchResults = () => {
//   const location = useLocation();
//   const { treks } = location.state || [];

//   return (
//     <>
//     <Banner />
//     <AdvanceSearch />
//     <div className="search-results-page">
//       {treks.length > 0 ? (


//         // treks.map((trek) => (
//         //   <div key={trek.id} className="trek-card">


//         treks.map((trek, index) => (
//           <div key={trek.id || index} className="trek-card">
//             <div className="trek-header">



//               {/* <Link to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}>
//                 <h2 className="trek-title">{trek["Trek Name"]}</h2>
//               </Link> */}


// <Link to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}>
//   <h2 className="trek-title">{trek["Trek Name"]}</h2>
// </Link>
//               <span className={`season-tag ${trek["Best time to visit"].toLowerCase()}`}>
//                 {trek["Best time to visit"]}
//               </span>
//             </div>
//             <div className="trek-details">
//             <p className="trek-state">Description: {trek.Description}</p><br />
              
//             <p className="trek-state">Altitude: {trek.Altitude}</p>
//             <p className="trek-state">Duration: {trek.Duration}</p>
//               <p className="trek-days-range">Days Range: {trek["Days Range"]}</p> {/* Updated this line */}
//               <p className="trek-difficulty">Difficulty: {trek["Difficulty Level"]}</p>
//               <p className="trek-state">State: {trek.State}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="no-results">No treks found for your search criteria</div>
//       )}
//     </div>
//     </>
//   );
// };

// export default SearchResults;





// LATEST WORKING SEARCHRESULTS.JSX 4 DEC 9PM 

// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import './../SearchResults/search-results.css';
// import Banner from "../../components/Banner/Banner"; 
// import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 

// const SearchResults = () => {
//   const location = useLocation();
//   const { treks } = location.state || [];

//   // Normalize season for CSS class
//   const normalizeSeason = (season) => {
//     if (!season) return "";
//     const lowercaseSeason = season.toLowerCase();
    
//     const seasonMappings = {
//       'all season': 'all-seasons',
//       'all seasons': 'all-seasons',
//       'summer': 'summer',
//       'monsoon': 'monsoon',
//       'winter': 'winter'
//     };

//     // Check for exact match first
//     if (seasonMappings[lowercaseSeason]) {
//       return seasonMappings[lowercaseSeason];
//     }

//     // Check for partial match
//     for (const [key, value] of Object.entries(seasonMappings)) {
//       if (lowercaseSeason.includes(key)) {
//         return value;
//       }
//     }

//     // Fallback to hyphenated lowercase
//     return lowercaseSeason.replace(/ /g, '-');
//   };

//   return (
//     <>
//     <Banner />
//     <AdvanceSearch />
//     <div className="search-results-page">
//       {treks.length > 0 ? (
//         treks.map((trek, index) => (
//           <div key={trek.id || index} className="trek-card">
//             <div className="trek-header">
//               <Link to={`/trek-details/${encodeURIComponent(trek["Trek Name"])}`}>
//                 <h2 className="trek-title">{trek["Trek Name"]}</h2>
//               </Link>
//               <span 
//                 className={`season-tag ${normalizeSeason(trek["Best time to visit"])}`}
//               >
//                 {trek["Best time to visit"]}
//               </span>
//             </div>
//             <div className="trek-details">
//               <p className="trek-state">Description: {trek.Description}</p><br />
//               <p className="trek-state">Altitude: {trek.Altitude}</p>
//               <p className="trek-state">Duration: {trek.Duration}</p>
//               <p className="trek-days-range">Days Range: {trek["Days Range"]}</p>
//               <p className="trek-difficulty">Difficulty: {trek["Difficulty Level"]}</p>
//               <p className="trek-state">State: {trek.State}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="no-results">No treks found for your search criteria</div>
//       )}
//     </div>
//     </>
//   );
// };

// export default SearchResults;











import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './search-results.css';
import Banner from "../../components/Banner/Banner"; 
import AdvanceSearch from "../../components/AdvanceSearch/AdvanceSearch"; 
import { FaMountain, FaClock, FaCalendarAlt, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const { treks } = location.state || [];

  // Normalize season for CSS class
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

export default SearchResults;
