import styled from "styled-components"
import teste from "../../assets/images/test.png";

export default function TelaHashtag() {

  return (
    <>
      <Title> #hashtag</Title>
      <Container>
        <CorpoPost>
          <LeftColumn>
            <img src={teste} alt="foto do link" />
            <ion-icon name="heart-outline"></ion-icon>
            <p> 13 likes</p>
          </LeftColumn>
          <rightColumn>
            <User>Juvenal Juvêncio </User>
            <Description>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</Description>
            <Link>
              <img src="link" alt="foto do link" />
            </Link>
          </rightColumn>
        </CorpoPost>
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
padding-left:3%;
padding-right:3%;
background-color: #171717;
padding-top: 1%;
justify-content: space-around;
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
p{
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;
  text-align: center;
  color: #FFFFFF;
  margin-right: calc(40px - 20%);
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
border: 1px solid #4D4D4D
`