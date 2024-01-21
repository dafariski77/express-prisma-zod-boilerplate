import bcryptjs from "bcryptjs";

export const encrypt = async (password) => await bcryptjs.hash(password, 8);

export const compare = async (password, userPassword) => {
  return await bcryptjs.compare(password, userPassword);
};
