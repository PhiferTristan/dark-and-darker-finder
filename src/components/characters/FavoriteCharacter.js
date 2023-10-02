import { Link, useNavigate } from "react-router-dom";
import { deleteFavorite } from "../../services/favoriteService";

export const FavoriteCharacter = ({
  character,
  classes,
  levels,
  allUsers,
  favorites,
}) => {
  const characterClass = classes?.find((cls) => cls.id === character.classId);
  const characterLevel = levels?.find((lvl) => lvl.id === character.levelId);
  const characterUser = allUsers?.find((usr) => usr.id === character.userId);

  const favorite = favorites.find((fav) => fav.characterId === character.id);

  const navigate = useNavigate();

  const handleUnfavoriteClick = (favoriteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to unfavorite this character?"
    );

    if (confirmed) {
      deleteFavorite(favoriteId);
      navigate(0);
    }
  };

  return (
    <section key={character.id} className="favorite-character-listing">
      {/* <div className="character-info">#{character.id}</div> */}
      <Link to={`/otherscharacters/${character.userId}/${character.id}`}>
        <div className="character-info-button">{character.name}</div>
      </Link>
      <Link to={`/otherscharacters/${character.userId}`}>
        <div className="character-info">User: {characterUser?.username}</div>
      </Link>
      <div className="character-info">{characterClass?.class}</div>
      <div className="character-info">Level: {characterLevel?.level}</div>
      <button
        className="btn-unfavorite-character"
        onClick={() => handleUnfavoriteClick(favorite.id)}
      >
        Unfavorite?
      </button>
      <div
        className={`character-active-status ${
          character.activeStatus
            ? "active-status-active"
            : "active-status-inactive"
        }`}
      >
        {character.activeStatus ? "Active" : "Not Active"}
      </div>
    </section>
  );
};
