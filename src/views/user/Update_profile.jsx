import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function UpdateUserInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    avatar: null
  });
  const apiUrl = process.env.REACT_APP_BE_URL;
  const accessToken = localStorage.getItem("access_token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // create form data object
      const data = new FormData();
      data.append("name", formData.name);
      data.append("avatar", formData.avatar);

      // Send request to update user
      const res = await axios.put(`${apiUrl}/users/me`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.status === 200) {
        console.log("user updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex justify-center items-center h-screen text-primary">
      <form
        className="backdrop-blur-sm bg-white/30 p-6 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block  font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="border bg-white border-gray-400 p-2 rounded-lg w-full"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2" htmlFor="profile-pic">
            Profile Picture
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="file"
            id="profile-pic"
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.files[0] })
            }
          />
        </div>

        <button className="flex w-full justify-center rounded-md border border-transparent bg-tertiary py-2 px-4 text-sm font-medium text-white hover:bg-primary focus:outline-none">
          Update
        </button>
      </form>
    </div>
  );
}
export default UpdateUserInfo;
