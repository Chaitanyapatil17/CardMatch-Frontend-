import React from "react";
import styled from "styled-components";

const GradientButton = ({ children }) => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="button-content">{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 1.5rem;
    background: #3d3a4e;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .button:hover {
    transform: scale(1.05);
  }

  .button:hover::before {
    transform: scaleX(1);
  }

  .button-content {
    position: relative;
    z-index: 1;
    font-weight: 600;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      82.3deg,
      rgba(150, 93, 233, 1) 10.8%,
      rgba(99, 88, 238, 1) 94.3%
    );
    transition: transform 0.475s ease;
  }
`;

export default GradientButton;