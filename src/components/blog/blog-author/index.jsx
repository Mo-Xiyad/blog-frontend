import React from "react";
import useAuthGuard from "../../../hooks/useAuthGuard";

const BlogAuthor = (author) => {
  useAuthGuard();

  return (
    <>
      {/* {author && (
        <Row>
          <Col xs={2}>
            <Image className="blog-author" src={author.avatar} roundedCircle />
          </Col>
          <Col>
            <div>by</div>
            <h6>{author.name}</h6>
          </Col>
        </Row>
      )} */}
    </>
  );
};

export default BlogAuthor;
