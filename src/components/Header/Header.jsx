import React from "react";
import { Link } from "react-router-dom";
import cardicon from "../../assets/Groupcardicondark.svg";
import Breadcrumbs from "../Breadcrumbs";
import decks from "../../assets/Groupdecks.svg";

import "./Header.css";

function Header() {
  return (
    <>
      <div className="header-box">
        <div className="left-buttons">
          <Link to="/SW-API/" style={{ textDecoration: "none" }}>
            <button className="all-cards-button">
              <img src={cardicon} alt="" />
              <span>All Cards</span>
            </button>
          </Link>
          <Link to="/SW-API/Deck" style={{ textDecoration: "none" }}>
            <button className="deck-button">
              <img src={decks} alt="" />
              <span>Decks</span>
            </button>
          </Link>
        </div>

        <p className="header-text">
          SW-<span className="header-text-span">API Deck Builder</span>
        </p>
        <a
          href="https://joelwilliams7.github.io/My-Profile/"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button className="name-button">Joel Williams</button>
        </a>
      </div>
      <Breadcrumbs />
    </>
  );
}

export default Header;
