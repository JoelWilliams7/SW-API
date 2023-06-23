import React, { useState } from "react";
import Searchbar from "../Searchbar";
import Deckcard from "../Deckcard";
import Plus from "../../assets/Groupplus.svg";
import "./Deck.css";
import { Popover } from "react-tiny-popover";
import useDeckStore from "../../deckStore";
import Jediorder from "../../assets/g22jediorder.svg";
import Galacticempire from "../../assets/g3191galacticempire.svg";
import Rebelalliance from "../../assets/Grouprebelalliance.svg";
import Noneicon from "../../assets/Groupnoneicon.svg";

function Deck() {
  const { deckInfo, createDeck } = useDeckStore((state) => state);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const decks = Object.entries(deckInfo);

  return (
    <div className="decks-wrapper">
      <div className={"deck-layout"}>
        <Searchbar />
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom"]}
          content={<DeckPopover createDeck={createDeck} />}
          onClickOutside={() => setIsPopoverOpen(false)}
        >
          <button
            className={"add-button"}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <img src={Plus} alt="" />
          </button>
        </Popover>
      </div>
      {decks.length === 0 ? (
        <p className={"text-layout"}>
          No Deck Created. Please create a Deck by pressing the Add Deck{" "}
          <button className={"text-button"}>
            <img src={Plus} alt="" />
          </button>{" "}
          button above.
        </p>
      ) : (
        <div className="deck-cards-container">
          {decks.map(([nameOfDeck, arrayOfPersons]) => (
            <Deckcard
              key={nameOfDeck}
              name={nameOfDeck}
              total={arrayOfPersons.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DeckPopover({ createDeck }) {
  const [deckName, setDeckName] = useState("");
  const factions = [Rebelalliance, Jediorder, Galacticempire, Noneicon];

  const handleDeckNameChange = (event) => {
    setDeckName(event.target.value);
  };

  return (
    <div className="popover-layout">
      <div>Faction</div>
      <ul>
        {factions.map((faction, index) => (
          <li
            key={index}
            onClick={() => {
              createDeck(deckName.toLocaleLowerCase().replaceAll(" ", "-"));
              setDeckName("");
              alert("Deck created");
            }}
            style={{ margin: "0 10px" }}
          >
            <div className="faction-img">
              <img key={index} src={faction} alt={`Image ${index}`} />
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={deckName}
        onChange={handleDeckNameChange}
        placeholder="Enter Deck Name"
      />
    </div>
  );
}

export default Deck;
