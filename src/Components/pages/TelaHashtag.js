import styled from "styled-components"
import teste from "../../assets/images/test.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

/*   function RenderCard({ picture, name, link, description }) {
    return (
      <Content>
      <Principal>
      <Title> #hashtag</Title>
      
      </Principal>
      </Content>
    )
  } */

  return (
    <>

      <Container>
      <Title>
        <h2>#Hastag</h2>
      </Title>
      <Content>
        <Principal>
        <Posts>
          <CorpoPost>
            <LeftColumn>
              <img src={teste} alt="Foto de perfil" />
              <ion-icon name="heart-outline"></ion-icon>
              <p>13 likes</p>
            </LeftColumn>
            <div className="textos">
              <h5>Juvenal Juvêncio</h5>
              <p>
                Muito maneiro esse tutorial de Material UI com React, deem uma
                olhada! <span>#react</span> <span>#material</span>
              </p>
              <Link>
              <div className="infoLink">
                  <h5>Como aplicar o Material UI em um projeto React</h5>
                  <p>
                    Hey! I have moved this tutorial to my personal blog. Same
                    content, new location. Sorry about making you click
                    through to another page.
                  </p>
                  <h6>https://medium.com/@pshrmn/a-simple-react-router</h6>
                </div>
                <div className="imagemLink">
                  <img src={teste} alt="Foto de perfil" />
                </div>
              </Link>
            </div>
          </CorpoPost>
        </Posts>
        </Principal>
        <Lateral>
        <h3>trending</h3>
        <div>
          <p># javascript</p>
          <p># react</p>
          <p># react-native</p>
          <p># material</p>
          <p># web-dev</p>
          <p># mobile</p>
          <p># css</p>
          <p># html</p>
          <p># node</p>
          <p># sql</p>
        </div>
      </Lateral> 
      </Content>
      </Container>
    </>
  )
}



const Title =  styled.div`
  margin-top: 10%;
  margin-right: 52%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: left;
  h2 {
    font-size: 43px;
    font-weight: 700;
  }
`;

const Content = styled.div`
  display: flex;

`;

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
 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
  
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
const Principal = styled.div`
  width: 66%;
  display: flex;
`;

const Link = styled.div`
 border: 1px solid #4D4D4D;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    
    div.infoLink{
      width:calc(390px - 10%);
        height: 100%;
       
        h5{
            color: #CECECE;
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 5px;
        }
        p{
            color: #9B9595;
            font-size: 11px;
            font-weight: 400;
            line-height: 15px;
            margin-bottom: 10px;
        }
        h6{
            color: #CECECE;
            font-size: 11px;
            font-weight: 400;
        }
    }
    div.imagemLink{
        width: calc(100px- 20%);
        height: 160px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0 16px 16px 0;
        }
    }

@media(min-width: 563px) { 
  width:calc(390px - 10%);
  }
  @media((min-width: 414px) and (max-width: 538)) { 
  width:calc(399 - 10%);
  }//erro na view do card
`


const Lateral = styled.div`
position: fixed;
  width: 50%;
  height: 100%;
  background-color: var(--cor-header);
  border-radius: 15px;
  position: sticky;
  margin-left: 15%;
  top: 88px;
  h3 {
    display: flex;
    align-items: center;
    justify-content: left;
    border-bottom: 1px solid #484848;
    padding: 0 16px;
    height: 60px;
    font-size: 27px;
    font-weight: 700;
  }
  div {
    padding: 16px;
    p {
      font-size: 19px;
      line-height: 30px;
      font-weight: 700;
      :hover {
        cursor: pointer;
        filter: brightness(0.6);
      }
    }
  }
  @media(max-width: 728px) { 
  display: none;
  }
`;
const Posts = styled.div`
`;


