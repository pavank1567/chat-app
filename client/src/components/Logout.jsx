import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaPowerOff} from 'react-icons/fa'
import styled from 'styled-components'

export const Logout = () => {
    const navigate=useNavigate();
    const handleClick=async()=>{
        localStorage.clear();
        navigate('/login')
    }
  return (
    <>
    <Button onClick={handleClick}>
      <FaPowerOff />
    </Button>
    </>
  )
}
const Button=styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  height:3rem;
  width:3rem;
  border-radius:50%;
  background-color:#9a86f3;
  border:none;
  cursor:pointer;
  svg{
    font-size:1.3rem;
    color:#ebe7ff;
  }

`;
