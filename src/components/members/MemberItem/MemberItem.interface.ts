import { IMember } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface IMemberItemProps
  extends WrappedComponentProps,
    Pick<
      IMember,
      'name' | 'position' | 'businessFields' | 'imagePath' | 'id'
    > {}

export { IMemberItemProps };
