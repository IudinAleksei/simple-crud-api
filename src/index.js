import dotenv from 'dotenv';
import http from 'http';

import { PERSONS } from './data.js';
import { createResponse } from './utils.js';
import { VirtualDB } from './virtual_db.js';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer();

const db = new VirtualDB(PERSONS);

server.on('request', async (req, res) => {
  try {
    if (req.url === '/person') {
      if (req.method === 'GET') {
        createResponse(res, 200, db.getAllItems());
        return;
      }

      if (req.method === 'POST') {
        console.log(req.body);
        const newPerson = {
          name: 'Patricia Lebsack',
          age: 26,
          hobbies: [],
        };
        const newItem = db.addItem(newPerson);
        createResponse(res, 200, newItem);
        return;
      }
    }

    if (req.url === '/person/1' && req.method === 'GET') {
      createResponse(res, 200, `personId: ${req.url}`);
      return;
    }

    createResponse(res, 404, { message: 'Route not found' });
  } catch (error) {
    createResponse(res, 500, { message: error.message });
  }
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
