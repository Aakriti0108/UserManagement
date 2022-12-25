const express = require("express");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/jwt-auth");
const router = express.Router();

router.post("/login", userController.loginUserByEmailAndPassword);

router.post("/verify-email",userController.checkUserExists);

router.post("/add-user",userController.addUser);

router.post("/update-user", authMiddleware.authenticateToken, userController.updateUser);

router.post("/delete-user", authMiddleware.authenticateToken, userController.deleteUser);

router.get("/get-all-users", authMiddleware.authenticateToken, userController.getAllUsers);

module.exports = router;