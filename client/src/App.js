import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import "./App.css";

import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layout/Header";
import UserContext from "./context/UserContext";

function App() {
  // State variable to send to multiple components
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token"); // grabbing JWT token from localStorage
      if (token === null) {
        // if there is no token we then set the localStorage key to auth-token and the value of token to an empty string. This avoids any errors
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // Here we are calling to our backend to make sure our JWT Response is valid
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null, // body is set to null
        { headers: { "x-auth-token": token } }
      );
      // if there is token response data then we will grab that user and then setUserData to hold the token information and the user response data
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    // We have to call on our function within a useEffect to make our function async / await
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* UserContext.Provider is Context API similiar to Redux. We are wrapping the components that we want to share state with. */}
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <div className="container">
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </div>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
