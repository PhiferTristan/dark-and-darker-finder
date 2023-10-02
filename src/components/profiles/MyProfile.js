import { useEffect, useState } from "react";
import { getUserByUserId } from "../../services/usersService";
import "./Profiles.css"

export const MyProfile = ({ userId }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserByUserId(userId).then((userObj) => {
        setUser(userObj);
      });
    }
  }, [userId]);

  return (
    <>
      <h2 className="profile-header">My Profile</h2>
      <div className="my-profile-container">
      <div className="user-info">Username:</div>
      <p className="p-info">{user.username}</p>
      <div className="user-info">Blacksmith Account Name: </div>
      <p className="p-info">{user.blacksmithAccountName}</p>
      <div className="user-info">Email Address: </div>
      <p className="p-info">{user.email}</p>
      <div className="user-info">Discord Username: {user.discordUsername}</div>
      <p className="p-info">{user.discordUsername}</p>
      </div>
    </>
  );
};
