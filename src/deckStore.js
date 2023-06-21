import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDeckStore = create(
  persist(
    (set) => ({
      deckInfo: {
        "rebel-alliance-deck": [],
        "jedi-order-deck": [],
        "galactic-empire-deck": [],
      },
      addPersonToDeck: (name, deck) =>
        set((state) => {
          const currentStateCopy = { ...state.deckInfo };
          currentStateCopy[deck].push(name);
          return currentStateCopy;
        }),
    }),
    {
      name: "deck-storage",
    }
  )
);

export default useDeckStore;
