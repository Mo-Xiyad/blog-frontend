import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { checkLoggedInUser } from "../../redux/actions";
const NavBar = (props) => {
  const isLoggedIn = useSelector((state) => state.loggedInUser.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      localStorage.removeItem("access_token");
      window.localStorage.clear();
      dispatch(checkLoggedInUser(false));
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const apiUrl = process.env.REACT_APP_BE_URL;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="mx-auto flex p-4 fixed top-0 left-0 right-0 z-10 items-center justify-between backdrop-blur-sm bg-white/30 px-5 py-3">
      <Link
        to="/"
        className="inline-flex items-center justify-center flex-shrink-0 text-primary mr-6"
      >
        <img className="fill-current h-10 w-10 mr-2" alt="logo" src={logo} />
        <span className="font-semibold text-xl tracking-tight">CodeCast</span>
      </Link>
      {/*  */}
      <div className="full flex-grow flex lg:items-center lg:w-auto justify-start md:hidden">
        <button
          className="text-primary focus:outline-none "
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 5h16M4 12h16M4 19h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } nav-links ml-4 text-base font-medium`}
        >
          <ul className="relative z-10 list-none rounded-md backdrop-blur-sm bg-white/30 shadow-md">
            <li className="py-2 px-4">
              <Link
                to="/update_user"
                className="block text-primary hover:text-tertiary"
              >
                profile
              </Link>
            </li>
            <li className="py-2 px-4">
              <Link className="block text-primary hover:text-tertiary">
                Topics
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full  flex-grow flex lg:items-center lg:w-auto justify-end">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/update_user"
            className="md:inline-block hidden lg:mt-0 text-primary hover:text-white mr-4"
          >
            update profile
          </Link>
          <Link
            // href={}
            className="md:inline-block hidden lg:mt-0 text-primary hover:text-white mr-4"
          >
            Topics
          </Link>
          <Link
            to={"/new"}
            // to={`${apiUrl}/posts/downloadCSV-authos`}
            className="inline-block lg:hidden lg:mt-0 text-white bg-tertiary hover:bg-white hover:text-primary border-2  rounded px-2 py-1"
          >
            Create post
          </Link>
          <Link
            onClick={() => {
              dispatch(checkLoggedInUser(false));
              logOut();
            }}
            className="inline-block lg:hidden lg:mt-0 text-white bg-tertiary hover:bg-white hover:text-primary border-2  rounded px-2 py-1"
          >
            Log out
          </Link>
        </div>
        {isLoggedIn ? (
          <div className=" items-center gap-2 text-sm hidden lg:block">
            <Link
              to={"/new"}
              // to={`${apiUrl}/posts/downloadCSV-authos`}
              className="text-sm px-4 mr-4 py-2 leading-none border rounded text-white border-spacing-0 bg-tertiary hover:border-transparent hover:text-primary hover:bg-white mt-4 lg:mt-0"
            >
              Create post
            </Link>
            <Link
              onClick={() => {
                dispatch(checkLoggedInUser(false));
                logOut();
              }}
              className=" text-sm px-4 py-2 leading-none border rounded text-white border-spacing-0 bg-tertiary hover:border-transparent hover:text-primary hover:bg-white mt-4 lg:mt-0"
            >
              Log out
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
export default NavBar;
