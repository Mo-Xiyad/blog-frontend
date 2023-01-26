import axios from "axios";
import React, { useState } from "react";
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const apiUrl = process.env.REACT_APP_BE_URL;
  const subscribe = () => {
    axios
      .post(`${apiUrl}/subscribe`, { email: email })
      .then((response) => {
        setEmail("");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };
  return (
    <div
      className="
      bg-secondary flex text-primary pb-5 bottom-0 left-0 right-0 dark:bg-gray-500"
    >
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
                className="flex-1 appearance-none rounded shadow p-3 text-gray-600 mr-2 focus:outline-none"
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
