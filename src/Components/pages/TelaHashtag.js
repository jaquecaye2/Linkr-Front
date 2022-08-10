import styled from "styled-components"
import teste from "../../assets/images/test.png";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from 'axios';

export default function TelaHashtag() {
  const [data, setData] = useState([])
  const { hastag } = useParams();

  useEffect(() => {
    const promise = axios.get(`http://localhost:6002/hastag/React`)
    promise.then((response) => {
        console.log(response.data)
        setData(response.data)
      
    });
    promise.catch((erro) => {
        console.log(erro)
    })
}, [])

  function RenderCard({picture,name,link,description}) {
    return (
      <CorpoPost>
        <LeftColumn>
          <img src={picture} alt="foto do link" />
          <ion-icon name="heart-outline"></ion-icon>
          <p> 13 likes</p>
        </LeftColumn>
        <rightColumn>
          <User>{name}</User>
          <Description>{description}</Description>
          <Link>
            <img src={link} alt="foto do link" />
          </Link>
        </rightColumn>
      </CorpoPost>
    )
  }

  return (
    <>
      <Title> #hashtag</Title>
      <Container>
        {data.map((e, index) => {
          return (
            <RenderCard
            picture={e.picture}
              name={e.name}
              description={e.description}
              link={e.link}
            />
          )

        })}
      </Container>
    </>
  )
}

const Title = styled.h1`
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 64px;
color: #FFFFFF;

margin-left: 5%;

@media(max-width: 796px) {
    margin-top: 27%;  
  }

@media(max-width: 804px) {
    margin-top: 20%;  
  }


@media(min-width: 1024px) {
    margin-top: 10%;  
  }

`

const CorpoPost = styled.div`
display: flex;
height: 232px;
width: 100vw;
padding-left:3%;
padding-right:3%;
background-color: #171717;
padding-top: 1%;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 60px;
    margin-right: 18px;
  }



@media(max-width: 796px) {
    background-color: #171717;
    margin-top: 15%;  
  }

  @media(min-width: 556px) {
    background-color: #171717;
    width: 611px;
    border-radius: 16px;
  }


  @media(min-width: 1024px) {
   margin-top: 10%;
  }

`
const LeftColumn = styled.div`
margin-right: 15%;
margin-left: 5%;
display: flex;
flex-direction: column;
p{
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;
  text-align: center;
  color: #FFFFFF;
  margin-right: calc(30px - 20%);
  margin-top: 12px;
}
ion-icon{
        font-size: 20px;
       margin-left: calc(30px - 20%);
       margin-top: 17px;
        :hover{
            cursor: pointer;
        }
    }
`

const RightColumn = styled.div`

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

const Description = styled.p`
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
background-color: #171717;
border-radius:11px;
border: 1px solid #4D4D4D;
@media(min-width: 563px) { 
  width:calc(390px - 10%);
  }
  @media((min-width: 414px) and (max-width: 538)) { 
  width:calc(399 - 10%);
  }//erro na view do card

`