import React from "react";
import "./Deckcard.css";

function Deckcard({ name, total }) {
  return (
    <div className="deck-body">
      <div className="name-of-cards">{name}</div>
      <div className="number-of-cards">{total}</div>
    </div>
  );
}

export default Deckcard;
