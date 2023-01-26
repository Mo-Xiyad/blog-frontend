import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/navbar";
import useAuthGuard from "./hooks/useAuthGuard";
import "./index.css";
import Blog from "./views/blog/index";
import NewBlogPost from "./views/new_post/index";

import { LOGGED_IN_USERS_DATA } from "./redux/actions";
import Login from "./views/auth/Login";
import SignUp from "./views/auth/Signup";
import Home from "./views/home";
import UpdateUserInfo from "./views/user/Update_profile";

function App(props) {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const accessToken = localStorage.getItem("access_token");
  const apiUrl = process.env.REACT_APP_BE_URL;

  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      let response = await fetch(`${apiUrl}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        let data = await response.json();
        // console.log("data", data);
        dispatch({ type: LOGGED_IN_USERS_DATA, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const __accessToken = !!accessToken && accessToken;
  useEffect(() => {
    getCurrentUser();
  }, [__accessToken]);

  const userTokens = useSelector((state) => state.tokens);
  const isLoggedIn = useSelector((state) => state.loggedInUser.isLoggedIn);

  const __userTokens = !!userTokens && userTokens.accessToken;
  useEffect(() => {
    console.log("Is this a logged in user?", isLoggedIn);
  }, [__userTokens]);

  return (
    <div className="w-screen h-screen bg-secondary dark:bg-gray-900">
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home {...props} />} />
        <Route path="/login" exact element={<Login {...props} />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/posts/:_id" exact element={<Blog />} />
        <Route path="/new" exact element={<NewBlogPost />} />
        <Route path="/update_user" exact element={<UpdateUserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
