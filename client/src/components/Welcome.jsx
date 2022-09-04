import React from 'react'
import styled from 'styled-components'

export const Welcome = ({currentUser}) => {
  return (
    <Container>
        <h2>
            Welcome to MyChat <span>{currentUser.username}</span>
        </h2>
        <h5>
            Select a chat To start Messaging
        </h5>


    </Container>
  )
}
const Container=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:white;
    gap:2rem;
`;
