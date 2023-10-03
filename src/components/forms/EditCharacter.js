import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClasses } from "../../services/classesService";
import { getLevels } from "../../services/levelsService";
import { getObjectives } from "../../services/objectivesService";
import {
  editCharacter,
  getCharacterById,
} from "../../services/charactersService";
import "./Form.css"


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

  const handleSaveClick = (event) => {
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

    const confirmed = window.confirm(
      "Are you sure you want to save these changes?"
    );

    if (confirmed) {
      editCharacter(updatedCharacter).then(() => {
        navigate(`/mycharacters`);
      });
    }
  };

  return (
    <>
    <div className="form-container">
    <form className="character-form">
      <h2 className="form-header">Edit character</h2>
      <div className="fields-container">
      <fieldset className="field-container">
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
      <fieldset className="field-container">
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
      <fieldset className="field-container">
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
      <fieldset className="field-container">
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
      <button className="save-btn" onClick={handleSaveClick}>
        Save Edits
      </button>
      </div>
    </form>
    </div>
    </>
  );
};
