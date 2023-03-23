import { compareAsc, format } from 'date-fns';

export type TFormatOptions = {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
};
const useDateFns = () => {
  const convertToDateString = (
    date: Date | number,
    type: string,
    options?: TFormatOptions,
  ) => {
    return format(date, type, options);
  };

  return {
    convertToDateString,
  };
};

export default useDateFns;
