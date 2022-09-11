import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxWidth: 700,
  height: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MovieReview({ avatar_path, item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className="review_card_top"
        onClick={handleOpen}
        variant="text"
        color="error"
      >
        <div className="review_card">
          <div className="review_container">
            <div className="reviewer_info">
              <div className="reviewer_info_profile">
                <div
                  style={{
                    backgroundImage:
                      "url(" +
                      `https://www.gravatar.com/avatar${avatar_path}` +
                      ")",
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    marginRight: 10,
                    backgroundSize: "cover",
                    filter: "brightness(75%)",
                  }}
                ></div>

                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    maxWidth: "120px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.author}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "red",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {item.author_details.rating ? (
                    <p>{item.author_details.rating} / 10</p>
                  ) : (
                    <p
                      style={{
                        color: "gray",
                        fontSize: 8,
                      }}
                    >
                      NOT SCORED
                    </p>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    paddingLeft: "20px",
                  }}
                >
                  {item.updated_at.slice(0, 10)}
                </div>
              </div>
            </div>
          </div>
          <div className="review_content_section">
            <div className="review_content">{item.content}</div>
            <div className="review_content_readMore">Read more</div>
          </div>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="reviewer_info reviewer_info_modal">
              <div
                style={{
                  backgroundImage:
                    "url(" +
                    `https://www.gravatar.com/avatar${avatar_path}` +
                    ")",
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
                  fontSize: "20px",
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
                  <p
                    style={{
                      color: "gray",
                      fontSize: 8,
                    }}
                  >
                    NOT SCORED
                  </p>
                )}
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="review_content_section_modal">
              <p className="review_content">{item.content}</p>
              <p style={{ opacity: "0.6", textAlign: "right" }}>
                {item.updated_at.slice(0, 10)}
              </p>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
