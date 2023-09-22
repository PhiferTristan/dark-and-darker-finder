import { useState, useEffect } from "react";
import { getCharactersByUserId } from "../../services/charactersService.js";
import "./Characters.css";
import { MyCharacter } from "./MyCharacter.js";
import { getClasses } from "../../services/classesService.js";
import { getLevels } from "../../services/levelsService.js";
import { Link } from "react-router-dom";

export const MyCharacterList = ({ userId }) => {
  const [myCharacters, setMyCharacters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    getCharactersByUserId(userId).then((myCharactersArray) => {
      setMyCharacters(myCharactersArray);
      console.log("Characters Set!");
    });
  }, [userId]);

  const fetchCharactersByUserId = () => {
    getCharactersByUserId(userId).then((charactersByUserId) => {
      setMyCharacters(charactersByUserId);
    });
  };

  useEffect(() => {
    getClasses().then((classesArray) => {
      setClasses(classesArray);
    });

    getLevels().then((levelsArray) => {
      setLevels(levelsArray);
    });
  }, []);

  return (
    <div className="my-characters-container">
      <h2>My Character List:</h2>
      <Link className="add-character-link" to="/mycharacters/newcharacter">
        <button className="add-character-btn" onClick={() => {}}>
          Add Character
        </button>
      </Link>

      <article className="my-characters-container">
        {myCharacters.map((character) => {
          return (
            <MyCharacter
              character={character}
              classes={classes}
              levels={levels}
              fetchCharactersByUserId={fetchCharactersByUserId}
              key={character.id}
            />
          );
        })}
      </article>
    </div>
  );
};
