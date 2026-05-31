import { IMember } from '@Interface/api.interface';

type IntroduceType = keyof Pick<
  IMember,
  'educations' | 'careers' | 'papers' | 'awards'
>;

export type { IntroduceType };
