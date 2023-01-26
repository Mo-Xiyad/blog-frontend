import React from "react";
// import { withRouter } from "react-router";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import coverImage from "../../assets/blog.png";
import BlogComment from "../../components/blog/blog-comment";
import useAuthGuard from "../../hooks/useAuthGuard";
const Blog = () => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!isLoading && isAuthenticated === false) {
    window.localStorage.clear();
    navigate("/login");
  }

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { _id: id } = params;
  const apiUrl = process.env.REACT_APP_BE_URL;

  const getData = async (id) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } else {
        // tru to refresth token........
        //if token refresh is ok.....
        // if not, then it is a real error
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="text-primary bg-secondary dark:bg-gray-900 ">
        {
          <div className="flex justify-center pt-24">
            <div className="w-full md:w-3/4 lg:w-1/2">
              <img
                src={
                  blog?.cover.startsWith("https:") ? blog?.cover : coverImage
                }
                className="object-cover rounded-lg h-64 w-full shadow-lg shadow-gray-700"
                alt="Server Image"
              />
            </div>
          </div>
        }
        {
          <div className="md:w-3/4 mx-auto text-center container py-16 bg-secondary sm:px-0  dark:bg-gray-900 ">
            <h1 className="bg-primary dark:bg-secondary bg-clip-text font-extrabold text-transparent lg:text-5xl md:text-3xl sm:text-lg mb-28">
              {blog?.title}
            </h1>
            {/* show the content of the post */}
            <a
              className="bg-tertiary text-white mt-5 py-2 px-4 rounded-lg shadow-lg shadow-gray-700 dark:shadow-gray-700 "
              href={`${apiUrl}/posts/${blog?._id}/download-post-pdf`}
            >
              Download PDF
            </a>
            <div className="flex justify-end px-5 mt-10 dark:text-secondary">
              {`${blog?.readTime?.value} ${blog?.readTime?.unit} read 📖`}
            </div>
            <div
              className="text-black  text-lg font-light mt-5 dark:text-secondary first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold
  first-letter:mr-3 first-letter:float-left"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            ></div>
            {/* comment box */}
            <div className="flex flex-col items-center justify-center pt-20"></div>

            <BlogComment id={blog?._id} />
          </div>
        }
      </div>
    );
  }
};

export default Blog;
