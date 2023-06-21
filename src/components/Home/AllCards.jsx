import "./AllCards.css";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Card, Searchbar } from "../../components";
import usePeopleStore from "../../peopleStore";

function removeLettersFromBirtYear(birthYear) {
  const justNumbers = birthYear.replace(/BBY/g, "");
  return Number(justNumbers);
}

function AllCards() {
  const { people, setPeople } = usePeopleStore((state) => state);
  const [searchInput, setSearchInput] = useState("");
  const [sortedAlphabetically, setSortedAlphabetically] = useState(false);
  const [sortedByAge, setSortedByAge] = useState(false);
  const [sortAgeOrder, setSortAgeOrder] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSortByAge = (order) => {
    setSortedAlphabetically(false);
    setSortAgeOrder(order);
    setSortedByAge(true);
  };

  const peopleDataToRender = useMemo(() => {
    if (!sortedAlphabetically && !sortedByAge) return people;
    if (sortedAlphabetically) {
      return people.toSorted((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        return -1;
      });
    }

    if (sortedByAge) {
      switch (sortAgeOrder) {
        case "desc":
          return people.toSorted((a, b) => {
            if (
              removeLettersFromBirtYear(a.birth_year) <
              removeLettersFromBirtYear(b.birth_year)
            ) {
              return 1;
            }
            return -1;
          });
        case "asc":
          return people.toSorted((a, b) => {
            if (
              removeLettersFromBirtYear(a.birth_year) <
              removeLettersFromBirtYear(b.birth_year)
            ) {
              return -1;
            }
            return 1;
          });
      }
    }
  }, [people, sortAgeOrder, sortedAlphabetically, sortedByAge]);

  const loadAllPeople = useCallback(
    async (input) => {
      await axios
        .get("https://swapi.dev/api/people", {
          params: {
            search: input,
          },
        })
        .then((response) => {
          const peopleData = response.data.results;
          const promises = [];
          for (const person of peopleData) {
            promises.push(
              getHomeworld(person),
              getSpecies(person),
              getVehicles(person, person.vehicles),
              getStarships(person, person.starships)
            );
          }
          Promise.all(promises).then(() => {
            setPeople(peopleData);
          });
        })
        .catch((error) => {
          alert("error landing data");
        });
    },
    [setPeople]
  );

  const onSearch = () => loadAllPeople(searchInput);

  useEffect(() => {
    if (people.length === 0) {
      loadAllPeople("");
    }
  }, [loadAllPeople, people]);

  return (
    <div className="page-wrapper">
      <div className="filter-options">
        <Searchbar
          inputValue={searchInput}
          onChange={handleChange}
          onSearch={onSearch}
        />
        <button
          style={{
            border: sortedAlphabetically ? "2px solid grey" : "none",
          }}
          className="a-to-z"
          onClick={() => {
            setSortedAlphabetically(!sortedAlphabetically);
            setSortedByAge(false);
          }}
        >
          A to Z
        </button>
        <button
          style={{
            border: sortAgeOrder === "asc" ? "2px solid grey" : "none",
          }}
          onClick={() => handleSortByAge("asc")}
        >
          Youngest
        </button>
        <button
          style={{
            border: sortAgeOrder === "desc" ? "2px solid grey" : "none",
          }}
          onClick={() => handleSortByAge("desc")}
        >
          Eldest
        </button>
      </div>
      <div className="page-body">
        {peopleDataToRender?.map((person) => {
          return <Card key={person.name} person={person} />;
        })}
      </div>
    </div>
  );
}

async function getVehicles(person, vehicleEndpoints) {
  if (vehicleEndpoints.length === 0) return;

  const vehicleNames = [];
  for (const endpoint of vehicleEndpoints) {
    await axios.get(endpoint).then((response) => {
      vehicleNames.push(response.data.name);
    });
  }
  person.vehicles = vehicleNames;
}

async function getStarships(person, starshipEndpoints) {
  if (starshipEndpoints.length === 0) return;

  const starshipNames = [];
  for (const endpoint of starshipEndpoints) {
    await axios.get(endpoint).then((response) => {
      starshipNames.push(response.data.name);
    });
  }
  person.starships = starshipNames;
}

async function getSpecies(person) {
  if (person.species.length === 0) {
    person.species = "human";
    return;
  }
  await axios.get(person.species[0]).then((response) => {
    person.species = response.data.name;
  });
}

async function getHomeworld(person) {
  await axios.get(person.homeworld).then((response) => {
    person.homeworld = response.data.name;
  });
}

export default AllCards;
