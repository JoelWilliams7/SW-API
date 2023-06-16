import React, { useState } from "react";
import { Searchbar } from "../../components";
import Plus from "../../assets/Groupplus.svg";
import styles from "./Deck.module.css";

function Deck() {
  const [addDeck, setAddDeck] = useState();

  return (
    <>
      <div className={styles["deck-layout"]}>
        <Searchbar />
        <button
          className={styles["add-button"]}
          onClick={(e) => setAddDeck(e.tagret.value)}
        >
          <img src={Plus} alt="" />
        </button>
      </div>
      <p className={styles["text-layout"]}>
        No Deck Created. Please create a Deck{" "}
        <button className={styles["text-button"]}>
          <img src={Plus} alt="" />
        </button>{" "}
        by pressing the Add Deck button above.
      </p>
    </>
  );
}

export default Deck;
