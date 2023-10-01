export const getAllUsers = () => {
  return fetch(`http://localhost:8088/users`).then((res) => res.json());
};

export const getUserByUserId = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) => res.json());
}