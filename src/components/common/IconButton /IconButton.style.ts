import styled from 'styled-components';

const Base = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ArrowTop = styled(Base)`
  border-radius: 4px;
  background-color: #f8f9fa;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

const Hamburger = styled(Base)`
  border-radius: 32px;
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  border: 1px solid #e3e8ec;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

const Share = styled(Base)`
  border-radius: 4px;
  background-color: #f8f9fa;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

export { Base, ArrowTop, Hamburger, Share };
