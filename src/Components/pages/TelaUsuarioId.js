import styled from "styled-components"
import { Link,useParams } from "react-router-dom";
import teste from "../../assets/images/test.png";
import ModificarCartao from "./Icon.js";
import { useRef } from "react";
import DeletarIcon from "./DeletarIcon.js"
import { useEffect, useState } from "react";
import axios from 'axios';



export default function TelaUsuarioId() {
  const [data, setData] = useState([])
  const [nome, setNome] = useState("")
  const [ranking, setRanking] = useState([])
  const { user_id } = useParams()
  const [cartaoId, setCartaoId] = useState("");
  const [texto, setTexto] = useState(false);
  const TextoRef = useRef("");
  const [ativar, setAtivar] = useState(false);

  useEffect(() => {
    const promise = axios.get(`http://localhost:6002/users/${user_id}`)
    promise.then((response) => {
      console.log(response.data)
      setNome(response.data[0].name)
      setData(response.data)

    });
    promise.catch((erro) => {
      console.log(erro)
    })
  }, [user_id])

  useEffect(() => {
    const promise = axios.get(`http://localhost:6002/hastags`)
    promise.then((response) => {
      console.log(response.data)
      setRanking(response.data)

    });
    promise.catch((erro) => {
      console.log(erro)
    })
  }, [])

  async function editarPost() {
    setTexto(true);
    try {
        await axios.put(`http://localhost:6002/post/${cartaoId}`, {
            description: TextoRef.current.value
        });

        console.log(TextoRef.current.value);
        setAtivar(false);
    } catch (e) {
      console.log(e)
        alert("Não foi possível salvar as alterações!");
        setTexto(false);
    }
}


const handleUserKeyPress = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      editarPost();
  }
};


  function RenderCard({ id, picture,post_id, name, userId, link, description }) {
    return (
      <CorpoPost>
        <LeftColumn>
          <Link to={`/users/${userId}`}>
            <img src={picture} alt="Foto de perfil" />
          </Link>
          <ion-icon name="heart-outline"></ion-icon>
          <p>13 likes</p>
        </LeftColumn>
        <div className="textos">
          <Modificar>
            <h5>{name}</h5>
            <div>
              <ModificarCartao
                ativar={ativar}
                setAtivar={setAtivar}
                texto={texto}
                setTexto={setTexto}
                TextoRef={TextoRef}
                setCartaoId={setCartaoId}
                postId={post_id} />
              <DeletarIcon postId={post_id} userId={userId} />
            </div>
          </Modificar>
          {ativar && post_id === cartaoId ?
            <Texto
                ativar={ativar}
                type="text"
                style={{ color: '#4C4C4C' }}
                onKeyPress={handleUserKeyPress}
                readOnly={texto}
                ref={TextoRef}
                defaultValue={description}>
              </Texto>
        :
        <p>
                {description}
              </p>
          }

          <LinkStyled>
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
          </LinkStyled>
        </div>
      </CorpoPost>
    )
  }

  return (
    <>

      <Container>
        <Title>
          <h2>{nome}'s Posts</h2>
        </Title>
        <Content>
          <Principal>
            <Posts>
              {data.map((e, index) => {
                console.log(e)
                return (
                  <RenderCard
                    picture={e.picture}
                    name={e.name}
                    description={e.description}
                    link={e.link}
                    post_id={e.post_id}
                    index={index}
                    userId={e.id}
                  />
                )

              })}
            </Posts>
          </Principal>
          <Sidebar>
            <h3>trending</h3>
            <div>
              {ranking.map((e, index) => {
                return (
                  <Hastag
                    key={index}
                    to={`/hashtag/${e.name}`}
                  >
                    {`# ${e.name}`}
                  </Hastag>)
              })}
            </div>
          </Sidebar>
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

 const Hastag = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 0.05em;
    margin-top: 1px;
` 

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
overflow-y: hidden;
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

const Principal = styled.div`
  width: 66%;
  display: flex;
`;

const LinkStyled = styled.div`
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


const Sidebar = styled.div`
  width: 50%;
  margin-top: 8%;
  height: 100%;
  background-color: var(--cor-header);
  border-radius: 15px;
  position: sticky;
  margin-left: 25%;
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

const Modificar = styled.div`
display: flex;
justify-content: space-between;

 img{
   width: 15.95px;
   height: 15.98px;
 }
 div{
   display: flex;
 }
`
const Texto = styled.textarea`
    width: calc(100% - 108px);
    height: 44px;
    border: none;
    border-radius: 7px;
    margin-top: 11px;
    background-color: ${(props) => (props.ativar ? '#FFFFFF' : '#171717')}
`;

