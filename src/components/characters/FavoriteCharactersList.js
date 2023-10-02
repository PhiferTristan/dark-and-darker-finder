import { useEffect, useState } from "react";
import { getFavoritesByUserId } from "../../services/favoriteService";
import { getAllCharacters } from "../../services/charactersService";
import { FavoriteCharacter } from "./FavoriteCharacter";
import { getClasses } from "../../services/classesService.js";
import { getLevels } from "../../services/levelsService.js";
import { getAllUsers } from "../../services/usersService";

export const FavoriteCharactersList = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [userFavoriteCharacterIds, setUserFavoriteCharacterIds] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getFavoritesByUserId(userId).then((favoritesData) => {
      setFavorites(favoritesData);
      const favoriteIds = favoritesData.map((favorite) => favorite.characterId);
      setUserFavoriteCharacterIds(favoriteIds);
    });
  }, [userId]);

  const fetchFavoritesByUserId = () => {
    getFavoritesByUserId(userId).then((favoritesData) => {
      const favoriteIds = favoritesData.map((favorite) => favorite.characterId);
      setUserFavoriteCharacterIds(favoriteIds);
    });
  };

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
    <>
    <body className="favorite-list-body">
    <div className="favorite-characters-container">
      <h2 className="favorite-list-header">Favorite Characters:</h2>
      <article className="characters">
        {favoriteCharacters.map((character) => (
          <FavoriteCharacter
            character={character}
            key={character.id}
            classes={classes}
            levels={levels}
            allUsers={allUsers}
            favorites={favorites}
            fetchFavoritesByUserId={fetchFavoritesByUserId}
          />
        ))}
      </article>
    </div>
    </body>
    </>
  );
};
