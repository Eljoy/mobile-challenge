import { Amount } from './Amount'
import { User } from './User'

export type Expense = {
  id: string
  amount: Amount
  date: Date
  merchant: string
  receipts: any[]
  comment: string
  category: string
  user: User
  index: number
}
