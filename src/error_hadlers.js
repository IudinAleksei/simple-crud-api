export class HTTPResponseError extends Error {
  constructor(errorInfo) {
    super();
    this.responseCode = errorInfo.code;
    this.message = errorInfo.message;
  }
}
