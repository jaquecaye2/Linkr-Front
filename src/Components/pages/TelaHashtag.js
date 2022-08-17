import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ReactTagify } from "react-tagify";
import loading from "../../assets/images/loading.svg";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import InfiniteScroll from "./InfiniteScroll";

const API_URL = process.env.REACT_APP_API_URL;

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

function Post({
  picture,
  name,
  user_id,
  description,
  link_title,
  link_description,
  link,
  link_image,
  post_id,
  token,
  postsCurtidos,
}) {
  const navigate = useNavigate();

  const [tipoCoracao, setTipoCoracao] = useState("heart-outline");
  const [corCoracao, setCorCoracao] = useState("black");
  const [quantLikes, setquantLikes] = useState(0);
  let namesLike = [];
  const [mensagem, setMensagem] = useState("");

  const tagStyle = {
    color: "#ffffff",
    fontWeight: "700",
  };

  function openLink() {
    window.open(link, "_blank");
  }

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
        id: post_id,
        type: "like",
      };
    } else {
      dadosPost = {
        id: post_id,
        type: "deslike",
      };
    }

    const promise = axios.post(`http://localhost:6002/like`, dadosPost, config);

    promise
      .then((response) => {
        console.log(response.data);
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
      id: post_id,
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
      id: post_id,
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
      if (postsCurtidos[i].post_id === post_id) {
        setTipoCoracao("heart");
        setCorCoracao("danger");
      }
    }
  }, [postsCurtidos]);

  useEffect(() => {
    showQuantLikes();
  }, []);

  function navegar(name, userId) {
    console.log(name, userId);
    navigate(`/user/${userId}`, {
      state: {
        user: name,
      },
    });
  }

  return (
    <PostContainer>
      <div className="icones">
        <img
          onClick={() => navegar(name, user_id)}
          src={picture}
          alt="Foto de perfil"
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
        <h5 onClick={() => navegar(name, user_id)}>{name}</h5>
        <p>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigateToHashtag(tag)}
          >
            {description}
          </ReactTagify>
        </p>
        <InfoLink onClick={openLink}>
          <div className="infoLink">
            <h5>{link_title}</h5>
            <p>{link_description}</p>
            <h6>{link}</h6>
          </div>
          <div className="imagemLink">
            <img src={link_image} alt="Imagem referente ao link" />
          </div>
        </InfoLink>
      </div>
    </PostContainer>
  );
}

function MainContent() {
  const { hashtag } = useParams();
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsCurtidos, setPostsCurtidos] = useState([]);

  let page = 1;

  function buscarPostsCurtidos() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`http://localhost:6002/like`, config);

    promise
      .then((response) => {
        console.log(response.data);
        setPostsCurtidos(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function renderizarPosts() {
    axios
      .get(`http://localhost:6002/hastag/${hashtag}?page=${page}`)
      .then(({ data }) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  function loadNextPage() {
    page++;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:6002/hastag/${hashtag}?page=${page}`, config)
      .then(({ data }) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  useEffect(() => {
    buscarPostsCurtidos();
  }, []);

  useEffect(() => {
    renderizarPosts();
  }, [hashtag]);

  return (
    <Main>
      {isLoading ? (
        <LoadingSpinner>
          <img src={loading} alt="carregando..." />
        </LoadingSpinner>
      ) : (
        <>
          {posts.map((post, index) => (
            <Post
              key={index}
              name={post.name}
              picture={post.picture}
              description={post.description}
              link={post.link}
              link_description={post.link_description}
              link_image={post.link_image}
              link_title={post.link_title}
              user_id={post.user_id}
              post_id={post.post_id}
              postsCurtidos={postsCurtidos}
              token={token}
            />
          ))}
          <InfiniteScroll fetchMore={loadNextPage} />
        </>
      )}
    </Main>
  );
}

export default function TelaHashtag() {
  const { hashtag } = useParams();

  return (
    <Container>
      <Title>
        <h2># {hashtag}</h2>
      </Title>
      <Content>
        <MainContent />
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
