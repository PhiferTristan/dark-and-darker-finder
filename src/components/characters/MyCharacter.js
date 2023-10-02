import { useNavigate } from "react-router-dom";
import {
  deleteCharacter,
  updateCharacterActiveStatus,
} from "../../services/charactersService";
import { useEffect, useState } from "react";

export const MyCharacter = ({
  character,
  classes,
  levels,
  fetchCharactersByUserId,
}) => {
  const [toggledCharacter, setToggledCharacter] = useState({});

  const toggleCharacterActiveStatus = (character) => {
    const newActiveStatus = !character.activeStatus;
    updateCharacterActiveStatus({
      ...character,
      activeStatus: newActiveStatus,
    }).then(() => {
      character.activeStatus = newActiveStatus;
      setToggledCharacter(character);
      fetchCharactersByUserId();
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setToggledCharacter(character);
  }, [character]);

  const deleteClick = (character) => {
    const confirmed = window.confirm(
      "Are you positive you want to delete this character?"
    );
    if (confirmed) {
      deleteCharacter(character).then(() => {
        fetchCharactersByUserId();
      });
    }
  };

  const characterClass = classes.find((cls) => cls.id === character.classId);
  const characterLevel = levels.find((lvl) => lvl.id === character.levelId);
  return (
    <section key={character.id} className="my-character-listing">
      <div
        onClick={() => {
          navigate(`/mycharacters/${character.id}`);
        }}
        className="character-info-button"
      >
        {character.name}
      </div>
      <div className="btn-toggle-character-active-status">
        <button onClick={() => toggleCharacterActiveStatus(character)}>
          Toggle Active Status
        </button>
      </div>
      <div
        className={`character-active-status ${
          character.activeStatus
            ? "active-status-active"
            : "active-status-inactive"
        }`}
      >
        {character.activeStatus ? "Active" : "Not Active"}
      </div>
      <div className="character-info">{characterClass?.class}</div>
      <div className="character-info">Level: {characterLevel?.level}</div>
      <button
        onClick={() => {
          navigate(`/mycharacters/${character.id}/edit`);
        }}
        className="btn-edit-char"
      >
        Edit Character?
      </button>
      <button
        className="btn-delete-char"
        onClick={() => deleteClick(character)}
      >
        Delete Character?
      </button>
    </section>
  );
};
