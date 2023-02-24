import styled from 'styled-components';

const Base = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;

  // FIXME: MIXIn으로 변경
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.2px;
  border-radius: 50px;
`;

const Primary = styled(Base)`
  color: #fff;
  padding: 13px 30px;
  width: 104px;
  background-color: #193f9a;
  &:hover {
    background-color: #142f71;
  }
`;

const Support = styled(Base)`
  color: #060b11;
  padding: 11px 30px;
  width: 104px;
  background-color: #eff2f4;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

const SupportLine = styled(Base)`
  color: #060b11;
  padding: 11px 30px;
  width: 104px;
  background-color: #ffffff;
  border: 1px solid #cfd6dc;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

const Outline = styled(Base)`
  color: #193f9a;
  background-color: #ffffff;
  border: 1.5px solid #193f9a;
  border-radius: 24px;
  padding: 11px 20px;
  width: 84px;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

const Tag = styled(Base)`
  color: #103eac;
  background-color: #ffffff;
  border: 1px solid #193f9a;
  border-radius: 2px;
  padding: 4px 8px;
  letter-spacing: -0.1px;

  // FIXME: MIXIn으로 변경
  line-height: 22px;
  font-size: 14px;
  width: 68px;
  &:hover {
    background-color: rgba(6, 11, 17, 0.3);
  }
`;

export { Base, Primary, Support, SupportLine, Outline, Tag };
