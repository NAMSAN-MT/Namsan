import { flex, font } from '@Styles/mixin.style';
import styled from 'styled-components';

const Info = styled.div`
  ${flex('center', 'flex-start')}
  flex-direction: column;
  white-space: break-spaces;
  margin-bottom: 60px;
`;

const Title = styled.div`
  ${font('list20', 'regular')}
  color: rgba(6, 11, 17, 0.56);
  line-height: 34px;
  margin-bottom: 8px;
`;

const Content = styled.div`
  ${font('title26', 'bold')}
  line-height: 40px;
`;

const InfoWrapper = styled.div`
  ${flex('flex-start', 'flex-start')}
  width: 100%
`;

const InfoColumn = styled.div`
  width: 50%;
`;

export { Info, Title, Content, InfoWrapper, InfoColumn };
