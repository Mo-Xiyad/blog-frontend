import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function isTokenExpired(token) {
  // Get the current time
  let currentTime = Math.floor(Date.now() / 1000);

  // Decode the token to get the payload
  let payload = JSON.parse(
    CryptoJS.enc.Base64.parse(token.split(".")[1]).toString(CryptoJS.enc.Utf8)
  );

  // Check if the expiry time in the payload is less than the current time
  return payload.exp < currentTime;
}

function getNewTokens(refreshToken) {
  // Make a request to the server with the refresh token
  fetch("/token/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      refreshToken: refreshToken
    })
  })
    .then((response) => response.json())
    .then((data) => {
      // return the tokens
      return data;
    })
    .catch((error) => console.log(error));
}

function useAuthGuard() {
  let navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    handleTokenExpiration(accessToken, refreshToken);
  }, [navigate]);
}

function handleTokenExpiration(accessToken, refreshToken) {
  let navigate = useNavigate();
  if (!accessToken || isTokenExpired(accessToken)) {
    if (isTokenExpired(refreshToken)) {
      // Refresh token is expired, redirect to login page
      navigate("/login");
    } else {
      // Try to get new tokens
      getNewTokens(refreshToken)
        .then((data) => {
          // Save the new access and refresh tokens
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
        })
        .catch((error) => {
          // Refresh token request failed, redirect to login page
          navigate("/login");
        });
    }
  }
}

const __useAuthGuard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const accessToken =
      localStorage.getItem("TOKENS") || params.get("accessToken");
    const refreshToken = params.get("refreshToken"); // getting the tokens from the url

    if (!accessToken) {
      navigate("/login");
    } else if (params.get("accessToken")) {
      let accessToken = params.get("accessToken");

      dispatch(setTokens({ accessToken, refreshToken })); // adding tokens to the redux store

      localStorage.setItem(
        "TOKENS",
        JSON.stringify({ accessToken, refreshToken })
      );
      navigate("/");
    }
  }, []);
};
export default useAuthGuard;
