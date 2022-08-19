import styled from "styled-components";
import { BiRepost } from 'react-icons/bi';
import { useState } from "react";


export default function SharesHeaderd({nameshared}){

    const [name, seName]= useState(nameshared)

    console.log(nameshared)

    console.log(name)
    return(
        <Container>
            <Icon>
                <BiRepost />
            </Icon>
        <h1>Re-posted by {name}</h1>
        </Container>
    )
}


const Container = styled.div`

height: 50px;
background-color: #1E1E1E;
border-radius: 16px 16px 0 0;


display: flex;
h1{margin-top: 10px;}

`
const Icon = styled.div`
margin-top: 10px;
margin-left: 13px;
margin-right: 6px;
`
