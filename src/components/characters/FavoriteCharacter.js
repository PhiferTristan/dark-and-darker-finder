import { Link } from "react-router-dom";

export const FavoriteCharacter = ({ character, classes, levels, allUsers }) => {
  const characterClass = classes.find((cls) => cls.id === character.classId);
  const characterLevel = levels.find((lvl) => lvl.id === character.levelId);
  const characterUser = allUsers.find((usr) => usr.id === character.userId);

  return (
    <section key={character.id} className="character">
      {/* <div className="character-info">#{character.id}</div> */}
      <Link to={`/mycharacters/${character.id}`}>
        <div className="character-name">{character.name}</div>
      </Link>
      <div className="username">User: {characterUser?.username}</div>
      <div className="character-class">{characterClass?.class}</div>
      <div className="character-level">Level: {characterLevel?.level}</div>
      <button
        className="btn-unfavorite-character"
        // onClick={() => onUnfavoriteClick(character.id)}
      >
        Unfavorite?
      </button>
      <div className="character-active-status">
        {character.activeStatus ? "Active" : "Not Active"}
      </div>
    </section>
  );
};
