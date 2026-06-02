import { IMember } from '@Interface/api.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

interface IMemberListProps extends WithIntlProps {
  members: IMember[];
}

export type { IMemberListProps };
