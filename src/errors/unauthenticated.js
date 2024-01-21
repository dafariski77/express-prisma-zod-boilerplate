import CustomAPIrror from "./customApiError.js";

export default class UnauthenticatedError extends CustomAPIrror {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
