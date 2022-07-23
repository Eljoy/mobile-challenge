import { faker } from '@faker-js/faker';
import { User } from '../User';

export const generateUser = (user?: Partial<User>, empty = false): User => {
  return empty
    ? {
        first: '',
        last: '',
        email: '',
        ...user,
      }
    : {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        email: faker.internet.email(),
        ...user,
      };
};
