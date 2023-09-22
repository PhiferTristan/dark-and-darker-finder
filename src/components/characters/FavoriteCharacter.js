import { Link, useNavigate } from "react-router-dom";
import { deleteFavorite } from "../../services/favoriteService";

export const FavoriteCharacter = ({
  character,
  classes,
  levels,
  allUsers,
  favorites,
  fetchFavoritesByUserId,
}) => {
  const characterClass = classes?.find((cls) => cls.id === character.classId);
  const characterLevel = levels?.find((lvl) => lvl.id === character.levelId);
  const characterUser = allUsers?.find((usr) => usr.id === character.userId);

  const favorite = favorites.find((fav) => fav.characterId === character.id);

  const navigate = useNavigate();

  const handleUnfavoriteClick = (favoriteId) => {
  deleteFavorite(favoriteId);
  navigate(0);
  console.log(favoriteId);
  };

  return (
    <section key={character.id} className="character">
      {/* <div className="character-info">#{character.id}</div> */}
      <Link to={`/otherscharacters/${character.userId}/${character.id}`}>
        <div className="character-name">{character.name}</div>
      </Link>
      <Link to={`/otherscharacters/${character.userId}`}>
        <div className="username">User: {characterUser?.username}</div>
      </Link>
      <div className="character-class">{characterClass?.class}</div>
      <div className="character-level">Level: {characterLevel?.level}</div>
      <button
        className="btn-unfavorite-character"
        onClick={() => handleUnfavoriteClick(favorite.id)}
      >
        Unfavorite?
      </button>
      <div className="character-active-status">
        {character.activeStatus ? "Active" : "Not Active"}
      </div>
    </section>
  );
};
