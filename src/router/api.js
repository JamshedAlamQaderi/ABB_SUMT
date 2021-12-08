const express = require("express");
const router = express.Router();
const authRepository = require("../repository/AuthRepository");
const adminRouter = require("./admin_router");
const authRouter = require("./auth_router");
const userRouter = require("./user_router");

router.use("/profile_image", express.static("public/user_images"));
router.use("/auth", authRouter);
router.use("/admin", authRepository.authenticateToken, adminRouter);
router.use("/user", authRepository.authenticateToken, userRouter);

module.exports = router;
