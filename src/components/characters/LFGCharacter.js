import { Link } from "react-router-dom";

export const LFGCharacter = ({ character, classes, levels, allUsers }) => {
  const characterClass = classes.find((cls) => cls.id === character.classId);
  const characterLevel = levels.find((lvl) => lvl.id === character.levelId);
  const characterUser = allUsers.find((usr) => usr.id === character.userId);

  const localDadUser = localStorage.getItem("dad_user");
  const dadUserObject = JSON.parse(localDadUser);
  const userId = dadUserObject.id;

  const destinationURL =
    character.userId === userId
      ? `/mycharacters/${character.id}`
      : `/otherscharacters/${character.userId}/${character.id}`;

  return (
    <section key={character.id} className="character">
      <div className="character-info">#{character.id}</div>
      <Link to={destinationURL}>
        <div className="character-name">{character.name}</div>
      </Link>
      <Link to={`/otherscharacters/${character.userId}`}>
        <div className="username">User: {characterUser?.username}</div>
      </Link>
      <div className="character-class">Class: {characterClass?.class}</div>
      <div className="character-level">Level: {characterLevel?.level}</div>
      <div className="character-active-status">
        {character.activeStatus ? "Active" : "Not Active"}
      </div>
    </section>
  );
};
