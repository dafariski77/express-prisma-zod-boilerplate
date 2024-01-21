import CustomAPIrror from "./customApiError.js";

export default class NotFoundError extends CustomAPIrror {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
