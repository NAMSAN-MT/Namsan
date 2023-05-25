import { ISecondSectionProps } from '../SecondSection/SecondSection.interface';

interface IFirstSectionProps extends ISecondSectionProps {
  isDesktop: boolean;
  isMobile: boolean;
  eventBus: (isView: boolean) => void;
}
export { IFirstSectionProps };
