import { News } from '@Interface/api.interface';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

export interface Props extends News, WrappedComponentProps {}
export interface NewsProfile {
  profileImage: string;
  name: string;
  position: string;
}
