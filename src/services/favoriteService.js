export const getFavoritesByUserId = (userId) => {
  return fetch(`http://localhost:8088/favorites?userId=${userId}`).then((res) =>
    res.json()
  );
};

export const addCharacterToFavorites = (userId, characterId) => {
  const characterIdInt = parseInt(characterId);
  return fetch(`http://localhost:8088/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, characterId: characterIdInt }),
  });
};

export const deleteFavorite = (favoriteId) => {
  return fetch(`http://localhost:8088/favorites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
