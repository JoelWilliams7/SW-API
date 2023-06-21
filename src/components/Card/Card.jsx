import "./Card.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { findPerson } from "../../peopleStore";
import useDeckStore from "../../deckStore";
import cardIcon from "../../assets/Groupcardicon.svg";
import plus from "../../assets/Groupplus.svg";
import male from "../../assets/Groupmale.svg";
import female from "../../assets/Groupfemale.svg";
import planet from "../../assets/Groupplanet.svg";
import vehicle from "../../assets/Groupvehicle.svg";
import starship from "../../assets/Groupstarship.svg";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";

function Card({ person, isDetail = false }) {
  const location = useLocation();
  const { addPersonToDeck } = useDeckStore((state) => state);
  const [personToRender, setPersonToRender] = useState(person);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (isDetail) {
      const personName = location.pathname.split("/")[1].replaceAll("_", " ");
      const currentPerson = findPerson(personName);
      setPersonToRender(currentPerson);
    }
  }, [location.pathname, isDetail]);
  return (
    <div
      className="card-layout"
      style={{
        width: isDetail && "320px",
        margin: isDetail && "10rem auto",
      }}
    >
      <h2>
        <img src={cardIcon} alt="" />

        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom"]}
          content={
            <PopoverContent
              name={personToRender?.name}
              addPersonToDeck={addPersonToDeck}
            />
          }
        >
          <button onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <img src={plus} alt="" />
          </button>
        </Popover>
        <Link to={`/${personToRender?.name.replaceAll(" ", "_")}`}>
          <span>{personToRender?.name}</span>
        </Link>
      </h2>
      <div className="sub-header">
        <div>
          {personToRender?.gender === "n/a" ? (
            ""
          ) : (
            <img
              src={personToRender?.gender === "male" ? male : female}
              alt=""
            />
          )}
        </div>
        <div>{personToRender?.birth_year}</div>
        <div>{personToRender?.species}</div>
      </div>
      <div className="card-data">
        <span>
          <img src={planet} alt="" />
          HOMEWORLD
        </span>
        <span>{personToRender?.homeworld}</span>
      </div>
      {!isDetail ? (
        <div className="card-data">
          <span>
            <img src={vehicle} alt="" />
            VEHICLES
          </span>
          <span>{personToRender?.vehicles?.length}</span>
        </div>
      ) : (
        personToRender?.vehicles?.map((vehicle) => {
          return (
            <div key={vehicle} className="card-data">
              <span>
                <img src={vehicle} alt="" />
                VEHICLE
              </span>
              <span>{vehicle}</span>
            </div>
          );
        })
      )}
      {!isDetail ? (
        <div className="card-data">
          <span>
            {" "}
            <img src={starship} alt="" />
            STARSHIPS
          </span>
          <span>{personToRender?.starships?.length}</span>
        </div>
      ) : (
        personToRender?.starships?.map((starship) => {
          return (
            <div key={starship} className="card-data">
              <span>
                <img src={starship} alt="" />
                STARSHIP
              </span>
              <span>{starship}</span>
            </div>
          );
        })
      )}
    </div>
  );
}

function PopoverContent({ name, addPersonToDeck }) {
  const decks = [
    "Rebel Alliance Deck",
    "Jedi Order Deck",
    "Galactic Empire Deck",
  ];

  return (
    <div className="popover-container">
      <div>Select a deck</div>
      <ul>
        {decks.map((deck) => (
          <li
            key={deck}
            onClick={() =>
              addPersonToDeck(
                name,
                deck.toLocaleLowerCase().replaceAll(" ", "-")
              )
            }
          >
            {deck}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
