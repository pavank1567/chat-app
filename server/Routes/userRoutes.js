const { register, login, getAllusers } = require("../Controllers/usersController");

const router=require("express").Router();
router.post('/register',register)
router.post('/login',login)
router.get('/allusers/:id',getAllusers)
module.exports=router;