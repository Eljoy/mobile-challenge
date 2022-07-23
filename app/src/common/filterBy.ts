import { get } from 'lodash';

export const filterBy = <T>(arr: T[], fields: string[], keyWord: string) => {
  const regEx = new RegExp(keyWord, 'i');
  return arr.filter((value) => {
    return fields
      .map((field) => get(value, field))
      .some((fieldValue) => regEx.test(fieldValue));
  });
};
