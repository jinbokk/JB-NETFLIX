import React from "react";
import styled, { keyframes } from "styled-components";

const TextAnimation = ({ movie }) => {
  return (
    <>
      <div className="MovieDetail_info">
        <MoveUp_2>
          <h1>{movie.title}</h1>
        </MoveUp_2>
        <Wrapper>
          <MoveUp_1>
            <p>{movie.overview}</p>
            {movie.genres?.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </MoveUp_1>
        </Wrapper>
      </div>
    </>
  );
};

const fadeIn = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

const slideDown_1 = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(20px);
    transform-origin:left;
  }
`;

const slideDown_2 = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(70px) scale(0.5);
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

const MoveUp_1 = styled.div`
  opacity: 1;
  animation-name: ${slideDown_1};
  animation-duration: 0.7s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
`;

const MoveUp_2 = styled.div`
  opacity: 1;
  animation-name: ${slideDown_2};
  animation-duration: 1s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
`;

export default TextAnimation;
