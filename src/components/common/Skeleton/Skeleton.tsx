import React, { PropsWithChildren } from 'react';
import * as S from './Skeleton.style';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ISkeletonProps } from './Skeleton.interface';

const CustomSkeleton: React.FC<ISkeletonProps> = (props: ISkeletonProps) => {
  return (
    <SkeletonTheme
      baseColor="#202020"
      highlightColor="#444"
      height={props.height}
    >
      <Skeleton count={props.count} />
    </SkeletonTheme>
  );
};

export default CustomSkeleton;
