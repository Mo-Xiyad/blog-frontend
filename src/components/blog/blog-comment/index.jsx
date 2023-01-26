import React, { useEffect, useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import useAuthGuard from "../../../hooks/useAuthGuard";
import DropDown from "../../shared/Dropdown";

const BlogComment = ({ id: postId }) => {
  useAuthGuard();
  const accessToken = localStorage.getItem("access_token");
  const [comments, setComments] = useState(null);

  const [posted, setPosted] = useState(false);
  const [comment, setComment] = useState({
    text: ""
  });

  const apiUrl = process.env.REACT_APP_BE_URL;

  const getComments = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}/comments`);

      if (response.ok) {
        let data = await response.json();
        setComments(data.reverse());
        setPosted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postComments = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        console.log("POSTED");
        setPosted(true);
        setComment({ text: "" });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commeId) => {
    console.log("delete");
    const response = await fetch(
      `${apiUrl}/posts/${postId}/comments/${commeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    if (response.ok) {
      console.log("DELETED");
      setPosted(true);
    }
  };

  const editComment = async (commeId) => {
    console.log("edit");
    // const response = await fetch(
    //   `${apiUrl}/posts/${postId}/comments/${commeId}`,
    //   {
    //      method: "PUT",
    //         body: formDataImg,
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`
    //         }
    //   }
    // );
    // if (response.ok) {
    //   console.log("EDITED");
    //   setPosted(true);
    // }
  };

  useEffect(() => {
    getComments();
  }, [posted]);

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <section className="backdrop-blur-sm bg-white/20 shadow-lg rounded-md dark:bg-gray-900 ">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => postComments(e)}
            action=""
            className="space-y-4"
          >
            <div>
              <label className="sr-only" htmlFor="comment">
                Comment
              </label>
              <textarea
                className="w-full rounded-lg border border-tertiary p-3 text-sm bg-slate-100"
                placeholder="What are your thoughts?"
                value={comment.text}
                onChange={(e) =>
                  setComment({ ...comment, text: e.target.value })
                }
                rows="4"
                id="comment"
              ></textarea>
            </div>
            <div className="flex justify-start">
              <button
                type="submit"
                className="inline-flex  bg-tertiary text-white py-2 px-4 rounded-lg shadow-lg shadow-gray-700"
              >
                <span className="font-medium"> Post comment </span>
              </button>
            </div>
          </form>
          {comments &&
            comments.map((comment, i) => (
              <article
                key={i}
                className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-500 mt-10 mx-10"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={
                          comment?.author?.avatar
                            ? comment?.author?.avatar
                            : "https://cdn0.iconfinder.com/data/icons/3d-web-isometric-vol-2/512/3d-web-isometric-vol-2/1000/Question_Mark.png"
                        }
                        alt="Michael Gough"
                      />
                      {comment?.author?.name}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-sm text-gray-600 dark:text-white">
                      <time
                        dateTime="2011-09-28"
                        pubdate="pubdate"
                        title="created at"
                      >
                        {formatDate(comment.createdAt)}
                      </time>
                    </p>
                    <DropDown
                      className="text-white"
                      deleteFunc={() => {
                        deleteComment(comment._id);
                      }}
                      editFunc={() => {
                        editComment(comment._id);
                      }}
                    />
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-white flex pl-8">
                  {comment.text}
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                  >
                    <BsHandThumbsUp
                      className="mr-1 w-4 h-4"
                      aria-hidden="true"
                      fill="currentColor"
                    />
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>
    </>
  );
};
export default BlogComment;
/*  */
