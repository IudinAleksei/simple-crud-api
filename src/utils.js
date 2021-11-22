export const createResponse = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });

  res.write(JSON.stringify(data));

  res.end();
};

export const parseUrl = (url) => {
  return url.split('/').filter((path) => path.length > 0);
};
