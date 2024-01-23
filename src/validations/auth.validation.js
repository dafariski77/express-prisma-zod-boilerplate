import { z } from "zod";

const register = z.object({
  body: z.object({
    fullname: z.string({
      required_error: "Fullname perlu diisi!",
    }),
    email: z
      .string({
        required_error: "Email perlu diisi!",
      })
      .email("Email tidak valid!"),
    password: z.string({ required_error: "Password perlu diisi!" }),
    passwordConfirmation: z.string({
      required_error: "Password confirmation perlu diisi!",
    }),
  }),
});

const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email perlu diisi!",
      })
      .email("Email tidak valid!"),
    password: z.string({ required_error: "Password perlu diisi!" }),
  }),
});

export default {
  register,
  login,
};
