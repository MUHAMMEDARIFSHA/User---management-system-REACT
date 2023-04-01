const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const {verifyAdminToken} = require('../controllers/adminController')
const userMiddleware = require('../middleware/userMiddleware')


router.get("/get-users",verifyAdminToken, adminController.getUsers)
router.patch("/delete-user", adminController.deleteUser)
router.get('/user-edit/:id', adminController.getUserForEdit)
router.put('/user-edit/:id', adminController.editUser)
router.post('/signin',adminController.signIn)
router.post("/adduser",verifyAdminToken,userMiddleware.upload.single('image'),adminController.addUser)
router.post('/search',adminController.searchUser)





module.exports= router