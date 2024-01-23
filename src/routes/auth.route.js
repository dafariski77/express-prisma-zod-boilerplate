import express from "express";
import passport from "passport";
import { authController } from "../controllers/index.js";
import { useGoogleStrategy } from "../lib/passport.js";
// import validate from '../middlewares/validate.js'

const router = express.Router();

// router.post('/register', validate(authValidation.register), authController.register);

useGoogleStrategy();

router.get("/google", authController.getGoogleUrl);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.googleCallback
);

export default router;
