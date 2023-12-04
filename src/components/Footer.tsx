// Footer.tsx

import React from 'react';
import './Footer.styles.css';
import { FaLinkedin, FaGithub  } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 QuizMe</p>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
           <FaLinkedin />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
          <FaGithub />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
          <TbWorldWww />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
