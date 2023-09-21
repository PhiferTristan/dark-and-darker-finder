export const getAllUsers = () => {
  return fetch(`http://localhost:8088/users`).then((res) =>
    res.json()
  );
};


// export const getAllUsers = () => {
//   return fetch(`http://localhost:8088/users?_embed=favorites`).then((res) =>
//     res.json()
//   );
// };
