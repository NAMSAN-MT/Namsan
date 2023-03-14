import { Wrapper } from '@Components/main/FirstSection/FirstSection.style';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  height: 100%;
`;

const LayoutContent = styled.div`
  min-height: calc(100% - 84px - 224px);
`;

const TopButtonWrapper = styled(Wrapper)`
  position: relative;
  width: 100%;
  button {
    position: absolute;
    top: -120px;
    right: 90px;
  }
`;

export { LayoutWrapper, LayoutContent, TopButtonWrapper };
