import { flex, font, lineHeight, size } from '@Styles/mixin.style';
import styled from 'styled-components';
import { mediaQuery } from '../../../styles/mixin.style';

const MemberItemWrapper = styled.li`
  ${size('416px', '282px')}

  cursor: pointer;
  list-style: none;

  ${mediaQuery('pc1278', `${size('auto', 'calc((100% - 48px) / 3)')};`)}
  ${mediaQuery('mobile', `${size('auto', 'calc((100% - 24px) / 2)')};`)}
`;

const TagsWrapper = styled.div`
  display: none;
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

const ImageSection = styled.div`
  ${size('320px', '100%')}
  // FIXME: 팔레트에 지정되면 추후 변수로 변경하기
  background-color: #F6F8FA;
  position: relative;
  user-select: none;

  ${mediaQuery('pc1278', `${size('auto', '100%')}`)}

  &:hover {
    ${TagsWrapper} {
      display: block;

      ${mediaQuery(
        'mobile',
        `
          display: none;
        `,
      )}
    }
  }
`;

const ImageWrapper = styled.div`
  ${size('100%', '100%')}
  ${flex('center', 'end')}
`;

const Image = styled.img`
  ${size('100%', '100%')}
`;

const TextSection = styled.div``;

const Name = styled.div`
  ${font('title24', 'bold')}
  ${lineHeight(24, 38)}
  color: ${props => props.theme.color.textBlackHigh};
  letter-spacing: -0.4px;
  margin-top: 24px;

  ${mediaQuery(
    'mobile',
    `
      ${font('mobile16', 'bold')};
      margin-top: 12px;
    `,
  )}
`;

const Position = styled.div`
  ${font('title20', 'regular')};
  ${lineHeight(20, 34)};
  color: ${props => props.theme.color.textBlackMedium};

  ${mediaQuery(
    'mobile',
    `
      ${font('body14', 'regular')};
    `,
  )}
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
