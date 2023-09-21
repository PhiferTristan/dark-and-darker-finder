import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClasses } from "../../services/classesService";
import { getLevels } from "../../services/levelsService";
import { getObjectives } from "../../services/objectivesService";
import { postCharacter } from "../../services/charactersService";

export const CreateCharacterForm = ({ userId }) => {
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [newCharacter, setNewCharacter] = useState({
    id: 0,
    userId: 0,
    name: "",
    classId: 0,
    levelId: 0,
    objectiveId: 0,
    activeStatus: false,
  });

  const navigate = useNavigate();

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
  }, [userId]);

  const handleInputChange = (event) => {
    const characterCopy = { ...newCharacter };
    characterCopy[event.target.name] = event.target.value;
    setNewCharacter(characterCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newCharItem = {
      userId: userId,
      name: newCharacter.name,
      classId: parseInt(newCharacter.classId),
      levelId: parseInt(newCharacter.levelId),
      objectiveId: parseInt(newCharacter.objectiveId),
      activeStatus: newCharacter.activeStatus,
    };

    postCharacter(newCharItem).then(() => {
      navigate("/mycharacters");
    });
  };

  return (
    <form className="character-form">
      <h2 className="character-form-title">
        Add a character to your character list
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            value={newCharacter.name}
            name="name"
            type="text"
            className="form-control"
            placeholder="Character name"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <div>Class:</div>
          <select
            name="classId"
            value={newCharacter.classId}
            onChange={handleInputChange}
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
            value={newCharacter.levelId}
            onChange={handleInputChange}
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
            value={newCharacter.objectiveId}
            onChange={handleInputChange}
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
        Create Character
      </button>
    </form>
  );
};
