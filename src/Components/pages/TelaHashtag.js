import styled from "styled-components"
import { useState } from "react";

export default function TelaHashtag() {

    return (
        <>
            <Title>nome hashtag</Title>
            <Container>
                <CorpoPost>
                    <LeftColumn>
                        <h2>foto</h2>
                        <h2>+</h2>
                        <h2>likes</h2>
                    </LeftColumn>
                    <rightColumn>
                        <User>Juvenal Juvêncio </User>
                        <Description>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</Description>
                       <Link>
                           <h2>linkj</h2>
                       </Link>
                    </rightColumn>
                </CorpoPost>
            </Container>
        </>
    )
}

const Title = styled.h1`
margin-top: 20px;
`

const CorpoPost =  styled.div`
display: flex;
height: 232px;
padding-left:3%;
padding-right:3%;
background-color: #171717;
margin-top: 29px;
padding-top: 1%;
justify-content: space-around;

  @media(min-width: 556px) {
    background-color: #171717;
    width: 611px;
    border-radius: 16px;
    
  
  }

`
const LeftColumn =styled.div`
margin-right: 15%;
margin-left: 5%;
`

const RightColumn =styled.div`

`

const Container = styled.div`
  @media(min-width: 556px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
  }

`
const User = styled.h2`
@media(min-width: 556px) {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom: 1%;
  }

`

const Description = styled.h2`
  @media(min-width: 556px) { 
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
  }

`
const Link = styled.div`
height: 150px;
background-color: pink;
border-radius:11px;
`