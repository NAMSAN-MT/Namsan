export const convertDateStr = (date: any) => {
  const _ = new Date(String(date));
  const _year = _.getFullYear();
  const _month = _.getMonth() + 1;
  const yearMoth = `${_year}.${_month < 9 ? `0${_month}` : _month}`;

  const _date = _.getDate();
  const fullDate = `${_year}.${_month < 9 ? `0${_month}` : _month}.${
    _date < 9 ? `0${_date}` : _date
  }`;
  return { yearMoth, fullDate };
};
