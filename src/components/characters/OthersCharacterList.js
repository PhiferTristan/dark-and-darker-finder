import { useState, useEffect } from "react";
import { getCharactersByUserId } from "../../services/charactersService.js";
import "./Characters.css";
import { getClasses } from "../../services/classesService.js";
import { getLevels } from "../../services/levelsService.js";
import { getAllUsers, getUserByUserId } from "../../services/usersService.js";
import { OthersCharacter } from "./OthersCharacter.js";
import { useParams } from "react-router-dom";

export const OthersCharacterList = () => {
  const [usersCharacters, setUsersCharacters] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [username, setUsername] = useState("");

  const { userId } = useParams();

  useEffect(() => {
    getCharactersByUserId(userId).then((usersCharacterArray) => {
      setUsersCharacters(usersCharacterArray);
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

    getUserByUserId(userId).then((user) => {
      setUsername(user.username);
    });
  }, [userId]);

  return (
    <>
      <body className="others-characters-list-body">
        <div className="others-characters-container">
          <h2 className="others-characters-list-header">{username}'s Character List:</h2>

          <article className="characters">
            {usersCharacters.map((character) => {
              return (
                <OthersCharacter
                  character={character}
                  classes={classes}
                  levels={levels}
                  key={character.id}
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
