import React from "react";
import { useNavigate } from "react-router-dom";
import BlogPosts from "../../components/blog/blog-post";
import Footer from "../../components/footer";
import useAuthGuard from "../../hooks/useAuthGuard";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!isLoading && isAuthenticated === false) {
    window.localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="bg-secondary text-primary dark:text-secondary dark:bg-gray-900">
      <section className=" shadow bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 text-secondary mb-5 py-24">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Welcome to
              <span className="sm:block"> CodeCast.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
              This is just a place where you can share your thoughts and ideas
              about programming and technology.
            </p>
            <p className="mx-auto mt-4 max-w-xl sm:text-xss sm:leading-relaxed text-xs">
              Start by creating your first post.
            </p>
          </div>
        </div>
      </section>
      {/* Blog Items  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 overflow-hidden">
        <BlogPosts />
      </div>
      <Footer />
    </div>
  );
}
