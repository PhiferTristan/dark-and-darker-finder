import { Route, Outlet, Routes } from "react-router-dom";
import { NavBar } from "../components/navigation/NavBar";
import { LFGCharacterList } from "../components/characters/LFGCharacterList";
import { FavoriteCharactersList } from "../components/characters/FavoriteCharactersList";
import { MyCharacterList } from "../components/characters/MyCharacterList";
import { MyProfile } from "../components/profiles/MyProfile";
import { CharacterDetails } from "../components/characters/CharacterDetails";
import { useEffect, useState } from "react";
import { CreateCharacterForm } from "../components/forms/CreateCharacterForm";
import { EditCharacter } from "../components/forms/EditCharacter";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localDadUser = localStorage.getItem("dad_user");
    const dadUserObject = JSON.parse(localDadUser);

    setCurrentUser(dadUserObject);
  }, []);

  const userId = currentUser.id;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<LFGCharacterList />} />
        <Route path="hub" element={<LFGCharacterList />} />
        <Route
          path="favorites"
          element={<FavoriteCharactersList userId={userId} />}
        />
        <Route path="profile" element={<MyProfile />} />
        <Route path="mycharacters">
          <Route index element={<MyCharacterList userId={userId} />} />
          <Route path=":characterId" element={<CharacterDetails />} />
          <Route
            path="newcharacter"
            element={<CreateCharacterForm userId={userId} />}
          />
          <Route path=":characterId/edit" element={<EditCharacter />} />
        </Route>
      </Route>
    </Routes>
  );
};
