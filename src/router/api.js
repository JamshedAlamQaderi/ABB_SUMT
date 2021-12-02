const router = require('express').Router()
const adminRouter = require('./admin_router')
const authRouter = require('./auth_router')
const authRepository = require('../repository/AuthRepository')

router.use("/auth", authRouter)
router.use("/admin", authRepository.authenticateToken, adminRouter)


module.exports = router