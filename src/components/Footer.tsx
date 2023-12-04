// Footer.tsx

import React from "react";
import "./Footer.styles.css";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 QuizMe</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/abel-w-berhane/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Abel-b" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://abel-b.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
            <TbWorldWww />
          </a>
          <a href="https://medium.com/@abel-berhane-wm" target="_blank" rel="noopener noreferrer">
            <FaMedium />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
