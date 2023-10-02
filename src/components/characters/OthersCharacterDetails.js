import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCharacterById } from "../../services/charactersService.js";
import "./Characters.css";
import { getAllUsers } from "../../services/usersService";
import { getClasses } from "../../services/classesService";
import { getLevels } from "../../services/levelsService.js";
import { getObjectives } from "../../services/objectivesService.js";
import { addCharacterToFavorites } from "../../services/favoriteService.js";

export const OthersCharacterDetails = ({ userId }) => {
  const [character, setCharacter] = useState({});
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [favorited, setFavorited] = useState(false);

  const { characterId } = useParams(); // { characterId: 3}

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

  const handleFavoriteClick = () => {
    addCharacterToFavorites(userId, characterId).then(() => {
      setFavorited(true);
    });
  };

  return (
      <>
      <h1 className="details-header">{user?.username}'s Character</h1>
      <div className="details-container">
    <section className="others-character-details">
      {/* <header className="character-header">User: {user?.username}</header> */}
      <div>
        <p className="character-info">Character Name : {character.name}</p>
        
      </div>
      <div>
        <p className="character-info">Character Class : {characterClass?.class}</p>
        
      </div>
      <div>
        <p className="character-info">Character Level : {characterLevel?.level}</p>
        
      </div>
      <div>
        <p className="character-info">Character Objective : {characterObjective?.objective}</p>
        
      </div>
      {!favorited ? (
        <button className="btn-favorite-character" onClick={handleFavoriteClick}>Favorite</button>
        ) : (
          <span>Favorited</span>
          )}
    </section>
    </div>
    </>
  );
};
