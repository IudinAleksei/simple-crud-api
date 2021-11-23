export const USED_UUID_VERSION = 4;

export const RESPONSE_HEADERS = Object.freeze({
  contentTypeJson: { 'Content-Type': 'application/json' },
});

export const HTTP_ERRORS_INFO = Object.freeze({
  invalidPersonData: { code: 400, message: 'Incorrect person data' },
  invalidId: { code: 400, message: 'PersonId not valid' },
  notFound: { code: 404, message: 'Person with this id not found' }, //+
  server: { code: 500, message: 'Server error, please try later' },
  noRoute: { code: 404, message: 'Route or method not found' },
  db: { code: 500, message: 'Database error, please try later' }, //+
});
