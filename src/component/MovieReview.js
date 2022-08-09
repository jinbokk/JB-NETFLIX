import React from "react";

const MovieReview = ({ avatar_path, item }) => {
  return (
    <>
      <div className="reviewer_info">
        <div className="reviewer_img"
          style={{
            backgroundImage:
              "url(" + `https://www.gravatar.com/avatar${avatar_path}` + ")",
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 10,
            backgroundSize: "cover",
          }}
        ></div>
        <h3>{item.author}</h3>
      </div>
      <p>{item.content}</p>
    </>
  );
};

export default MovieReview;
