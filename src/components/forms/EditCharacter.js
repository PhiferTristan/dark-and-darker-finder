import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClasses } from "../../services/classesService";
import { getLevels } from "../../services/levelsService";
import { getObjectives } from "../../services/objectivesService";
import {
  editCharacter,
  getCharacterById,
} from "../../services/charactersService";

export const EditCharacter = () => {
  const [character, setCharacter] = useState({});
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [objectives, setObjectives] = useState([]);

  const { characterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCharacterById(characterId).then((charObj) => {
      //   console.log(JSON.stringify(charObj, null, 2));
      setCharacter(charObj[0]);
    });
  }, [characterId]);

  useEffect(() => {
    getClasses().then((classesArray) => {
      setClasses(classesArray);
    });

    getLevels().then((levelsArray) => {
      setLevels(levelsArray);
    });

    getObjectives().then((objectivesArray) => {
      setObjectives(objectivesArray);
    });
  }, [characterId]);

  const handleSave = (event) => {
    event.preventDefault();

    const updatedCharacter = {
      id: characterId,
      userId: character.userId,
      name: character.name,
      classId: character.classId,
      levelId: character.levelId,
      objectiveId: character.objectiveId,
      activeStatus: character.activeStatus,
    };
    console.log(updatedCharacter);

    editCharacter(updatedCharacter).then(() => {
      navigate(`/mycharacters`);
    });
  };

  return (
    <form className="character-form">
      <h2 className="character-form-title">Edit character</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            value={character.name ? character.name : ""}
            name="name"
            type="text"
            className="form-control"
            placeholder="Character name"
            onChange={(event) => {
              const characterCopy = { ...character };
              characterCopy.name = event.target.value;
              setCharacter(characterCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Class:</div>
          <select
            name="classId"
            value={character.classId}
            onChange={(event) => {
              const characterCopy = { ...character };
              characterCopy.classId = parseInt(event.target.value);
              setCharacter(characterCopy);
            }}
          >
            <option value={0}>Please select a class</option>
            {classes.map((clsObj) => {
              return (
                <option key={clsObj.id} value={clsObj.id}>
                  {clsObj.class}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Level:</div>
          <select
            name="levelId"
            value={character.levelId}
            checked
            onChange={(event) => {
              const characterCopy = { ...character };
              characterCopy.levelId = parseInt(event.target.value);
              setCharacter(characterCopy);
            }}
          >
            <option value={0}>Please select a level</option>
            {levels.map((lvlObj) => {
              return (
                <option key={lvlObj.id} value={lvlObj.id}>
                  {lvlObj.level}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Objective:</div>
          <select
            name="objectiveId"
            value={character.objectiveId}
            onChange={(event) => {
              const characterCopy = { ...character };
              characterCopy.objectiveId = parseInt(event.target.value);
              setCharacter(characterCopy);
            }}
          >
            <option value={0}>Please select an objective</option>
            {objectives.map((objObj) => {
              return (
                <option key={objObj.id} value={objObj.id}>
                  {objObj.objective}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <button className="btn" onClick={handleSave}>
        Save Edits
      </button>
    </form>
  );
};
