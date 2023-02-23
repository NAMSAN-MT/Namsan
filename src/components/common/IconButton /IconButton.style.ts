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
  background-color: ${({ theme }) => theme.color.backgroundGrey50};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const Hamburger = styled(Base)`
  border-radius: 32px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.textWhiteHigh};
  border: 1px solid ${({ theme }) => theme.color.dividerGrey200};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

const Share = styled(Base)`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.backgroundGrey50};
  &:hover {
    background-color: ${({ theme }) => theme.color.textBlackDisable};
  }
`;

export { Base, ArrowTop, Hamburger, Share };
