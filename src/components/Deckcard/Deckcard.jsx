import React from "react";
import useDeckStore from "../../deckStore";

function Deckcard(name) {
  const { deckInfo } = useDeckStore((state) => state);
  return <div>{deckInfo.name}</div>;
}

export default Deckcard;
