import { Expense } from '@models/Expense';
import moment from 'moment';

export type GroupedByDate = Record<string, Expense[]>;

export const groupByDate = (
  expenses: Expense[],
  dateFormat = 'DD_MM_YYYY'
): GroupedByDate => {
  return expenses.reduce<GroupedByDate>((previousValue, currentValue) => {
    const dateKey = toDateKey(currentValue.date, dateFormat);
    const groupData = previousValue[dateKey] || [];
    return {
      ...previousValue,
      [dateKey]: [...groupData, currentValue],
    };
  }, {});
};

const toDateKey = (dateStr: string, dateFormat?: string) => {
  const date = moment(dateStr);
  if (date.isSame(new Date(), 'day')) {
    return 'today';
  }
  if (date.isSame(moment().add(-1, 'day'), 'day')) {
    return 'yesterday';
  }
  return date.format(dateFormat);
};
