import supertest from 'supertest';

import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const re = supertest(`http://localhost:${port}`);

describe('GET /person', () => {
  test('Should respond with 200 code', (done) => {
    re.get('/person').expect('Content-Type', /json/).expect(200, done);
  });
});

describe('DELETE /person/:id', () => {
  test('Should respond with 204 code', (done) => {
    re.delete('/person/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed').expect('Content-Type', /json/).expect(204, done);
  });
});
