import { IMember, IMemberAttribute } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface IntroduceItemProps extends WrappedComponentProps {
  titleKey: keyof Pick<IMember, 'educations' | 'careers' | 'papers' | 'awards'>;
  values: IMemberAttribute[];
}

export { IntroduceItemProps };
