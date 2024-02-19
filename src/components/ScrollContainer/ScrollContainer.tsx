import React, { FC } from 'react';
import styled from 'styled-components';
import { ScrollContainerProps } from './ScrollContainer.types';

const WrapScrollContainer = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  right: 4px;
  bottom: 4px;
  overflow: auto;
  padding-right: 12px;
  padding-bottom: 12px;
`;

const ScrollContainer: FC<ScrollContainerProps> = ({ children, propRef }) => {
  return (
    <WrapScrollContainer ref={propRef} className="scroll-container">
      {children}
    </WrapScrollContainer>
  );
};

export default ScrollContainer;
