import axios from "axios";
import React, { useState } from "react";
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const apiUrl = process.env.REACT_APP_BE_URL;
  const [success, setSuccess] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const subscribe = () => {
    axios
      .post(`${apiUrl}/subscribe`, { email: email })
      .then((response) => {
        setSuccess(true);
        setOpenAlert(true);
        setEmail("");
      })
      .catch((error) => {
        setSuccess(false);
        setOpenAlert(true);
        console.log(error);
      });
  };
  return (
    <div
      className="
      bg-secondary flex text-primary pb-5 bottom-0 left-0 right-0 dark:bg-gray-500 relative"
    >
      {success === true && openAlert === true && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute top-0 right-0 bottom-0 left-0 h-12 z-10"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            You have been subscribed to our newsletter.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setOpenAlert(false)}
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      {success === false && openAlert === true && (
        <div className="alert alert-error shadow-lg rounded absolute top-0 right-0 bottom-0 left-0 h-12 z-10">
          <div>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => setOpenAlert(false)}
                className="stroke-current flex-shrink-0 h-6 w-6 text-white"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>Close</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
            <span>Error! Task failed successfully.</span>
          </div>
        </div>
        // </div>
      )}
      <div className="container mx-auto">
        <div className="font-sans backdrop-blur-sm bg-white/20 dark:bg-white/60 shadow-lg rounded mt-8 p-4 md:pt-12 text-center">
          <h2 className="font-bold break-normal text-2xl md:text-4xl dark:text-tertiary">
            Subscribe to CodeCast
          </h2>
          <h3 className="font-normal break-normal text-gray-600 text-base md:text-xl pt-2 dark:text-primary">
            Get the latest posts delivered right to your inbox
          </h3>
          <div className="w-full text-center justify-center pt-4">
            <div className="max-w-sm mx-auto p-1 pr-0 flex flex-wrap items-center">
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="youremail@example.com"
                className="flex-1 appearance-none rounded shadow p-3 text-gray-600 bg-white mr-2 focus:outline-none"
              />
              <button
                onClick={subscribe}
                className="flex-1 md:mt-0 block md:inline-block appearance-none bg-tertiary text-white text-base font-semibold tracking-wider uppercase py-3 rounded shadow hover:bg-primary"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex text-xs justify-end pt-8">{`${new Date().getFullYear()} - © CodeCast Blog `}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
