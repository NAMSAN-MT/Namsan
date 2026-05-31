import { ISecondSectionProps } from '../SecondSection/SecondSection.interface';
import { WithIntlProps } from '@Hocs/withTranslations';
interface IForthSectionProps extends ISecondSectionProps, WithIntlProps {
  isMobile: boolean;
  isTablet: boolean;
}
export type { IForthSectionProps };
