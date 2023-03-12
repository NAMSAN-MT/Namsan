import { Member } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface IMemberItemProps
  extends WrappedComponentProps,
    Pick<Member, 'name' | 'position' | 'businessFields' | 'imagePath'> {}

export { IMemberItemProps };
