import http from 'http';
import dotenv from 'dotenv';

import { Controller } from './controller.js';
import { PERSONS } from './data.js';
import { createResponse, parseUrl } from './utils.js';
import { VirtualDB } from './virtual_db.js';
import { HTTP_ERRORS_INFO } from './constants.js';
import { HTTPResponseError } from './error_hadlers.js';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer();

const db = new VirtualDB(PERSONS);
const controller = new Controller(db);

server.on('request', async (req, res) => {
  try {
    const parsedUrl = parseUrl(req.url);
    if (parsedUrl[0] === 'person') {
      if (parsedUrl.length === 1) {
        if (req.method === 'GET') {
          const persons = await controller.getPersons();
          createResponse(res, 200, persons);
          return;
        }

        if (req.method === 'POST') {
          console.log(req.body);
          const newPerson = {
            name: 'Patricia Lebsack',
            age: 26,
            hobbies: [],
          };
          const person = await controller.addPerson(newPerson);
          createResponse(res, 201, person);
          return;
        }
      }

      if (parsedUrl.length === 2) {
        const personId = parsedUrl[1];

        if (req.method === 'GET') {
          const person = await controller.getPerson(personId);
          createResponse(res, 200, person);
          return;
        }

        if (req.method === 'PUT') {
          console.log(req.body);

          const newPerson = {
            id: 10,
            name: 'Patricia Lebsack',
            age: 26,
            hobbies: [],
          };

          const person = await controller.updatePerson(newPerson);
          createResponse(res, 200, person);
          return;
        }

        if (req.method === 'DELETE') {
          await controller.removePerson(personId);
          createResponse(res, 204);
          return;
        }
      }
    }

    throw new HTTPResponseError(HTTP_ERRORS_INFO.noRoute);
  } catch (error) {
    console.log(error);
    const errorForResponse =
      error instanceof HTTPResponseError ? error : new HTTPResponseError(HTTP_ERRORS_INFO.server);
    createResponse(res, errorForResponse.responseCode, { message: errorForResponse.message });
  }
});

// server.on('clientError', (err, socket) => {
//   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
