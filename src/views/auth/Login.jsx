import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import login from "../../assets/login.webp";
import TextInputField from "../../components/shared/TextInputField";
import useAuthGuard from "../../hooks/useAuthGuard";
import { checkLoggedInUser } from "../../redux/actions";
import "./styles.css";

const Login = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const data = await response.json();
        window.localStorage.clear();
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        dispatch(checkLoggedInUser(true));
        navigate("/");

        return data;
      } else {
        console.log(`Ooops we got an error while Login`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="space-y-8 backdrop-blur-sm bg-white/30 p-10 rounded-lg shadow-lg">
        <div>
          <img className="mx-auto h-12 w-auto" src={login} alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium hover:text-tertiary text-primary"
            >
              Create a new account
            </Link>
          </p>
        </div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md">
            <TextInputField
              id="email-address"
              name="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              type="email"
              autoComplete="email"
              required={true}
              placeholder="Email address"
            />
            <div>
              <TextInputField
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                autoComplete="current-password"
                required={true}
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-tertiary py-2 px-4 text-sm font-medium text-white hover:bg-primary focus:outline-none "
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-center">
            <p className="ml-2 block text-sm text-primary">Or continue with </p>
          </div>

          <div className="flex items-center justify-center">
            <a
              href="http://localhost:3001/users/googleLogin"
              className="flex items-center border rounded-md p-4 border-secondary bg-secondary shadow-md"
            >
              <FcGoogle className="text-3xl" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
