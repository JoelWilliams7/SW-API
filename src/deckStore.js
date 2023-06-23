import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDeckStore = create(
  persist(
    (set) => ({
      deckInfo: {},
      addPersonToDeck: (name, deck) =>
        set((state) => {
          const deckInfoCopy = structuredClone(state.deckInfo);
          deckInfoCopy[deck].push(name);
          return { deckInfo: deckInfoCopy };
        }),
      createDeck: (nameOfDeck) =>
        set((state) => {
          const deckInfoCopy = structuredClone(state.deckInfo);
          deckInfoCopy[nameOfDeck] = [];
          return { deckInfo: deckInfoCopy };
        }),
    }),
    {
      name: "deck-storage",
    }
  )
);

export default useDeckStore;
