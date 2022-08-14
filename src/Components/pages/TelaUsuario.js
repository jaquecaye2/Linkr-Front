import { useContext } from "react";
import Context from "../../Context/Context";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import loading from "../../assets/images/loading.svg";
import { useRef } from "react";
import axios from "axios";
import DeletarIcon from "./DeleteIcon.js";
import IconEdit from "./IconEdit.js";
import ReactTooltip from "react-tooltip";

const API_URL = process.env.REACT_APP_API_URL;

function Hashtag({ hashtag }) {
  const navigate = useNavigate();

  function openHashtag() {
    navigate(`/hastags/${hashtag.name}`);
  }

  return <p onClick={openHashtag}># {hashtag.name}</p>;
}

function Side() {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/hastags`)
      .then(({ data }) => {
        setHashtags(data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <SideContainer>
      <h3>trending</h3>
      <div>
        {hashtags.map((hashtag, index) => (
          <Hashtag key={index} hashtag={hashtag} />
        ))}
      </div>
    </SideContainer>
  );
}


function MainContent({setUserName}) {
  const {updateUser, setUpdateUSer} = useContext(Context)
  const { id } = useParams();
  setUpdateUSer(id)
  const TextoRef = useRef("");
  const [texto, setTexto] = useState(false);
  const [ativar, setAtivar] = useState(false);
  const [cartaoId, setCartaoId] = useState("");
  const navigate = useNavigate();
  const [render , setRender] = useState(false)
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  async function editarPost() {
    setTexto(true);
    setRender(true)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${API_URL}/post/${cartaoId}`, {
        description: TextoRef.current.value,
      }, config,);

      console.log(TextoRef.current.value);
      setAtivar(false);
      renderizarPosts()
    } catch (e) {
      console.log(e);
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


  const tagStyle = {
    color: "#ffffff",
    fontWeight: "700",
  };

  function navigateToHashtag(tag) {
    const target = tag.replace("#", "");
    navigate(`/hashtag/${target}`);
  }

  function renderizarPosts(){
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${API_URL}/users/${id}`, config)
      .then(({ data }) => {
        console.log(data);
         setUserName(data[0].name)
        setPosts(data);
        setRender(data.length)
        setIsLoading(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  useEffect(() => {
    renderizarPosts()
  }, [updateUser]);

  if (userId === id) {
 
    return (
      <Main>
        {isLoading ? (
          <LoadingSpinner>
            <img src={loading} alt="carregando..." />
          </LoadingSpinner>
        ) : (
          <>
            {posts.map((post, index) => (
              <PostContainer>
                <div className="icones">
                  <img src={post.picture} alt="Foto de perfil" />
                  <ion-icon name="heart-outline"></ion-icon>
                  <p>13 likes</p>
                </div>
                <div className="textos">
                  <Modificar>
                    <h5>{post.name}</h5>
                    <div>
                      <IconEdit
                        ativar={ativar}
                        setAtivar={setAtivar}
                        texto={texto}
                        setTexto={setTexto}
                        TextoRef={TextoRef}
                        setCartaoId={setCartaoId}
                        postId={post.post_id}
                        render={render}
                      />
                      <DeletarIcon token={token} postId={post.post_id} renderizarPosts={renderizarPosts} render={render}/>
                    </div>
                  </Modificar>
                  {ativar && post.post_id === cartaoId ? (
                    <Texto
                      ativar={ativar}
                      type="text"
                      style={{ color: "#4C4C4C" }}
                      onKeyPress={handleUserKeyPress}
                      readOnly={texto}
                      ref={TextoRef}
                      defaultValue={post.description}
                    ></Texto>
                  ) : (
                    <p>
                      <ReactTagify
                        tagStyle={tagStyle}
                        tagClicked={(tag) => navigateToHashtag(tag)}
                      >
                        {post.description}
                      </ReactTagify>
                    </p>
                  )}

                  <InfoLink>
                    <div className="infoLink">
                      <h5>{post.link_title}</h5>
                      <p>{post.link_description}</p>
                      <h6>{post.link}</h6>
                    </div>
                    <div className="imagemLink">
                      <img
                        src={post.link_image}
                        alt="Imagem referente ao link"
                      />
                    </div>
                  </InfoLink>
                </div>
              </PostContainer>
            ))}
          </>
        )}
      </Main>
    );
  }
  if (userId !== id) {
    return (
      <Main>
        {isLoading ? (
          <LoadingSpinner>
            <img src={loading} alt="carregando..." />
          </LoadingSpinner>
        ) : (
          <>
            {posts.map((post, index) => (
              <PostContainer>
                <div className="icones">
                  <img
                    onClick={() => navigate(`/user/${post.user_id}`)}
                    src={post.picture}
                    alt="Foto de perfil"
                  />
                  <ion-icon name="heart-outline"></ion-icon>
                  <p>13 likes</p>
                </div>
                <div className="textos">
                  <Modificar>
                    <h5>{post.name}</h5>
                  </Modificar>
                  <p>
                    <ReactTagify
                      tagStyle={tagStyle}
                      tagClicked={(tag) => navigateToHashtag(tag)}
                    >
                      {post.description}
                    </ReactTagify>
                  </p>
                  <InfoLink>
                    <div className="infoLink">
                      <h5>{post.link_title}</h5>
                      <p>{post.link_description}</p>
                      <h6>{post.link}</h6>
                    </div>
                    <div className="imagemLink">
                      <img
                        src={post.link_image}
                        alt="Imagem referente ao link"
                      />
                    </div>
                  </InfoLink>
                </div>
              </PostContainer>
            ))}
          </>
        )}
      </Main>
    ); 
  }
  if (posts.length === 0) {
    return (
      <Aviso>
        <h1>No Posts Yet</h1>
      </Aviso>
    )
  }
}

export default function TelaUsuario() {
   const [userName , setUserName] = useState("") 
  return (
    <Container>
      <Title>
        <h2>{userName}</h2>
      </Title>
      <Content>
        <MainContent setUserName={setUserName}  />
        <Side />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  margin: 72px auto 0 auto;
  @media (max-width: 935px) {
    margin: 50px auto;
  }
  @media (max-width: 614px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const Title = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: left;
  @media (max-width: 614px) {
    height: 100px;
  }
  h2 {
    font-size: 43px;
    font-weight: 700;
    @media (max-width: 614px) {
      font-size: 33px;
      padding: 0 20px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 935px) {
    flex-direction: column;
  }
`;

const Main = styled.div`
  width: 66%;
  @media (max-width: 935px) {
    width: 100%;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--cor-header);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  @media (max-width: 614px) {
    border-radius: 0;
  }
  div.icones {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: baseline;
    flex-direction: column;
    margin-right: 18px;
    img {
      width: 53px;
      height: 53px;
      object-fit: cover;
      border-radius: 60px;
      margin-bottom: 15px;
      :hover {
        cursor: pointer;
      }
    }
    ion-icon {
      font-size: 20px;
      :hover {
        cursor: pointer;
      }
    }
    p {
      margin-top: 5px;
      text-align: center;
      font-size: 11px;
    }
  }
  div.textos {
    width: 87%;
    h5 {
      font-size: 19px;
      font-weight: 400;
      margin-bottom: 5px;
      :hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    p {
      margin-bottom: 15px;
      span {
        color: #b7b7b7;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
      }
    }
    span {
      color: #ffffff;
      font-weight: 700;
    }
  }
`;

const InfoLink = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #4d4d4d;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div.infoLink {
    width: 70%;
    height: 100%;
    padding: 25px 16px;
    h5 {
      color: #cecece;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    p {
      color: #9b9595;
      font-size: 11px;
      font-weight: 400;
      line-height: 15px;
      margin-bottom: 10px;
      word-break: break-word;
    }
    h6 {
      color: #cecece;
      font-size: 11px;
      font-weight: 400;
      overflow: hidden;
    }
    :hover {
      cursor: pointer;
    }
  }
  div.imagemLink {
    width: 30%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0 16px 16px 0;
    }
  }
`;

const SideContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: var(--cor-header);
  border-radius: 15px;
  position: sticky;
  top: 88px;
  @media (max-width: 935px) {
    width: 100%;
    margin-bottom: 50px;
  }
  @media (max-width: 614px) {
    border-radius: 0;
  }
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
`;
const Modificar = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 15.95px;
    height: 15.98px;
  }
  div {
    display: flex;
    margin-left: 3px;
  }
`;
const Texto = styled.textarea`
  width: calc(100% - 108px);
  height: 44px;
  border: none;
  border-radius: 7px;
  margin-top: 11px;
  background-color: ${(props) => (props.ativar ? "#FFFFFF" : "#171717")};
`;

const Aviso = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50%;
h1{
  color: #9b9595;
      font-size: 20px;
      font-weight: 400;
      line-height: 15px;
      margin-bottom: 10px;
     
}



`
