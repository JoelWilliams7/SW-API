import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePeopleStore = create(
  persist(
    (set) => ({
      people: [],
      setPeople: (persons) => set((_state) => ({ people: persons })),
    }),
    {
      name: "people-storage",
    }
  )
);

export const findPerson = (name) =>
  usePeopleStore.getState().people.find((person) => person.name === name);

export default usePeopleStore;
