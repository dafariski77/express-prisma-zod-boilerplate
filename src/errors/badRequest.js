import CustomAPIrror from "./customApiError.js";

export default class BadRequetError extends CustomAPIrror {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
