import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import useAuthGuard from "../../hooks/useAuthGuard";
const yourUserId = "123";
export default function BlogLike({ defaultLikes, onChange }) {
  useAuthGuard();
  const [likes, setLikes] = useState(defaultLikes);
  const iLikedThisArticle = likes.includes(yourUserId);
  const toggleLike = () => {
    if (iLikedThisArticle) {
      setLikes(likes.filter((id) => id !== yourUserId));
    } else {
      setLikes([...likes, yourUserId]);
    }
    onChange && onChange(likes);
  };
  useEffect(() => {
    onChange && onChange(likes);
  }, [iLikedThisArticle]);
  return (
    <div>
      <div
        className="d-flex align-items-center"
        // onClick={toggleLike}
        // variant={iLikedThisArticle ? "dark" : "dark-outline"}
      >
        <AiOutlineLike /> {`${likes.length}  like`}
      </div>{" "}
    </div>
  );
}
