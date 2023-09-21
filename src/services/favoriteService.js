export const getFavoritesByUserId = (userId) => {
  return fetch(`http://localhost:8088/favorites?userId=${userId}`).then(
    (res) => res.json()
  );
};
