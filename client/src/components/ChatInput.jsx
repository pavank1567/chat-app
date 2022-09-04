import React,{useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

export const ChatInput = ({handleSendMsg}) => {

    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [msg,setMsg]=useState("")

    const handleEmojiPicker=()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick=(event,emoji)=>{
        let message=msg;
        message+=emoji.emoji;
        setMsg(message);

    }
    const sendChat=(e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg("");
        }
    }
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPicker}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={sendChat}>
            <input type="text" className='form-control' placeholder='Type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)} />
            <button className='btn btn-sm btn-primary submit'>
                <IoMdSend/>
            </button>

        </form>

    </Container>
  )
}
const Container=styled.div`
    display:grid;
    grid-template-columns:5% 95%;
    align-items:center;
    justify-content:center;
    background-color:#e0e0e0;
    padding:0 2rem;
    padding-bottom:0.3rem;

    .button-container{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        .emoji{
            position:relative;
            svg{
                font-size:1.5rem;
                color:gray;
                cursor:pointer;
            }
        }
    }
    .input-container{
        display:flex;
        align-items:center;
        gap:0.4rem;
        input{
            width:90%;
            background-color:#c5c6c8;
            border:none;
            padding-left:1rem;
            font-size:1.2rem;
            &::selection{
                background-color:gray;
            }
            &:focus{
                outline:none;
            }
        }
        button{
            padding:0.3rem 1.2rem;
            border-radius:50%;
            display:flex;
            justify-content:center;
            align-items:center;
            background-color:blue;
            padding:0.7rem 1rem;
            font-size:1.3rem;
            border:none;

            }
        }
        .emoji-picker-react{
            position:absolute;
            top:-250px;
            box-shadow:none;
            border:none;
            background-color:#e0e0e0;
            height:220px;
            .emoji-search{
                background-color:transparent;
                border-color:rgba(0,0,0,0.3);
                height:2rem;
            }
            .emoji-group:before{
                background-color:#e0e0e0;
                color:rgba(0,0,0,0.5);
            }
        }
    }
`;
