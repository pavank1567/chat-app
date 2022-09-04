const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes=require('./Routes/userRoutes')
const messagesRoutes=require('./Routes/MessagesRoutes')
const socket=require("socket.io")

const app=express();

require("dotenv").config();

app.use(cors(({ origin: ['http://localhost:3000'], credentials: true })));
app.use(express.json());

//api
app.use('/api/auth',userRoutes)
app.use('/api/messages',messagesRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connected Successfully");
}).catch((err)=>{
    console.log(err.message);
})

const PORT=process.env.PORT || 5000
const server=app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})


const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
})

global.onlineUsers=new Map()

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})