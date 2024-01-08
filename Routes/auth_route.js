//Login and Signup Routes

const express = require('express');
const router = express.Router();

const {Signup,Login} = require('../Controller/auth_logic');
const {home, auth} =require("../Middleware/auth_after");


router.post("/signup", Signup);
router.post("/login", Login)





module.exports = router;



