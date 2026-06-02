import { ISecondSectionProps } from '../SecondSection/SecondSection.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

interface IBannerProps extends ISecondSectionProps, WithIntlProps {
  title: string;
  tag: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonTitle: string;
  even: boolean;
  index: number;
}

export type { IBannerProps };
