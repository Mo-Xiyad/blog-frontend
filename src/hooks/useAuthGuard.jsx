import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkLoggedInUser } from "../redux/actions";
function useAuthGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    async function checkAuth() {
      const apiUrl = process.env.REACT_APP_BE_URL;
      try {
        // these google tokens are used to authenticate the user with google
        const acc = params.get("accessToken");
        const ref = params.get("refreshToken");
        // if the local storage is empty, check if there are tokens in the url and if it is the case set them in the local storage
        if (!localStorage.getItem("access_token") && acc && ref) {
          localStorage.setItem("access_token", acc);
          localStorage.setItem("refresh_token", ref);
        }

        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (!accessToken || !refreshToken) {
          setIsLoading(false);
          return;
        }

        const { data } = await axios.post(`${apiUrl}/users/verifyToken`, {
          access_token: removeQuotes(accessToken),
          refresh_token: removeQuotes(refreshToken)
        });
        if (data.isValid) {
          setIsAuthenticated(true);
          dispatch(checkLoggedInUser(true));
          setIsLoading(false);
        } else {
          const response = await axios.post(`${apiUrl}/users/refreshToken`, {
            refresh_token: removeQuotes(refreshToken) // remove quotes from string
          });
          if (response.status === 200) {
            const { data } = response;
            localStorage.setItem("access_token", data.accessToken);
            localStorage.setItem("refresh_token", data.refreshToken);
            setIsAuthenticated(true);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
}

export default useAuthGuard;
function removeQuotes(str) {
  if (str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, str.length - 1);
  }
  return str;
}
