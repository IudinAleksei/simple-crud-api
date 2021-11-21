import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export const isIdValid = (id) => {
  return uuidValidate(id) && uuidVersion(id) === 4;
};
