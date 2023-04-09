import { ISecondSectionProps } from '../SecondSection/SecondSection.interface';

interface IBannerProps extends ISecondSectionProps {
  title: string;
  tag: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonTitle: string;
  even: boolean;
  index: number;
}

export { IBannerProps };
