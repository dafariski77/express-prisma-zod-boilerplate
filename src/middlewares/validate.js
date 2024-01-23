import zodError from "../lib/zod.js";

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: zodError(error),
      data: null,
    });
  }
};

export default validate;
