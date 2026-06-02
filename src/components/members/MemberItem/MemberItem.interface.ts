import { IMember } from '@Interface/api.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

interface IMemberItemProps extends WithIntlProps, Partial<IMember> {}

export type { IMemberItemProps };
