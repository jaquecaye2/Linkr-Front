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
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import CommentsIcon from "./commentIcon";
import Chat from "../shared/comment.js";
import InfiniteScroll from "./InfiniteScroll";
import { ThreeDots } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_API_URL;

function RenderIf({ isTrue, children }) {
  return <>{isTrue ? children : null}</>;
}

function Post({ post, token, renderizarPosts, userId, id, postsCurtidos }) {
  const [texto, setTexto] = useState(false);
  const [ativar, setAtivar] = useState(false);
  const TextoRef = useRef("");
  const [cartaoId, setCartaoId] = useState("");
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [enableTextArea, setEnableTextArea] = useState(false);
  const [chat, setChat] = useState(false);
  const [comment, setComment] = useState(false);

  const [tipoCoracao, setTipoCoracao] = useState("heart-outline");
  const [corCoracao, setCorCoracao] = useState("black");
  const [quantLikes, setquantLikes] = useState(0);
  let namesLike = [];
  const [mensagem, setMensagem] = useState("");

  const name = localStorage.getItem("name");

  const tagStyle = {
    color: "#ffffff",
    fontWeight: "700",
  };

  async function editarPost() {
    setEnableTextArea(false);
    setTexto(true);
    setRender(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:6002/post/${cartaoId}`,
        {
          description: TextoRef.current.value,
        },
        config
      );

      console.log(TextoRef.current.value);
      setAtivar(false);
      renderizarPosts();
    } catch (e) {
      console.log(e);
      alert("Não foi possível salvar as alterações!");
      setTexto(false);
      setEnableTextArea(true);
    }
  }

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      editarPost();
    }
  };

  function navigateToHashtag(tag) {
    const target = tag.replace("#", "");
    navigate(`/hashtag/${target}`);
  }

  function likePost() {
    if (tipoCoracao === "heart-outline") {
      setTipoCoracao("heart");
      setCorCoracao("danger");
    }
    if (tipoCoracao === "heart") {
      setTipoCoracao("heart-outline");
      setCorCoracao("black");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let dadosPost = {};

    if (tipoCoracao === "heart-outline") {
      dadosPost = {
        id: post.id,
        type: "like",
      };
    } else {
      dadosPost = {
        id: post.id,
        type: "deslike",
      };
    }

    const promise = axios.post(`http://localhost:6002/like`, dadosPost, config);

    promise
      .then((response) => {
        showQuantLikes();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function showQuantLikes() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const dadosPost = {
      id: post.id,
    };

    const promise = axios.post(
      `http://localhost:6002/likes`,
      dadosPost,
      config
    );

    promise
      .then((response) => {
        setquantLikes(response.data.length);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function nameLiked() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const dadosPost = {
      id: post.post_id,
    };

    const promise = axios.post(
      `http://localhost:6002/likes`,
      dadosPost,
      config
    );

    promise
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let elemento = response.data;
          namesLike.push(elemento[i].name);
        }
        mensagemMostrada();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function limparNomes() {
    namesLike = [];
  }

  function mensagemMostrada() {
    if (namesLike.length === 0) {
      setMensagem("Seja o primeiro a curtir");
    } else {
      let posicao = 0;
      let curti = false;

      for (let i = 0; i < namesLike.length; i++) {
        if (namesLike[i] === name) {
          curti = true;
          posicao = i;
        }
      }

      if (namesLike.length === 1 && curti === true) {
        setMensagem("Curtido por você");
      } else if (namesLike.length === 1 && curti === false) {
        setMensagem(`Curtido por ${namesLike[0]}`);
      } else if (namesLike.length === 2 && curti === false) {
        setMensagem(`Curtido por ${namesLike[0]} e ${namesLike[1]}`);
      } else if (namesLike.length === 2 && curti === true) {
        for (let i = 0; i < namesLike.length; i++) {
          if (namesLike[i] !== posicao) {
            setMensagem(`Curtido por você e ${namesLike[i]}`);
          }
        }
      } else if (namesLike.length > 2 && curti === false) {
        setMensagem(
          `Curtido por ${namesLike[0]}, ${namesLike[1]} e outras ${
            namesLike.length - 2
          } pessoas`
        );
      } else if (namesLike.length > 2 && curti === true) {
        setMensagem(
          `Curtido por você e outras ${namesLike.length - 1} pessoas`
        );
      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < postsCurtidos.length; i++) {
      if (postsCurtidos[i].id === post.id) {
        setTipoCoracao("heart");
        setCorCoracao("danger");
      }
    }
  }, [postsCurtidos]);

  useEffect(() => {
    showQuantLikes();
  }, []);

  return (
    <MarginPost>
      <PostContainer>
        <div className="icones">
          <UserPicture src={post.picture} alt="Foto de perfil" />
          <ion-icon
            name={tipoCoracao}
            color={corCoracao}
            onClick={likePost}
          ></ion-icon>
          <p
            data-tip={mensagem}
            data-for="likes"
            onMouseOver={nameLiked}
            onMouseOut={limparNomes}
          >
            {quantLikes} likes
          </p>
          <ReactTooltip id="likes" place="bottom" effect="solid" />
          <CommentsIcon
            postId={post.id}
            callback={() => setChat(!chat)}
            setComment={setComment}
            comment={comment}
          />
        </div>
        <div className="textos">
          <Modificar>
            <h5>{post.name}</h5>

            {userId === id ? (
              <div>
                <IconEdit
                  ativar={ativar}
                  setAtivar={setAtivar}
                  enableTextArea={enableTextArea}
                  setEnableTextArea={setEnableTextArea}
                  texto={texto}
                  setTexto={setTexto}
                  TextoRef={TextoRef}
                  setCartaoId={setCartaoId}
                  postId={post.id}
                  render={render}
                />
                <DeletarIcon
                  token={token}
                  postId={post.id}
                  renderizarPosts={renderizarPosts}
                  render={render}
                />
              </div>
            ) : (
              <></>
            )}
          </Modificar>

          {ativar && post.id === cartaoId ? (
            <Texto
              ativar={ativar}
              readOnly={enableTextArea}
              type="text"
              style={{ color: "#4C4C4C" }}
              onKeyPress={handleUserKeyPress}
              ref={TextoRef}
              defaultValue={post.description}
              autoFocus={true}
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

          <InfoLink onClick={() => window.open(`${post.link}`)}>
            <div className="infoLink">
              <h5>{post.link_title}</h5>
              <p>{post.link_description}</p>
              <h6>{post.link}</h6>
            </div>
            <div className="imagemLink">
              <img src={post.link_image} alt="Imagem referente ao link" />
            </div>
          </InfoLink>
        </div>
      </PostContainer>
      {chat ? <Chat postId={post.id} setComment={setComment} /> : <></>}
    </MarginPost>
  );
}

function Hashtag({ hashtag }) {
  const navigate = useNavigate();

  function openHashtag() {
    navigate(`/hashtag/${hashtag.name}`);
  }

  return <p onClick={openHashtag}># {hashtag.name}</p>;
}

function Side() {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:6002/hastags`)
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
        {hashtags.length === 0 ? (
          <p>Não há hashtags cadastradas</p>
        ) : (
          hashtags.map((hashtag, index) => (
            <Hashtag key={index} hashtag={hashtag} />
          ))
        )}
      </div>
    </SideContainer>
  );
}

function MainContent({ total = [] }) {
  const { updateUser, setUpdateUSer } = useContext(Context);
  const { id } = useParams();
  setUpdateUSer(id);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(false);
  const [postsCurtidos, setPostsCurtidos] = useState([]);

  let page = 1;

  function renderizarPosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:6002/users/${id}?page=${page}`, config)
      .then(({ data }) => {
        setPosts(data.posts);
        setRender(data.posts.length);
        setIsLoading(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
  console.log(posts)
  function loadNextPage() {
    page++;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:6002/users/${id}?page=${page}`, config)
      .then(({ data }) => {
        setPosts(data.posts);
        setRender(data.length);
        setIsLoading(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function buscarPostsCurtidos() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`http://localhost:6002/like`, config);

    promise
      .then((response) => {
        setPostsCurtidos(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  useEffect(() => {
    renderizarPosts();
    buscarPostsCurtidos();
  }, [updateUser]);

  return (
    <Main>
      {isLoading ? (
        <LoadingSpinner>
          <img src={loading} alt="carregando..." />
        </LoadingSpinner>
      ) : (
        <>
          {posts.length !== 0 ? (
            posts.map((post, index) => (
              
              <Post
                key={index}
                post={post}
                token={token}
                renderizarPosts={renderizarPosts}
                render={render}
                setRender={render}
                userId={userId}
                id={id}
                postsCurtidos={postsCurtidos}
              />
            ))
          ) : (
            <>Não há posts cadastrados</>
          )}
          {total.length !== posts.length ? (
            <InfiniteScroll fetchMore={loadNextPage} />
          ) : (
            <></>
          )}
        </>
      )}
    </Main>
  );
}

function ButtonFollow({ isToFollow = true, whoFollowId, setFollowUser }) {
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);

    const action = isToFollow ? "follow" : "unfollow";

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`http://localhost:6002/users/${whoFollowId}/${action}`, {}, options)
      .then(() => {
        setFollowUser(isToFollow);
      })
      .catch(() => {
        alert(`Could not ${action} this user`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <FollowButton
      onClick={handleClick}
      isToFollow={isToFollow}
      disabled={isLoading}
    >
      <RenderIf isTrue={isLoading}>
        <ThreeDots color="#ccc" height={55} width={55} />
      </RenderIf>

      <RenderIf isTrue={!isLoading}>
        {isToFollow ? "Follow" : "Unfollow"}
      </RenderIf>
    </FollowButton>
  );
}

export default function TelaUsuario() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [followUser, setFollowUser] = useState(false);

  useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:6002/users2/${id}`, options)
      .then(({ data }) => {
        setUser(data);
        setFollowUser(data.isFollowed);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Title>
        <h2>
          <UserPicture src={user.picture} alt="Foto de perfil" />
          {user.name}'s Posts
        </h2>

        <RenderIf
          isTrue={user.id && userId && parseInt(user.id) !== parseInt(userId)}
        >
          <ButtonFollow
            isToFollow={!followUser}
            setFollowUser={setFollowUser}
            whoFollowId={user.id}
          />
        </RenderIf>
      </Title>
      <Content>
        <MainContent total={user.posts} />
        <Side />
      </Content>
    </Container>
  );
}

const FollowButton = styled.button`
  width: 112px;
  height: 30px;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.isToFollow ? "#1877f2" : "#ffffff")};
  color: ${(props) => (props.isToFollow ? "#ffffff" : "#1877f2")};

  :hover {
    cursor: pointer;
  }

  :disabled {
    filter: brightness(1.15);
  }

  :disabled:hover {
    cursor: default;
  }
`;

const UserPicture = styled.img`
  width: 53px;
  height: 53px;
  object-fit: cover;
  border-radius: 60px;
  margin-bottom: 15px;

  :hover {
    cursor: pointer;
  }
`;

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
  justify-content: space-between;

  ${UserPicture} {
    margin-bottom: 0;
  }

  @media (max-width: 614px) {
    height: 100px;
  }

  h2 {
    font-size: 43px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 18px;

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

const MarginPost = styled.div`
  margin-bottom: 16px;
`;
const PostContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--cor-header);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  h1 {
    color: #9b9595;
    font-size: 20px;
    font-weight: 400;
    line-height: 15px;
    margin-bottom: 10px;
  }
`;
