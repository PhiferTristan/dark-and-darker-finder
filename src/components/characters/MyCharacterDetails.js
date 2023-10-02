import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCharacter,
  getCharacterById,
} from "../../services/charactersService.js";
import "./Characters.css";
import { getAllUsers } from "../../services/usersService";
import { getClasses } from "../../services/classesService";
import { getLevels } from "../../services/levelsService.js";
import { getObjectives } from "../../services/objectivesService.js";

export const MyCharacterDetails = () => {
  const [character, setCharacter] = useState({});
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [objectives, setObjectives] = useState([]);

  const { characterId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((usersArray) => {
      setUsers(usersArray);
    });

    getClasses().then((classesArray) => {
      setClasses(classesArray);
    });

    getLevels().then((levelsArray) => {
      setLevels(levelsArray);
    });

    getObjectives().then((objectivesArray) => {
      setObjectives(objectivesArray);
    });
  }, []);

  useEffect(() => {
    getCharacterById(characterId).then((data) => {
      const characterObj = data[0];
      setCharacter(characterObj);
    });
  }, [characterId]);

  const user = users.find((user) => user.id === character.userId);
  const characterClass = classes.find((cls) => cls.id === character.classId);
  const characterLevel = levels.find((lvl) => lvl.id === character.levelId);
  const characterObjective = objectives.find(
    (obj) => obj.id === character.objectiveId
  );

  const deleteClick = (character) => {
    const confirmed = window.confirm(
      "Are you positive you want to delete this character?"
    );
    if (confirmed) {
      deleteCharacter(character).then(() => {
        navigate(`/mycharacters`);
      });
    }
  };

  return (
    <>
      <h1 className="details-header">My Character Details</h1>
      <div className="details-container">
        <section className="my-character-details">
          {/* <header className="character-header">{user?.username}</header> */}
          <div>
            <p className="character-info">Character Name: {character.name}</p>
            
          </div>
          <div>
            <p className="character-info">Character Class: {characterClass?.class}</p>
            
          </div>
          <div>
            <p className="character-info">Character Level: {characterLevel?.level}</p>
            
          </div>
          <div>
            <p className="character-info">Character Objective: {characterObjective?.objective}</p>
            
          </div>
          <button
            onClick={() => {
              navigate(`/mycharacters/${character.id}/edit`);
            }}
            className="btn-edit-character"
          >
            Edit Character?
          </button>
          <button
            className="btn-delete-character"
            onClick={() => deleteClick(character)}
          >
            Delete Character?
          </button>
        </section>
      </div>
    </>
  );
};
