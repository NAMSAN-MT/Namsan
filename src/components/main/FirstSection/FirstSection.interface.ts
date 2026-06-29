import { ISecondSectionProps } from '../SecondSection/SecondSection.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

interface IFirstSectionProps extends ISecondSectionProps, WithIntlProps {
  isDesktop: boolean;
  isMobile: boolean;
  eventBus: (isView: boolean) => void;
}
export type { IFirstSectionProps };
