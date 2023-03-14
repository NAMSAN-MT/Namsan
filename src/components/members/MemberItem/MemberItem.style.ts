import { flex, font, lineHeight, size } from '@Styles/mixin.style';
import styled from 'styled-components';

const MemberItemWrapper = styled.li`
  ${size('416px', '282px')}
  cursor: pointer;
  list-style: none;
  margin-bottom: 52px;
`;

const ImageSection = styled.div`
  ${size('320px', '100%')}
  // FIXME: 팔레트에 지정되면 추후 변수로 변경하기
  background-color: #F6F8FA;
  position: relative;
  user-select: none;
`;

const ImageWrapper = styled.div`
  ${size('100%', '100%')}
  ${flex('center', 'end')}
`;

const Image = styled.img`
  ${size('85%', 'auto')}
`;

const TagsWrapper = styled.div`
  position: absolute;
  ${size('auto', '100%')}
  background-color:#05246d;
  padding: 16px;
  opacity: 0.9;
  bottom: 0;
`;

const Tag = styled.span`
  ${font('body14', 'bold')}
  color:${props => props.theme.color.textWhiteHigh};
  border: 1px solid ${props => props.theme.color.textWhiteHigh};
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 4px 8px;
  border-radius: 2px;
  display: inline-block;
`;

const TextSection = styled.div``;

const Name = styled.div`
  ${font('title24', 'bold')}
  ${lineHeight(24, 38)}
  color: ${props => props.theme.color.textBlackHigh}
  letter: -0.4px;
  margin-top: 24px;
`;

const Position = styled.div`
  ${font('title20', 'regular')}
  ${lineHeight(20, 34)}
  color: ${props => props.theme.color.textBlackMedium}
`;

export {
  MemberItemWrapper,
  ImageSection,
  ImageWrapper,
  Image,
  TagsWrapper,
  Tag,
  TextSection,
  Name,
  Position,
};
