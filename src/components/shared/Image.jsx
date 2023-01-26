import React from "react";

const ImageContainer = ({ imageUrl }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 lg:w-1/2">
        <img
          src={imageUrl}
          className="object-cover rounded-lg h-64 w-full"
          alt="Server Image"
        />
      </div>
    </div>
  );
};

export default ImageContainer;
