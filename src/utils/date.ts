import { Timestamp } from 'firebase/firestore';

export const getTimestampToDate = (date: Timestamp) => {
  const _ = date.toDate();
  const _year = _.getFullYear();
  const _month = _.getMonth() + 1;
  const _date = _.getDate();
  const fullDate = `${_year}.${_month < 9 ? `0${_month}` : _month}.${
    _date < 9 ? `0${_date}` : _date
  }`;
  return { fullDate, year: _year, month: _month, date: _date };
};
