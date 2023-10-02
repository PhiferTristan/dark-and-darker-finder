import { useEffect, useState } from "react";
import { getUserByUserId } from "../../services/usersService";

export const OthersProfile = ({userId}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUserByUserId(userId).then((userObj) => {
            setUser(userObj)
        })
    }, [])

    return <div></div>;
  };
  