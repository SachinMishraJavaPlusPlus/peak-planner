import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./header.css";
import peakPlannerLogo from "./../../../assets/images/logo.png";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    // Function to reset body overflow and close menu
    const resetMenuState = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
        document.body.style.overflow = 'auto';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    useEffect(() => {
        // Add event listener to handle back/forward navigation
        const handleRouteChange = () => {
            resetMenuState();
        };

        // Add listener for route changes
        window.addEventListener("popstate", handleRouteChange);
        
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("popstate", handleRouteChange);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const header = document.querySelector(".header-section");
        if (window.scrollY >= 120) {
            header?.classList.add("is-sticky");
        } else {
            header?.classList.remove("is-sticky");
        }
    };

    const handleSeasonSelect = (season) => {
        navigate(`/seasonal-treks/${season}`);
        resetMenuState();
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
        resetMenuState();
    };

    const handleAuth = (path) => {
        navigate(path);
        resetMenuState();
    };

    // Function to handle generic navigation
    const handleNavigation = (path) => {
        navigate(path);
        resetMenuState();
    };

    return (
        <header className="header-section">
            <div className="navbar-main">
                <NavLink to="/" className="navbar-logo-container">
                    <img
                        className="header-logo"
                        src={peakPlannerLogo}
                        alt="Peak Planner Logo"
                    />
                </NavLink>

                <button className="mobile-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                <div className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
                    <nav className="nav-links-container">
                        <NavLink 
                            to="/top-treks" 
                            className="nav-item" 
                            onClick={() => handleNavigation("/top-treks")}
                        >
                            Top Treks
                        </NavLink>
                        <NavLink 
                            to="/seasonal-treks/summer" 
                            className="nav-item" 
                            onClick={() => handleNavigation("/seasonal-treks/summer")}
                        >
                            Upcoming Treks
                        </NavLink>

                        <div className={`nav-dropdown ${openDropdown === 'seasonal' ? 'open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => toggleDropdown('seasonal')}>Seasonal Treks</button>
                            <div className="dropdown-menu">
                                <button className="dropdown-item season-dropdown summer" onClick={() => handleSeasonSelect("summer")}>
                                    Summer
                                </button>
                                <button className="dropdown-item season-dropdown monsoon" onClick={() => handleSeasonSelect("monsoon")}>
                                    Monsoon
                                </button>
                                <button className="dropdown-item season-dropdown winter" onClick={() => handleSeasonSelect("winter")}>
                                    Winter
                                </button>
                                <button className="dropdown-item season-dropdown all-seasons" onClick={() => handleSeasonSelect("all seasons")}>
                                    All Seasons
                                </button>
                            </div>
                        </div>

                        <div className={`nav-dropdown ${openDropdown === 'hiking' ? 'open' : ''}`}>
                            <button className="dropdown-toggle" onClick={() => toggleDropdown('hiking')}>Hiking Schools</button>
                            <div className="dropdown-menu">
                                <a 
                                    href="https://www.nimindia.net/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="dropdown-item"
                                    onClick={resetMenuState}
                                >
                                    Nehru Institute of Mountaineering (NIM)
                                </a>
                                <a 
                                    href="https://www.abvimas.org/course/list-of-courses/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="dropdown-item"
                                    onClick={resetMenuState}
                                >
                                    Atal Bihari Vajpayee Institute of Mountaineering and Allied Sports (ABVIMAS)
                                </a>
                                <a 
                                    href="https://hmidarjeeling.com/courses-offered/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="dropdown-item"
                                    onClick={resetMenuState}
                                >
                                    Himalayan Mountaineering Institute (HMI)
                                </a>
                                <a 
                                    href="https://jawaharinstitutepahalgam.com/Mountaineering.php#gsc.tab=0" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="dropdown-item"
                                    onClick={resetMenuState}
                                >
                                    Jawahar Institute of Mountaineering & Winter Sports (JIM&WS)
                                </a>
                                <a 
                                    href="https://nimasdirang.com/Mountaineering-courses" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="dropdown-item"
                                    onClick={resetMenuState}
                                >
                                    National Institute of Mountaineering and Allied Sports (NIMAS)
                                </a>
                            </div>
                        </div>

                        <NavLink 
                            to="/articles" 
                            className="nav-item" 
                            onClick={() => handleNavigation("/articles")}
                        >
                            Articles
                        </NavLink>
                        <NavLink 
                            to="/about-us" 
                            className="nav-item" 
                            onClick={() => handleNavigation("/about-us")}
                        >
                            About Us
                        </NavLink>
                        <NavLink 
                            to="/contact-us" 
                            className="nav-item" 
                            onClick={() => handleNavigation("/contact-us")}
                        >
                            Contact Us
                        </NavLink>
                    </nav>

                    <div className="auth-buttons">
                        {currentUser ? (
                            <>
                                <span className="welcome-text">
                                    Welcome, {currentUser.username || currentUser.name || 'User'}
                                </span>
                                <button 
                                    className="auth-button logout-button" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    className="auth-button login-button" 
                                    onClick={() => handleAuth("/login")}
                                >
                                    Login
                                </button>
                                <button 
                                    className="auth-button signup-button" 
                                    onClick={() => handleAuth("/signup")}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;