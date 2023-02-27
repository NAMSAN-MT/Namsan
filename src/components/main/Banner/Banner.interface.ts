interface IBannerProps {
  title: string;
  tag: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonTitle: string;
  even: boolean;
}

export { IBannerProps };
