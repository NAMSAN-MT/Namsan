import { IMember } from '@Interface/api.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

interface IMemberDescriptionProps extends WithIntlProps {
  member: IMember;
}

export type { IMemberDescriptionProps };
