import { IMember } from '@Interface/api.interface';
import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface IMemberItemProps extends WrappedComponentProps, Partial<IMember> {}

export { IMemberItemProps };
