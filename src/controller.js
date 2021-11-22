import { v4 as uuidv4 } from 'uuid';
import { HTTP_ERRORS_INFO } from './constants.js';
import { isIdValid, isPersonValid } from './validation.js';
import { HTTPResponseError } from './error_hadlers.js';

export class Controller {
  constructor(db) {
    this.db = db;
  }
  async getPersons() {
    return new Promise((resolve) => {
      const persons = this.db.getAllItems();
      resolve(persons);
    });
  }

  async getPerson(personId) {
    return new Promise((resolve, reject) => {
      isIdValid(personId);
      const person = this.db.getItem(personId);
      person ? resolve(person) : reject(new HTTPResponseError(HTTP_ERRORS_INFO.notFound));
    });
  }

  async addPerson(person) {
    return new Promise((resolve) => {
      isPersonValid(person);

      const personWithId = {
        ...person,
        id: uuidv4(),
      };

      resolve(personWithId);
    }).then((person) => this.addToDBAndVerify(person));
  }

  async updatePerson(person) {
    return this.getPerson(person.id)
      .then(() => {
        isPersonValid(person);

        this.db.removeItem(person.id);

        return person;
      })
      .then((person) => this.addToDBAndVerify(person));
  }

  async removePerson(personId) {
    return this.getPerson(personId).then(() => {
      this.db.removeItem(personId);
    });
  }

  addToDBAndVerify(person) {
    this.db.addItem(person);

    const personFromDB = this.db.getItem(person.id);
    if (JSON.stringify(person) === JSON.stringify(personFromDB)) {
      return personFromDB;
    }
    throw new HTTPResponseError(HTTP_ERRORS_INFO.db);
  }
}
