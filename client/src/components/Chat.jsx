import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import { Contacts } from './Contacts';
import { Welcome } from './Welcome';
import {ChatContainer} from './ChatContainer'
import {io} from 'socket.io-client'

export const Chat = () => {

  const socket=useRef()

  const navigate=useNavigate();

  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState();
  const [currentChat,setCurrentChat]=useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate('/login')
    }
    else{
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
      setIsLoaded(true)
    }
  },[])
  useEffect(()=>{    
    const getUsers=async ()=>{
      if(currentUser){

        const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      }
    }
    getUsers()
    
  },[currentUser])

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id)
    }

  },[currentUser])

  const handleChange=(chat)=>{
      setCurrentChat(chat);
  }
  return (
    <>
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} chatChange={handleChange}/>     
        {
          isLoaded && currentChat===undefined ?(
            <Welcome currentUser={currentUser} /> 
            
          ) : (
            isLoaded?
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
            :""
          )

        }   
      </div>
    </Container>
    
    </>
  )
}
const Container=styled.div`
  height:100vh;
  width:100vw;
  background:black;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background-color:#fff;
  .container{
    padding:0;
    height:85vh;
    width:85vw;
    background-color:#c5c6c8;
    display:grid;
    grid-template-columns:30% 70%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns:35% 65%
    }

  }
`;