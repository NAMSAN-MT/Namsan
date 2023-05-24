import { IMember } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface IMemberDescriptionProps extends WrappedComponentProps {
  member: IMember;
}

export { IMemberDescriptionProps };
