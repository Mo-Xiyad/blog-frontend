import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../../assets/user-icon.webp";
import useAuthGuard from "../../../hooks/useAuthGuard";
import DropDown from "../../shared/Dropdown";
const BlogList = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  if (!isLoading && isAuthenticated === false) {
    window.localStorage.clear();
    navigate("/login");
  }

  const [posts, setPost] = useState(null);
  const [newData, setNewData] = useState(false);

  const { _id: currentUserId } = useSelector(
    (state) => state.loggedInUser.user
  );

  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${apiUrl}/posts/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
        setNewData(true);
      } else if (response.status === 401) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    console.log(postId);
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        console.log("DELETED");
        setNewData(!newData);
      } else if (response.status === 401) {
        // fetch refresh token
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [newData]);
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div
            key={post?._id}
            className="bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-4 mx-2"
          >
            {post.author?._id === currentUserId && (
              <div className="flex justify-end">
                <DropDown
                  className={"dark:text-primary"}
                  deleteFunc={() => {
                    deletePost(post?._id);
                  }}
                  editComment={() => {}}
                />
              </div>
            )}
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="justify-between sm:flex">
              <Link to={`/posts/${post?._id}`}>
                <h3
                  className="first-line:uppercase first-line:tracking-widest text-primary
  first-letter:text-7xl first-letter:font-bold
  first-letter:mr-3 first-letter:float-left"
                >
                  {shortenText(post?.title, 0, 100)}
                </h3>
                <div className="mt-4 block">
                  <p className=" text-xs font-medium text-gray-600">
                    By {post?.author?.name}{" "}
                  </p>
                </div>
              </Link>

              <div className="ml-3 hidden flex-shrink-0 sm:block">
                <img
                  alt="Author image"
                  src={post.author?.avatar ? post?.author?.avatar : userIcon}
                  className="h-16 w-16 rounded-lg object-cover shadow-sm"
                />
              </div>
            </div>

            <div className="mt-4 sm:pr-8">
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: shortenText(post?.content, 0, 200)
                }}
              ></div>
            </div>

            <dl className="mt-6 flex">
              <div className="flex flex-col-reverse">
                <dt className="text-sm font-medium text-gray-600">Published</dt>
                <dd className="text-xs text-gray-500">
                  {formatDate(post?.updatedAt)}
                </dd>
              </div>

              <div className="ml-3 flex flex-col-reverse sm:ml-6">
                <dt className="text-sm font-medium text-gray-600">
                  Reading time
                </dt>
                <dd className="text-xs text-gray-500">
                  {post?.readTime?.value} minute
                </dd>
              </div>
            </dl>
          </div>
        ))}
    </>
  );
};

export default BlogList;

// shorten the text to 100 characters
const shortenText = (text, startingPoint, maxLength) => {
  return text.length > 100
    ? text.slice(startingPoint, maxLength) + " . . ."
    : text;
};
