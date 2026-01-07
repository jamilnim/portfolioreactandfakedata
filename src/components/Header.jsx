import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/background/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for mobile menu icons

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNecClick = (sectionId) => {
    setMenuOpen(false); // close menu when clicked
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="main-header">
      <div className="logocontainer">
        <img className="mainlogo" src={logo} alt="logo" />
        <p className="mainlogotext">Your coder here</p>
      </div>

      {/* Hamburger icon visible only on mobile */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? (
          <X size={26} color="white" />
        ) : (
          <Menu size={26} color="white" />
        )}
      </button>

      <nav className={`nav-bar ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <a href="/home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#aboutme" onClick={() => handleNecClick("aboutme")}>
              Aboutme
            </a>
          </li>
          <li>
            <a href="#project" onClick={() => handleNecClick("project")}>
              Project
            </a>
          </li>
          <li>
            <a href="/blog" onClick={() => handleNecClick("blogs")}>
              Blogs
            </a>
          </li>
          <li>
            <a href="/gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </a>
          </li>
          <li>
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </li>
          <li>
            <a href="/MassageList" onClick={() => setMenuOpen(false)}>
              Admin
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
