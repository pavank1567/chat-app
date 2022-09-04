import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
export const Contacts = ({contacts,currentUser,chatChange}) => {
    const [currentUserName,setCurrentUserName]=useState();
    const [currentUserImage,setCurrentUseerImage]=useState();
    const [currentSelected,setCurrentSelected]=useState();

    useEffect(()=>{
      if(currentUser){
        setCurrentUseerImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
      }
    },[currentUser,contacts])
    const changeCurrentChat=(index,contact)=>{
      setCurrentSelected(index);
      chatChange(contact);


    }
  return (
    
    <>
    {currentUserImage && currentUserName &&(
      <Container>
          <div className="contacts">
            {
              contacts.map((contact,index)=>{
                return (               
                  <> 
                      <div className={`contact ${
                        index === currentSelected ? "selected" : "" }`
                      } key={index}
                        onClick={()=>{changeCurrentChat(index,contact)}}>
                          <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                          </div>
                          <div className="username font-link">
                            <h4>{contact.username}</h4>
                          </div>
                      </div>
                  </>
                )
              })
            }
           
          </div>
          <div className="current-user">
              <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
              </div>
              <div className="username font-link">
                      <h2>{currentUserName}</h2>
              </div>
          </div>

      </Container>

    )}
    
    </>
  )
}
const Container=styled.div`
  display:grid;
  grid-template-rows:78% 15%;
  overflow:hidden;
  background-color:#e0e0e0;
  max-height:100vh;
  gap:2rem; 
  .contacts{
    margin-top:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto; 
    .contact{
      border-top:1px solid rgba(0,0,0,0.3);
      min-height:4.5rem;
      width:95%;
      cursor:pointer;
      padding:0.5rem;
      gap:1rem;
      display:flex;
      transition:0.5s ease-in-out;
      .avatar{
        img{
          height:3rem;
        }
      }
    }
    .contact:hover{
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .avatar{
    img{
      height:4rem;
      border-radius:50%;
    }
  }
  .font-link{
    font-family: 'Poppins', sans-serif;
  }
  .username{
    display:flex;
    align-items:center;
  }
  .current-user{
    display:flex;
    padding:0.5rem;
    gap:1rem;
    background: aliceblue;
  }
  .selected{
    background-color:rgba(0, 0, 0, 0.2);
  }


`;