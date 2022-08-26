import React from "react";
import { Button } from "react-bootstrap";
import ModalCentered from "./ModalCentered";
import { useState } from "react";

const MovieReview = ({ avatar_path, item }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="review_card">
      <div className="review_container">
        <div className="reviewer_info">
          <div
            style={{
              backgroundImage:
                "url(" + `https://www.gravatar.com/avatar${avatar_path}` + ")",
              width: 50,
              height: 50,
              borderRadius: 50,
              marginRight: 10,
              backgroundSize: "cover",
              filter: "brightness(75%)",
            }}
          ></div>

          <div
            style={{
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            {item.author}
          </div>
          <div
            style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "bold",
              paddingLeft: "20px",
            }}
          >
            {item.author_details.rating ? (
              <p>{item.author_details.rating} / 10</p>
            ) : (
              <p style={{ color: "gray", fontSize: 8 }}>NOT SCORED</p>
            )}
          </div>
        </div>

        <div
          style={{ fontSize: "12px", fontWeight: "bold", paddingRight: "20px" }}
        >
          {item.updated_at.slice(0, 10)}
        </div>
      </div>
      <p>{item.content}</p>
      {/* <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
        <ModalCentered show={modalShow} onHide={() => setModalShow(false)} />
      </div> */}
    </div>
  );
};

export default MovieReview;
