export const getAllCharacters = () => {
  return fetch(
    `http://localhost:8088/characters?_expand=class&_expand=level&_expand=objective`
  ).then((res) => res.json());
};

export const getCharacterById = (id) => {
  return fetch(`http://localhost:8088/characters?id=${id}`).then((res) =>
    res.json()
  );
};

export const getCharactersByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/characters?userId=${userId}&_expand=user&_expand=class&expand=level&_expand=objective`
  ).then((res) => res.json());
};

export const updateCharacterActiveStatus = (toggledCharacter) => {
  const payload = {
    id: toggledCharacter.id,
    userId: toggledCharacter.userId,
    name: toggledCharacter.name,
    classId: toggledCharacter.classId,
    levelId: toggledCharacter.levelId,
    objectiveId: toggledCharacter.objectiveId,
    activeStatus: toggledCharacter.activeStatus,
  };
  return fetch(`http://localhost:8088/characters/${toggledCharacter.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    return response.json();
  });
};

export const postCharacter = (character) => {
  return fetch(`http://localhost:8088/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  });
};

export const editCharacter = (character) => {
  const payload = {
    id: character.id,
    userId: character.userId,
    name: character.name,
    classId: character.classId,
    levelId: character.levelId,
    objectiveId: character.objectiveId,
    activeStatus: character.activeStatus,
  };
  return fetch(`http://localhost:8088/characters/${character.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    return response.json();
  });
};

export const deleteCharacter = (character) => {
  return fetch(`http://localhost:8088/characters/${character.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
  });
};
