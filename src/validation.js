import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { USED_UUID_VERSION, HTTP_ERRORS_INFO } from './constants.js';
import { HTTPResponseError } from './error_hadlers.js';

export const isIdValid = (id) => {
  if (uuidValidate(id) && uuidVersion(id) === USED_UUID_VERSION) {
    return;
  }
  throw new HTTPResponseError(HTTP_ERRORS_INFO.invalidId);
};

export const isPersonValid = (person) => {
  const isHobbiesValid = Array.isArray(person.hobbies) && person.hobbies.every((hobby) => typeof hobby === 'string');
  if (typeof person.name === 'string' && typeof person.age === 'number' && isHobbiesValid) {
    return;
  }
  throw new HTTPResponseError(HTTP_ERRORS_INFO.invalidPersonData);
};
