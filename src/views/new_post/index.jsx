import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../../hooks/useAuthGuard";
import "./post_styles.scss";
const NewBlogPost = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const navigate = useNavigate();

  if (!isLoading && isAuthenticated === false) {
    window.localStorage.clear();
    navigate("/login");
  }

  const user = useSelector((state) => {
    return state.loggedInUser.user;
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const [formData, setFormData] = useState({
    category: "ARTICLE CATEGORY",
    title: "",
    cover: "ARTICLE COVER (IMAGE LINK)",
    readTime: {
      value: "",
      unit: "minute"
    },
    author: user && user._id,
    content: ""
  });

  const [postImg, setPostImg] = useState(null);
  const apiUrl = process.env.REACT_APP_BE_URL;
  const postBlogData = async (e) => {
    const accessToken = localStorage.getItem("access_token");
    e.preventDefault();
    try {
      if (!canSubmit) {
        alert(
          "You may need to add a title and content to your post. consider adding more than 50 characters to your content."
        );
        return;
      }
      let response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        let data = await response.json();
        // upload image
        try {
          let formDataImg = new FormData();
          formDataImg.append("cover", postImg);
          const res = await fetch(`${apiUrl}/posts/${data._id}/uploadImage`, {
            method: "PUT",
            body: formDataImg,
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          if (res.ok) {
            console.log("img post success");
            navigate("/");
          } else {
            console.log("img post upload failed", res);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formData.title.length > 5 && formData.content.length > 50) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

  const toolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "code-block"],
    ["clean"]
  ];

  return (
    <div className="bg-secondary dark:bg-gray-900 ">
      <div className="pt-16">
        <h1 className="text-5xl font-bold text-center pt-16 pb-10 shadow dark:shadow-white">
          <span className="text-primary dark:text-white">New Blog Post</span>
        </h1>
        {/* create the form */}
        <div className="flex flex-col items-center pt-10 rounded ">
          <form
            onSubmit={(event) => {
              postBlogData(event);
            }}
            method="POST"
            className="w-full max-w-xs md:max-w-3xl sm:max-w-lg backdrop-blur-sm bg-primary/30 dark:bg-secondary rounded px-6"
          >
            <div className="m-5 mb-6">
              <div className="">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-title"
                >
                  Title
                </label>
                {formData.title.length > 100 && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a title shorter than 50 characters.
                  </p>
                )}
                <input
                  className="text-primary appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-title"
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <ReactQuill
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({ ...formData, content: value })
                  }
                  modules={{
                    toolbar: toolbar,
                    clipboard: {
                      matchVisual: false
                    }
                  }}
                  placeholder="Share with others..."
                  className="quill-editor text-primary border-gray-200 rounded leading-tight focus:outline-none focus:bg-transparen bg-gray-200"
                />

                <label className="block py-5">
                  <span className="text-xs text-primary font-light">
                    Add a cover image
                  </span>
                  <input
                    type="file"
                    onChange={(e) => {
                      setPostImg(e.target.files[0]);
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>

                <div className="flex items-center justify-start">
                  {/* disable if the form is not filed  */}
                  <button
                    className="bg-tertiary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    type="submit"
                  >
                    Post
                  </button>
                  <button
                    className="bg-slate-500 hover:bg-red-300 hover:text-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlogPost;
