import { faker } from '@faker-js/faker';
import { Amount } from '../Amount';

export const generateAmount = (
  amount: Partial<Amount> = {},
  empty = false
): Amount => {
  return empty
    ? {
        value: '',
        currency: '',
        ...amount,
      }
    : {
        value: faker.finance.amount(),
        currency: faker.finance.currencyName(),
        ...amount,
      };
};
