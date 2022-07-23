import { faker } from '@faker-js/faker';
import { Amount } from '@models/Amount';
import { User } from '@models/User';
import { generateAmount } from '@models/__test-utils__/generateAmount';
import { generateUser } from '@models/__test-utils__/generateUser';
import { Expense } from '../Expense';

export const generateExpense = (
  expense: Partial<Expense> = {},
  empty = false,
  user: Partial<User> = {},
  amount: Partial<Amount> = {}
): Expense => {
  return empty
    ? {
        id: '',
        user: generateUser(user, empty),
        date: '',
        comment: '',
        receipts: [],
        category: '',
        merchant: '',
        amount: generateAmount(amount, empty),
        ...expense,
      }
    : {
        id: faker.datatype.uuid(),
        user: generateUser(user, empty),
        date: faker.date.recent().toDateString(),
        comment: faker.lorem.sentence(),
        receipts: [],
        category: faker.lorem.word(),
        merchant: faker.commerce.productName(),
        amount: generateAmount(amount, empty),
        ...expense,
      };
};
