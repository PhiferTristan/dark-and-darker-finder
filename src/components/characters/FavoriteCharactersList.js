import { useEffect, useState } from "react";
import { getFavoritesByUserId } from "../../services/favoriteService";
import { getAllCharacters } from "../../services/charactersService";
import { FavoriteCharacter } from "./FavoriteCharacter";
import { getClasses } from "../../services/classesService.js";
import { getLevels } from "../../services/levelsService.js";
import { getAllUsers } from "../../services/usersService";

export const FavoriteCharactersList = ({ userId }) => {
  const [userFavoriteCharacterIds, setUserFavoriteCharacterIds] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getFavoritesByUserId(userId).then((favorites) => {
      const favoriteIds = favorites.map((favorite) => favorite.characterId);
      setUserFavoriteCharacterIds(favoriteIds);
    });
  }, [userId]);

  useEffect(() => {
    getAllCharacters().then((characters) => {
      const userFavorites = characters.filter((character) =>
        userFavoriteCharacterIds.includes(character.id)
      );
      setFavoriteCharacters(userFavorites);
    });
  }, [userFavoriteCharacterIds]);

  useEffect(() => {
    getClasses().then((classesArray) => {
      setClasses(classesArray);
    });

    getLevels().then((levelsArray) => {
      setLevels(levelsArray);
    });

    getAllUsers().then((usersArray) => {
      setAllUsers(usersArray);
    });
  }, []);

  return (
    <div className="favorite-characters-container">
      <h2>Favorite Characters:</h2>
      <article className="favorites">
        {favoriteCharacters.map((character) => (
          <FavoriteCharacter
            character={character}
            key={character.id}
            classes={classes}
            levels={levels}
            allUsers={allUsers}
          />
        ))}
      </article>
    </div>
  );
};
