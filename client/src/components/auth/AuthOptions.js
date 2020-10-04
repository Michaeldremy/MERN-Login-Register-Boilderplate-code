import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  // useHistory interacts with the url is it also considered an array
  const history = useHistory();

  // Here we are pushing two routes in the history variable from above
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  
  // Upon logout we are setting the token and user to undefined and then setting localStorage back to an empty string
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "")
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}
