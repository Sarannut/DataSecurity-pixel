import React from "react";
import { Link, useMatch } from "react-router-dom";
import "./header.css"; // นำเข้าไฟล์ CSS
import logoImage from "../../public/logo/logo2.png";

function Header() {
  return (
    <header>
      <nav>
        <ul className="header-menu">
          <li className="logo-container">
            <img
              src={logoImage}
              alt="Logo"
              style={{ width: "300px", height: "70px" }}
            />
          </li>
          
          <li>
            <Link to="/" className={useMatch("/") ? "active" : ""}>
              Home
            </Link>
          </li>
          <li >
            <Link to="/rsa" className={useMatch("/rsa") ? "active" : ""}>
              RSA
            </Link>
          </li>
          <li className="link-to-member">
            <Link to="/member" className={useMatch("/member") ? "active" : ""}>
              Member
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
