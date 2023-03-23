type TInitial = 'visible' | 'hidden';
type TVariantName = 'transition' | 'scale';

interface IAnimationWrapperProps {
  children: React.ReactNode;
  initial: TInitial;
  variantName: TVariantName;
  threshold: number;
}

export { IAnimationWrapperProps, TInitial, TVariantName };
