const User=require('../Models/userModel');
const bcrypt=require('bcrypt')
const fs=require('fs')
const buffer=require('buffer')

module.exports.register=async (req,res,next)=>{

    try{
        const {username,email,password}= req.body;
        const usernameCheck=await User.findOne({username});
        if(usernameCheck)
            return res.json({msg:"Username already used",status:false})

        const emailCheck=await User.findOne({email});
        if(emailCheck)
            return res.json({msg:"Email already used",status:false})
        const hashPassword=await bcrypt.hash(password,10);

        const image=fs.readFileSync('default.png')

        const buffer=new Buffer.from(image)
        const user=await User.create({
            email,
            username,
            password:hashPassword,
            avatarImage:buffer.toString("base64")
        })
        delete user.password;
        return res.json({status:true,user});
    }catch(ex){
        next(ex);
    }
};

module.exports.login=async (req,res,next)=>{
    console.log(req.body)
    try{
        const {email,password}= req.body;
        const user=await User.findOne({email});
        
        if(!user){
            return res.json({msg:"Incorrect Details",status:false})
        }

        const isPswdCorrect=await bcrypt.compare(password,user.password);
        if(!isPswdCorrect){
            return res.json({msg:"Incorrect Details"})
        }
        delete user.password;
        return res.json({status:true,user});
    }catch(ex){
        next(ex);
    }
};

module.exports.getAllusers=async (req,res,next)=>{
    try {
        const users= await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
        console.log(error)
        next(error)
    }
};