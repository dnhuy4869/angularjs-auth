const router = require("express").Router();
const userController = require("./user.controller.js");
const authMiddleware = require("../auth/auth.middleware.js");

router.get("/get-all", authMiddleware.verifyToken, userController.getAll);

router.get("/get-one/:id", userController.getOneById);

router.post("/create-one", userController.createOne);

router.put("/update-one/:id", userController.updateOne);

router.delete("/delete-one/:id", userController.deleteOne);

module.exports = router;