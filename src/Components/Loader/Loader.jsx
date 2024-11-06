import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the spinner
const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #007bff; // Adjust color to fit your theme
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

// Wrapper to center spinner
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full height for center alignment
`;

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);

export default LoadingSpinner;
