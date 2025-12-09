const express = require('express')
const userController = require('../controllers/userController')

const {authMiddleware, adminOnly} = require('../middlewares/auth')

const userRouter = express.Router();

userRouter.get('/', authMiddleware, adminOnly, userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.post('/register', userController.registerUser)

userRouter.post('/login', userController.loginUser )

userRouter.post('/logout', authMiddleware, userController.logoutUser)

module.exports = userRouter