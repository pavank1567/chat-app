const { addMsg, getAllMsgs } = require("../Controllers/MessagesController");

const router=require("express").Router();
router.post('/addmsg',addMsg)
router.post('/getmsg',getAllMsgs)
module.exports=router;