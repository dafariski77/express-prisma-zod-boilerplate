import request from "supertest";
import app from "../index.js";

const prefixApi = "/api/v1/auth";

// Auth module
describe("Auth Module", () => {
  // Register
  describe("POST /register", () => {
    it("should return success if using valid data", async () => {
      await request(app)
        .post(`${prefixApi}/register`)
        .send({
          fullname: "test fullname",
          email: "test@gmail.com",
          password: "test12345",
          passwordConfirmation: "test12345",
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("should return bad request (400) if using invalid data", async () => {
      await request(app)
        .post(`${prefixApi}/register`)
        .send({})
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });
});
