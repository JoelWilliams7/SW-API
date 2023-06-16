import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadcrumbs.css";

function Breadcrumbs() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isDeck = location.pathname.split("/")[1] === "Deck";

  return (
    <div className="breadcrumb">
      <Link
        to={isDeck ? "/Deck" : "/"}
        className={isHome ? "breadcrumb-active" : "breadcrumb-not-active"}
      >
        {isDeck ? "Decks" : "All Cards"}
      </Link>
      <span className="breadcrumb-arrow">&gt;</span>
      <div className={!isHome ? "breadcrumb-active" : "breadcrumb-not-active"}>
        {isHome || isDeck
          ? `Select a ${isDeck ? "deck" : "card"}`
          : location.pathname.split("/")[1]}
      </div>
    </div>
  );
}

export default Breadcrumbs;
