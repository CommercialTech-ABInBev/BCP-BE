export class HttpError extends Error {
  constructor(status, message, data = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
  getErrorResponse(res) {
    const respObj = {
      success: false,
      error: this.message,
    };
    if (this.data) {
      respObj['data'] = this.data;
    }
    return res.status(this.status).json(respObj);
  }
}
