import React from "react";
import styled, { keyframes } from "styled-components";

const TextAnimation = ({ movie }) => {
  return (
    <>
      <div className="MovieDetail_info">
        <MoveUpTitle>
          <h1>{movie.title}</h1>
          <h2>{movie.tagline}</h2>
        </MoveUpTitle>
        <Wrapper>
          <MoveUpPreview>
            <div className="movieDetail_genres">
              {movie.genres?.map((item, index) => (
                <div className="movieDetail_genres_item" key={index}>
                  {item.name}
                </div>
              ))}
            </div>
          </MoveUpPreview>
        </Wrapper>
      </div>
    </>
  );
};

const fadeIn = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

const slideDown_Preview = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(20px);
    transform-origin:left;
  }
`;

const slideDown_Preview_mobile = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(20px);
    transform-origin:left;
  }
`;

const slideDown_Title = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(30px) scale(0.6);
    transform-origin:left;
  }
`;

const slideDown_Title_mobile = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(-25px) scale(0.7);
    transform-origin:left;
  }
`;

const Wrapper = styled.div`
  opacity: 1;
  animation-name: ${fadeIn};
  animation-duration: 2s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
`;

const MoveUpPreview = styled.div`
  opacity: 1;
  animation-name: ${slideDown_Preview};
  animation-duration: 0.7s;
  animation-delay: 5s;
  animation-fill-mode: forwards;

  @media (max-width:768px) {
    opacity: 1;
    animation-name: ${slideDown_Preview_mobile};
    animation-duration: 0.7s;
    animation-delay: 5s;
    animation-fill-mode: forwards;
`;

const MoveUpTitle = styled.div`
  opacity: 1;
  animation-name: ${slideDown_Title};
  animation-duration: 1s;
  animation-delay: 5s;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    opacity: 1;
    animation-name: ${slideDown_Title_mobile};
    animation-duration: 0.7s;
    animation-delay: 5s;
    animation-fill-mode: forwards;
  }
`;

export default TextAnimation;
