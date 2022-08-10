import React from "react";
import { Button } from "react-bootstrap";
import ModalCentered from "./ModalCentered";
import { useState } from "react";

const MovieReview = ({ avatar_path, item }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className="reviewer_info">
        <div
          className="reviewer_img"
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
      <p>UPDATED AT {item.updated_at.slice(0, 10)}</p>
      <p>RATING {item.author_details.rating} / 10</p>
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>

        <ModalCentered show={modalShow} onHide={() => setModalShow(false)} />
      </>
    </>
  );
};

export default MovieReview;
