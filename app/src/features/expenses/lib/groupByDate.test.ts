import { EXPENSES_DATE_FORMAT } from '@common'
import { Expense } from '@models/Expense'
import moment from 'moment'
import { groupByDate } from './groupByDate'

const expense: Expense = {
  index: 0,
  id: '5b995dff2e3cb74644948a66',
  amount: {
    value: '2149.29',
    currency: 'GBP',
  },
  date: '2017-06-21T08:45:09.326Z',
  merchant: 'QUONK',
  receipts: [],
  comment: '',
  category: '',
  user: {
    first: 'Atkins',
    last: 'Blackburn',
    email: 'atkins.blackburn@pleo.io',
  },
}

describe('groupByDate', () => {
  const today = moment()
  const yesterday = moment().add(-1, 'day')
  const otherDate = moment().add(-4, 'day')

  const todayData = [today.toISOString(), today.toISOString()].map((date) => ({
    ...expense,
    date,
  }))

  const yesterdayData: Expense[] = [yesterday.toISOString()].map((date) => ({
    ...expense,
    date,
  }))

  const otherDateData = [
    otherDate.toISOString(),
    otherDate.toISOString(),
    otherDate.toISOString(),
  ].map((date) => ({
    ...expense,
    date,
  }))

  test('groupByDate', () => {
    const data: Expense[] = [...todayData, ...yesterdayData, ...otherDateData]
    expect(groupByDate(data)).toEqual({
      today: todayData,
      yesterday: yesterdayData,
      [otherDate.format(EXPENSES_DATE_FORMAT)]: otherDateData,
    })
  })
})
