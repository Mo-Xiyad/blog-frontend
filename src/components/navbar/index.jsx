import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
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

  return (
    <>
      {isLoggedIn ? (
        <div className="navbar backdrop-blur-sm bg-white/30 flex fixed top-0 left-0 right-0 z-10">
          <div className="navbar-start md:hidden">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle text-primary border-none hover:rounded-full hover:bg-gray-500  hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/new"}>Create post</Link>
                </li>
                <li>
                  <Link to="/update_user">Update profile</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center md:navbar-start">
            <Link
              to="/"
              className="btn btn-ghost normal-case inline-flex items-center justify-center flex-shrink-0 text-primary mr-6"
            >
              <img
                className="fill-current h-10 w-10 mr-2"
                alt="logo"
                src={logo}
              />
              <span className="font-semibold text-xl tracking-tight">
                CodeCast
              </span>
            </Link>
          </div>
          <div className="navbar-end">
            <Link
              className="hidden md:inline py-1 px-4 text-primary border-none hover:bg-gray-500  hover:text-primary rounded"
              to={"/new"}
            >
              Update profile
            </Link>
            <Link
              className="hidden md:inline py-1 px-4 text-primary border-none hover:bg-gray-500  hover:text-primary rounded"
              to={"/new"}
            >
              Create post
            </Link>
            <Link
              onClick={() => {
                dispatch(checkLoggedInUser(false));
                logOut();
              }}
              className="inline-block text-primary border-none hover:rounded-full p-4 hover:bg-gray-500  hover:text-white rounded"
            >
              <AiOutlineLogout />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default NavBar;
