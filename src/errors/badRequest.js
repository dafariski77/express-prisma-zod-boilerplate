import CustomAPIrror from "./customApiError.js";

export default class BadRequestError extends CustomAPIrror {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
