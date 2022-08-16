import styled from "styled-components";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import loading from "../../assets/images/loading.svg";
import InfiniteScroll from "./InfiniteScroll";

function PostUnico({ post, token, postsCurtidos, name }) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [tipoCoracao, setTipoCoracao] = React.useState("heart-outline");
  const [corCoracao, setCorCoracao] = React.useState("black");
  const navigate = useNavigate();
  const [quantLikes, setquantLikes] = React.useState(0);
  let namesLike = [];
  const [mensagem, setMensagem] = React.useState("");

  function openLink() {
    window.open(post.link, "_blank");
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
      id: post.id,
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

  React.useEffect(() => {
    for (let i = 0; i < postsCurtidos.length; i++) {
      if (postsCurtidos[i].post_id === post.id) {
        setTipoCoracao("heart");
        setCorCoracao("danger");
      }
    }
  }, [postsCurtidos]);

  React.useEffect(() => {
    showQuantLikes();
  }, []);

  function navegar(name, userId) {
    navigate(`/user/${userId}`, {
      state: {
        user: name,
      },
    });
  }

  return (
    <Post>
      <div className="icones">
        <img
          src={post.picture}
          alt="Foto de perfil"
          onClick={() => navegar(post.name, post.user_id)}
        />
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
      </div>
      <div className="textos">
        <h5 onClick={() => navegar(post.name, post.user_id)}>{post.name}</h5>
        <p>{post.description}</p>
        <InfoLink onClick={openLink}>
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
    </Post>
  );
}

function Hashtag({ hashtag }) {
  const navigate = useNavigate();

  function openHashtag() {
    navigate(`/hashtag/${hashtag.name}`);
  }

  return <p onClick={openHashtag}># {hashtag.name}</p>;
}

export default function TelaTimeline() {
  const [link, setLink] = React.useState("");
  const [descricao, setDescricao] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [corBackgroundInput, setCorBackgroundInput] = React.useState("#efefef");
  const [carregando, setCarregando] = React.useState(false);

  const [posts, setPosts] = React.useState([]);
  const [hashtags, setHashtags] = React.useState([]);
  const [postsCurtidos, setPostsCurtidos] = React.useState([]);

  const [promiseCarregada, setPromiseCarregada] = React.useState(false);

  const token = localStorage.getItem("token");
  const imagemPerfil = localStorage.getItem("picture");
  const name = localStorage.getItem("name");

  const API_URL = process.env.REACT_APP_API_URL;

  let page = 1

  function renderizarPosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `http://localhost:6002/post?page=${page}`,
      config
    );

    promise
      .then((response) => {
        setPosts(response.data);
        setPromiseCarregada(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function loadNextPage() {
    page ++

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `http://localhost:6002/post?page=${page}`,
      config
    );

    promise
      .then((response) => {
        setPosts(response.data);
        setPromiseCarregada(true);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function renderizaHashtags() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`http://localhost:6002/hastags`, config);

    promise
      .then((response) => {
        setHashtags(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function criarPost(event) {
    event.preventDefault();

    setDisabled(true);
    setCorBackgroundInput("#c1c1c1");
    setCarregando(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const dadosPost = {
      link,
      description: descricao,
    };

    const promise = axios.post(`http://localhost:6002/post`, dadosPost, config);

    promise
      .then((response) => {
        alert("Post cadastrado com sucesso!");
        setDisabled(false);
        setCorBackgroundInput("#efefef");
        setCarregando(false);
        setLink("");
        setDescricao("");
        renderizarPosts();
        renderizaHashtags();
      })
      .catch((error) => {
        alert("Houve um erro ao publicar seu link");
        setDisabled(false);
        setCorBackgroundInput("#efefef");
        setCarregando(false);
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

  React.useEffect(() => {
    renderizarPosts();
    renderizaHashtags();
    buscarPostsCurtidos();
  }, []);

  return (
    <TelaTimelineStyle>
      <Titulo>
        <h2>timeline</h2>
      </Titulo>
      <Conteudo>
        <Principal>
          <CriarPost corBackgroundInput={corBackgroundInput}>
            <div>
              <img src={imagemPerfil} alt="Foto de perfil" />
            </div>
            <div className="postInfo">
              <h4>What are you going to share today?</h4>
              <form onSubmit={criarPost}>
                <input
                  type="link"
                  name="link"
                  id="link"
                  placeholder="http://..."
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  disabled={disabled}
                />
                <textarea
                  type="text"
                  name="descricao"
                  id="descricao"
                  placeholder="Awesome article about #javascript"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  disabled={disabled}
                />
                <div>
                  {carregando ? (
                    <button disabled={disabled}>
                      <p>Publishing</p>
                      <ThreeDots color="#ffffff" height={20} width={20} />
                    </button>
                  ) : (
                    <button disabled={disabled}>Publish</button>
                  )}
                </div>
              </form>
            </div>
          </CriarPost>

          {!promiseCarregada ? (
            <Carregando>
              <img src={loading} alt="carregando..." />
            </Carregando>
          ) : (
            <>
              <Posts>
                {posts.length === 0 ? (
                  <p>Não há posts cadastrados</p>
                ) : (
                  posts.map((post, index) => (
                    <PostUnico
                      key={index}
                      post={post}
                      token={token}
                      name={name}
                      postsCurtidos={postsCurtidos}
                    />
                  ))
                )}
              </Posts>
              <InfiniteScroll
                fetchMore={loadNextPage}
              />
            </>
          )}
        </Principal>

        <Lateral>
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
        </Lateral>
      </Conteudo>
    </TelaTimelineStyle>
  );
}

const TelaTimelineStyle = styled.div`
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

const Titulo = styled.div`
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

const Conteudo = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 935px) {
    flex-direction: column;
  }
`;

const Principal = styled.div`
  width: 66%;
  @media (max-width: 935px) {
    width: 100%;
  }
`;

const CriarPost = styled.div`
  display: flex;
  background-color: var(--cor-branca);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 29px;
  @media (max-width: 614px) {
    border-radius: 0;
  }
  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 60px;
    margin-right: 18px;
    @media (max-width: 614px) {
      display: none;
    }
  }
  div.postInfo {
    width: 100%;
    h4 {
      color: #707070;
      margin: 20px 0;
      font-size: 20px;
      font-weight: 300;
      @media (max-width: 614px) {
        text-align: center;
      }
    }
    form {
      display: flex;
      align-items: baseline;
      justify-content: left;
      flex-direction: column;
      input {
        font-family: inherit;
        font-size: inherit;
      }
      input {
        height: 30px;
        border: none;
        border-radius: 5px;
        background-color: ${(props) => props.corBackgroundInput};
        padding: 0 13px;
        margin-bottom: 5px;
        width: 100%;
        font-size: 15px;
        font-weight: 300;
        ::placeholder {
          color: #949494;
        }
      }
      textarea {
        font-family: inherit;
        font-size: inherit;
        resize: none;
      }
      textarea {
        height: 66px;
        width: 100%;
        border: none;
        border-radius: 5px;
        background-color: ${(props) => props.corBackgroundInput};
        padding: 13px;
        margin-bottom: 5px;
        font-size: 15px;
        font-weight: 300;
        ::placeholder {
          color: #949494;
        }
      }
      div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: right;
        button {
          background-color: #1877f2;
          border: none;
          border-radius: 5px;
          width: 112px;
          height: 32px;
          color: var(--cor-branca);
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          :hover {
            filter: brightness(0.7);
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const Carregando = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Posts = styled.div``;

const Post = styled.div`
  width: 100%;
  height: 100%;
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
    }
    p {
      color: #b7b7b7;
      font-size: 17px;
      line-height: 20px;
      margin-bottom: 15px;
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

const Lateral = styled.div`
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
