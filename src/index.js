import dotenv from 'dotenv';
import http from 'http';

import { createResponse } from './utils.js';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer();

server.on('request', async (req, res) => {
  try {
    if (req.url === '/person' && req.method === 'GET') {
      createResponse(res, 200, 'Hi there, This is a Vanilla Node.js API');
      return;
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
