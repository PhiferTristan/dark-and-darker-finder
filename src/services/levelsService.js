export const getLevels = () => {
  return fetch(`http://localhost:8088/levels`).then((res) => res.json());
};
