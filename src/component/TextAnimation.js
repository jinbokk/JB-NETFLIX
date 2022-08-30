import React from "react";
import styled, { keyframes } from "styled-components";

const TextAnimation = ({ props }) => {
  return (
    <>
      <div className="MovieDetail_Info">
        <MoveDown>
          <h1>{props.original_title}</h1>
        </MoveDown>
        <Wrapper>
          <MoveUp>
            <p>{props.overview}</p>
            {props.genres.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
          </MoveUp>
        </Wrapper>
      </div>
    </>
  );
};

const fadeIn = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

const slideUp = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(20px);
    transform-origin:left;
  }
`;

const slideDown = keyframes`
  0% {
    transform:translateY(0px);
    transform-origin:left;
  }
  100% {
    transform:translateY(50px) scale(0.7);
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

const MoveUp = styled.div`
  opacity: 1;
  animation-name: ${slideUp};
  animation-duration: 1s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
`;

const MoveDown = styled.div`
  opacity: 1;
  animation-name: ${slideDown};
  animation-duration: 1s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
`;

export default TextAnimation;
