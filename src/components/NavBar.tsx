import React from "react";
import "./NavBar.styles.css";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <h6  className="logo">QuizMe</h6>
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Games</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
