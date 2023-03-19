import styled from 'styled-components';
import MemberBackgroundImage from '@Images/member_bg.jpg';
import { font, lineHeight, size } from '@Styles/mixin.style';

const MemberWrapper = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  ${size('460px', '1200px')}
  background: url('${MemberBackgroundImage}');
  background-size: cover;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  ${size(undefined, '340px')};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
`;

const TextWrapper = styled.div`
  background-color: ${props => props.theme.color.white};
  padding: 68px 102px;
  margin: 0 auto;
  max-width: 996px;
  transform: translateY(-85px);

  .name {
    ${font('display40', 'bold')};
    ${lineHeight(40, 60)};
    letter-spacing: -0.6px;
  }

  .position {
    ${font('title20', 'bold')};
    ${lineHeight(20, 34)};
  }

  .email {
    ${font('body16', 'regular')};
    ${lineHeight(16, 26)};
    letter-spacing: -0.2px;
    color: ${props => props.theme.color.textBlackMedium};
  }

  .description {
    ${font('title20', 'regular')};
    ${lineHeight(20, 34)};
    margin: 40px 0;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 8px;

  .tag {
    padding: 4px 8px;
    border-radius: 2px;
    display: inline-block;
    border: 1px solid ${props => props.theme.color.blue100};
    ${font('body14', 'bold')};
    ${lineHeight(14, 22)};
    letter-spacing: -0.1px;
    color: ${props => props.theme.color.blue100};
  }
`;

export { MemberWrapper, ImageWrapper, ProfileImage, TextWrapper, TagWrapper };
