import { News } from '@Interface/api.interface';
import { WithIntlProps } from '@Hocs/withTranslations';

export interface Props extends News, WithIntlProps {}
export interface NewsProfile {
  profileImage: string;
  name: string;
  position: string;
}
