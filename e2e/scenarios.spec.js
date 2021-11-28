import supertest from 'supertest';
import server from '../src/index.js';

const newPerson = Object.freeze({
  name: 'Leanne Graham',
  age: 17,
  hobbies: ['football', 'tennis'],
});

afterAll(() => {
  server.close();
});

describe('Scenario 1(normal): check that DB empty > create person > get this person > update  > delete  > try to get ', () => {
  let person = {};
  const request = supertest(server);

  test('Should respond with 200 code and empty array', (done) => {
    request.get('/person').expect('Content-Type', /json/).expect(200, [], done);
  });

  test('Should create person, respond with 201 code and person', (done) => {
    request
      .post('/person')
      .send(newPerson)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((req) => {
        person = { ...req.body };
        delete req.body.id;
        return req;
      })
      .expect(newPerson, done);
  });

  test('Should respond with 200 code and person from previos test', (done) => {
    request.get(`/person/${person.id}`).expect('Content-Type', /json/).expect(200, person, done);
  });

  test('Should update person, respond with 200 code and person', (done) => {
    const olderPerson = { ...person, age: person.age + 2 };
    request
      .put(`/person/${person.id}`)
      .send(olderPerson)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, olderPerson, done);
  });

  test('Should delete person and respond with 204 code', (done) => {
    request.delete(`/person/${person.id}`).expect(204, done);
  });

  test('Should respond with 404 code', (done) => {
    request.get(`/person/${person.id}`).expect(404, done);
  });
});

describe('Scenario 2(paranoic):  create person > try to update with null > delete  > try to get > try to get all', () => {
  let person = {};
  const request = supertest(server);

  test('Should create person, respond with 201 code and person', (done) => {
    request
      .post('/person')
      .send(newPerson)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((req) => {
        person = { ...req.body };
        delete req.body.id;
        return req;
      })
      .expect(newPerson, done);
  });

  test('Should respond with 400 code', (done) => {
    const emptyPerson = { ...person, name: null, age: null, hobbies: null };
    request
      .put(`/person/${person.id}`)
      .send(emptyPerson)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('Should delete person and respond with 204 code', (done) => {
    request.delete(`/person/${person.id}`).expect(204, done);
  });

  test('Should respond with 404 code', (done) => {
    request.get(`/person/${person.id}`).expect(404, done);
  });

  test('Should respond with 200 code and empty array', (done) => {
    request.get('/person').expect('Content-Type', /json/).expect(200, [], done);
  });
});

describe('Scenario 3(hacker):  try to get with nonUUID > try to get > create person > try to update > delete  > try to delete all', () => {
  let person = {};
  const nonUUID = 1;
  const UUIDV4 = '4b1064c9-3bbf-43f4-9c10-77889517831c';

  const request = supertest(server);

  test('Should respond with 400 code', (done) => {
    request.get(`/person/${nonUUID}`).expect(400, done);
  });

  test('Should respond with 404 code', (done) => {
    request.get(`/person/${UUIDV4}`).expect(404, done);
  });

  test('Should create person, respond with 201 code and person', (done) => {
    request
      .post('/person')
      .send(newPerson)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((req) => {
        person = { ...req.body };
        delete req.body.id;
        return req;
      })
      .expect(newPerson, done);
  });

  test('Should respond with 400 code', (done) => {
    const hackerPerson = { ...person, name: () => console.log('server password'), hobbies: () => console.log(process) };
    request
      .put(`/person/${person.id}`)
      .send(hackerPerson)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('Should delete person and respond with 204 code', (done) => {
    request.delete(`/person/${person.id}`).expect(204, done);
  });

  test('Should respond with 501 code', (done) => {
    request.delete('/person').expect(501, done);
  });
});
