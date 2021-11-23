import supertest from 'supertest';
import server from '../src/index.js';

const request = supertest(server);

const newPerson = {
  name: 'Leanne Graham',
  age: 17,
  hobbies: ['football', 'tennis'],
};

describe('Scenario 1: check that DB empty > create person > get this person > update  > delete  > try to get ', () => {
  let person = {};
  afterAll(() => {
    server.close();
  });
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

describe('Scenario 2: get with invalid id > create person > get this person > update  > delete  > try to get ', () => {
  let person = {};
  afterAll(() => {
    server.close();
  });

  test('Should respond with 400 code and message: PersonId not valid', (done) => {
    const nonUuidId = 1;
    request
      .get(`/person/${nonUuidId}`)
      .expect('Content-Type', /json/)
      .expect(400, { message: 'PersonId not valid' }, done);
  });

  // test('Should create person, respond with 201 code and person', (done) => {
  //   request
  //     .post('/person')
  //     .send(newPerson)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(201)
  //     .expect((req) => {
  //       person = { ...req.body };
  //       delete req.body.id;
  //       return req;
  //     })
  //     .expect(newPerson, done);
  // });

  // test('Should update person, respond with 200 code and person', (done) => {
  //   const olderPerson = { ...person, age: person.age + 2 };
  //   request
  //     .put(`/person/${person.id}`)
  //     .send(olderPerson)
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, olderPerson, done);
  // });

  // test('Should delete person and respond with 204 code', (done) => {
  //   request.delete(`/person/${person.id}`).expect(204, done);
  // });

  // test('Should respond with 404 code', (done) => {
  //   request.get(`/person/${person.id}`).expect(404, done);
  // });
});
