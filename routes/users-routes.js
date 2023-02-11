const express = require('express');
const {check} = require('express-validator');
const UserControllers= require('../Controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');


const router = express.Router();



router.get('/',UserControllers.getUsers);

router.post('/signup',
fileUpload.single('image'),
[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min:6})

],UserControllers.signup);

router.post('/login',UserControllers.login)


module.exports=router;