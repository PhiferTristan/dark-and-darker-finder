import { useState, useEffect } from "react";
import { getAllCharacters } from "../../services/charactersService.js";
import "./Characters.css";
import { LFGCharacter } from "./LFGCharacter.js";
import { getClasses } from "../../services/classesService.js";
import { getLevels } from "../../services/levelsService.js";
import { getAllUsers } from "../../services/usersService.js";

export const LFGCharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState("0");

  useEffect(() => {
    getAllCharacters().then((charactersArray) => {
      setAllCharacters(charactersArray);
      console.log("Characters Set!");
    });

    getClasses().then((classesArray) => {
      setClasses(classesArray);
    });

    getLevels().then((levelsArray) => {
      setLevels(levelsArray);
    });

    getAllUsers().then((usersArray) => {
      setAllUsers(usersArray);
    });
  }, []);

  const toggleActiveCharacters = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  const filteredCharacters = allCharacters.filter((character) => {
    const classFilterMatch =
      selectedClassFilter === "0" ||
      character.classId === parseInt(selectedClassFilter);
    const activeFilterMatch = !showActiveOnly || character.activeStatus;
    return classFilterMatch && activeFilterMatch;
  });

  const handleClassFilterChange = (event) => {
    setSelectedClassFilter(event.target.value);
  };

  return (
    <>
      <body className="lfg-list-body">
        <div className="lfg-characters-container">
          <h2 className="lfg-list-header">Looking for Group List:</h2>
          <select
            className="class-dropdown"
            value={selectedClassFilter}
            onChange={handleClassFilterChange}
          >
            <option value="0">All Classes</option>
            {classes.map((classObj) => {
              return (
                <option value={classObj.id} key={classObj.id}>
                  {classObj.class}
                </option>
              );
            })}
          </select>
          <button className="filter-btn" onClick={toggleActiveCharacters}>
            {showActiveOnly ? "All Characters" : "Active"}
          </button>
          <article className="characters">
            {filteredCharacters.map((character) => {
              return (
                <LFGCharacter
                  character={character}
                  key={character.id}
                  classes={classes}
                  levels={levels}
                  allUsers={allUsers}
                />
              );
            })}
          </article>
        </div>
      </body>
    </>
  );
};
