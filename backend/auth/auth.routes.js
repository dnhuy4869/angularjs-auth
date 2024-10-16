const router = require("express").Router();
const authController = require("./auth.controller.js");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

router.post("/verify-email", authController.verifyEmail);

module.exports = router;