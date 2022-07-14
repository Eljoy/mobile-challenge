import { EXPENSES_DATE_FORMAT } from '@common'
import { Expense } from '@models/Expense'
import moment from 'moment'

type GroupedByDate = Record<string, Expense[]>

export const groupByDate = (expenses: Expense[]): GroupedByDate => {
  return expenses.reduce<GroupedByDate>((previousValue, currentValue) => {
    const dateKey = toDateKey(currentValue.date)
    const groupData = previousValue[dateKey] || []
    return {
      ...previousValue,
      [dateKey]: [...groupData, currentValue],
    }
  }, {})
}

const toDateKey = (dateStr: string) => {
  const date = moment(dateStr)
  if (date.isSame(new Date(), 'day')) {
    return 'today'
  }
  if (date.isSame(moment().add(-1, 'day'), 'day')) {
    return 'yesterday'
  }
  return date.format(EXPENSES_DATE_FORMAT)
}
