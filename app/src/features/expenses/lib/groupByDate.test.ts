import { Expense } from '@models/Expense';
import { generateExpense } from '@models/__test-utils__/generateExpense';
import moment from 'moment';
import { groupByDate } from './groupByDate';

const DATE_FORMAT = 'DD MMMM YYYY';

describe('groupByDate', () => {
  const today = moment();
  const yesterday = moment().add(-1, 'day');
  const otherDate = moment().add(-4, 'day');
  const todayData = [today.toISOString(), today.toISOString()].map((date) =>
    generateExpense({ date })
  );

  const yesterdayData: Expense[] = [yesterday.toISOString()].map((date) =>
    generateExpense({ date })
  );

  const otherDateData = [
    otherDate.toISOString(),
    otherDate.toISOString(),
    otherDate.toISOString(),
  ].map((date) => generateExpense({ date }));

  test('groupByDate', () => {
    const data: Expense[] = [...todayData, ...yesterdayData, ...otherDateData];
    expect(groupByDate(data, DATE_FORMAT)).toEqual({
      today: todayData,
      yesterday: yesterdayData,
      [otherDate.format(DATE_FORMAT)]: otherDateData,
    });
  });
});
