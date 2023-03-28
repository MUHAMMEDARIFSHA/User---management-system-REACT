var express = require('express');
const userControlls = require('../controllers/userController');
const router = express.Router();
const {verifyToken,getData,updateProfile} = require('../controllers/userController')
const userMiddleware = require('../middleware/userMiddleware')



/* GET users listing. */


router.get('/',userControlls.getHome)

router.post('/signup',userControlls.register)
router.post('/signin',userControlls.signin)
router.get('/quote',verifyToken,getData)
// router.post('/quote'.userController.getData)
// router.patch('/update',verifyToken,updateProfile)
router.patch('/update', verifyToken, userMiddleware.upload.single('image'), updateProfile)

module.exports = router