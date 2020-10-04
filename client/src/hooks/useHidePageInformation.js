// If user is not logged in they will be redirected to the login page. This act as a validation to hide webpages from users who have not signed up.
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function useHidePageInformation() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });
}
