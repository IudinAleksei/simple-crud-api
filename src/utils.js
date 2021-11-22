export const createResponse = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });

  if (data) {
    res.write(JSON.stringify(data));
  }

  res.end();
};

export const parseUrl = (url) => {
  return url.split('/').filter((path) => path.length > 0);
};

export const getRequestBody = async (req) =>
  new Promise((resolve, reject) => {
    try {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk.toString();
      });

      req.on('end', () => resolve(JSON.parse(data)));
    } catch (error) {
      reject(error);
    }
  });
