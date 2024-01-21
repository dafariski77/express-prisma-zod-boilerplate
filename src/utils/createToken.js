export const createTokenUser = (user) => {
  return {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    otp: user.otp,
    isVerified: user.isVerified,
  };
};
