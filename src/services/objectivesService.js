export const getObjectives = () => {
  return fetch(`http://localhost:8088/objectives`).then((res) => res.json());
};
