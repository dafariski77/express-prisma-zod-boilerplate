const register = z.object({
  body: z
    .object({
      fullName: z.string({
        required_error: "Fullname required!",
      }),
      email: z
        .string({
          required_error: "Email is required!",
        })
        .email("Email not valid!"),
      password: z.string({ required_error: "Password is required!" }),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required!",
      }),
    })
    .required({
      email: true,
    }),
});

export default {
  register,
};
