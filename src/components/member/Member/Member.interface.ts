import { IMember } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface MemberProps extends WrappedComponentProps {
  member: IMember;
}

export { MemberProps };
