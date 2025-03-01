import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
import About from './pages/About/About';
import Articles from './pages/Articles/Articles';
import ContactUs from './pages/ContactUs/ContactUs';
import HikingSchools from './pages/HikingSchools/HikingSchools';
import TopTreks from './pages/TopTreks/TopTreks';
import UpcomingTreks from './pages/UpcomingTreks/UpcomingTreks';
import SearchResults from './pages/SearchResults/SearchResults';
import SeasonalTreks from './pages/SeasonalTreks/SeasonalTreks';
import TrekDetails from './pages/TrekDetails/TrekDetails';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
  <>
  <AuthProvider>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/search-results" element={<SearchResults />} />
    <Route path="/trek-details/:trekName" element={<TrekDetails />} />
    <Route path="articles" element={<Articles />} />
    <Route path="about-us" element={<About />} />
    <Route path="contact-us" element={<ContactUs />} />
    <Route path="hiking-schools" element={<HikingSchools />} />
    <Route path="top-treks" element={<TopTreks />} />
    <Route path="upcoming-treks" element={<UpcomingTreks />} />
    <Route path="/seasonal-treks/:season" element={<SeasonalTreks />} />
  </Routes>
  <Footer />
  </AuthProvider>
  </>
  );
}

export default App;
