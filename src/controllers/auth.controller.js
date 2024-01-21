const register = (req, res, next) => {
  try {
    return res.send("hello");
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
