const MessageModel = require("../Models/MessageModel");

module.exports.addMsg=async (req,res,next)=>{
    try {
        const {from,to,message}=req.body;
        const data=await MessageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })
        if(data)
            return res.json({msg:"Message Added Successfully"});
        return res.json({msg:"Failed to add message"});
        
    } catch (error) {
        next(error)
        
    }
}
module.exports.getAllMsgs=async (req,res,next)=>{
    try {
        const {from,to}=req.body;
        const messages=await MessageModel.find({
            users:{
                $all:[from,to]
            }
        }).sort({updatedAt:1})
        const projectMessages=messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text
            }
        })
        res.json(projectMessages)
    } catch (error) {
        
    }

}