import { Link } from "react-router-dom";

export const OthersCharacter = ({ character, classes, levels, allUsers }) => {
  const characterClass = classes.find((cls) => cls.id === character.classId);
  const characterLevel = levels.find((lvl) => lvl.id === character.levelId);
  const characterUser = allUsers.find((usr) => usr.id === character.userId);

  return (
    <section key={character.id} className="others-character-listing">
      {/* <div className="character-info">#{character.id}</div> */}
      <Link to={`/otherscharacters/${character.userId}/${character.id}`}>
        <div className="character-info">{character.name}</div>
      </Link>
      <div className="character-info">Class: {characterClass?.class}</div>
      <div className="character-info">Level: {characterLevel?.level}</div>
      <div className={`character-active-status ${character.activeStatus ? 'active-status-active' : 'active-status-inactive'}`}>
        {character.activeStatus ? "Active" : "Not Active"}
      </div>
    </section>
  );
};
