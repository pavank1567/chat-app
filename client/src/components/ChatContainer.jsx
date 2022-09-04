import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import { ChatInput } from './ChatInput';
import { Logout } from './Logout';
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from 'uuid';

export const ChatContainer = ({currentChat,currentUser,socket}) => {

    const [messages,setMessages]=useState([])
    const [arrivalMsg,setArrivalMsg]=useState(null)
    const scrollRef=useRef();

    useEffect(()=>{
        if(currentChat){
            const callres=async ()=>{
           
                const response=await axios.post(getAllMessagesRoute,{
                    from:currentUser._id,
                    to:currentChat._id,
                })
                setMessages(response.data)
            }
            callres()
        }
       

    },[currentChat,currentUser])

    const handleSendMsg=async (msg)=>{
        await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg
        })
        const msgs=[...messages]
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve",(msg)=>{
                setArrivalMsg({fromSelf:false,message:msg})
            })
        }
    },[])
    useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg])
    },[arrivalMsg])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])
  return (
    <Container>
        <div className="chat-header shadow-sm">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
                </div>
                <div className="username font-link">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <div className="logout d-flex">
             <Logout/>
            </div>

        </div>
        <div className="chat-messages">
            {
                messages.map((message)=>{
                    return(
                        <>
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf?"sent":"recieved"}`}>
                                <div className="content d-flex">
                                    <p className='w-100'>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })
            }

        {/* <Messages/> */}
        </div>
        
        <ChatInput handleSendMsg={handleSendMsg}/>

    </Container>
  )
}
const Container=styled.div`
    display:grid;
    grid-template-rows:13vh 60vh 13vh;
    max-height:100vh;
    .chat-header{
        display:grid;
        grid-template-columns:85% 15%;
        overflow:hidden;
        background-color:#e0e0e0;
        gap:2rem;
    }
    .user-details{
        gap:2rem;
        display:flex;
        padding:1rem;
    }
    .logout{
        align-items:center;
        justify-content:center;
        margin-right:5px;
    }
    .avatar{
        img{
        height:3.5rem;
        border-radius:50%;
        }
    }
    .username{
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .font-link{
        font-family: 'Montserrat', sans-serif;
    }
   .chat-messages{
       padding:1rem 2rem;
       display:flex;
       flex-direction:column;
       gap:1rem;
       background-color:#c5c6c8;
       overflow:auto;
       .message{
           display:flex;
           align-items:center;
           .content{
               align-items:center;
               max-width:40%;
               min-width:10%;
               overflow-wrap:break-word;
               padding:0.5rem 0.5rem 0rem 0.5rem;
               font-size:1.1rem;
               border-radius:0.6rem;
           } 
       }
       .sent{
            align-items:center;
            justify-content:flex-end;  
            .content{
                background-color:#7952b3;
            }

        }
        .recieved{
            .content{
                background-color:#2192c0;
            }
        }
   }


`;
