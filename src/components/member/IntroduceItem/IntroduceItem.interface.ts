import { IMember, IMemberAttribute } from '@Interface/api.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

interface IntroduceItemProps extends WithIntlProps {
  titleKey: keyof Pick<IMember, 'educations' | 'careers' | 'papers' | 'awards'>;
  values: IMemberAttribute[];
}

export type { IntroduceItemProps };
