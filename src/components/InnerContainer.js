import React from 'react';
import styled from 'styled-components';

const InnerContainer = styled.div`
  display: inline-flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 28px);
  }
  @media (min-width: 768px) and (max-width: 1279.98px) {
    width: 720px;
  }
  @media (min-width: 1280px) {
    width: 1200px;
  }
`;

export default InnerContainer;
