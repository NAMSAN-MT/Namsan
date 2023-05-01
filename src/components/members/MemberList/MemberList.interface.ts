import { IMember } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface IMemberListProps extends WrappedComponentProps {
  members: IMember[];
}

export { IMemberListProps };
