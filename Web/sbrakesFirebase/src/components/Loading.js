import React from 'react';
import styled from 'styled-components';

// Estilo Loading
const LoadingStyle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border: 7px solid #f1f1f1;
  border-top: 7px solid #1c1c1c;
  border-radius: 50%;
  animation: loadingAnimation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @keyframes loadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = ({ width, height, text }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <LoadingStyle width={width} height={height} />
      <span style={{ color: '#1c1c1c' }}>{text}</span>
    </div>
  );
};
