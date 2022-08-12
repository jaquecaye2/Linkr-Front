import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ReactTagify } from "react-tagify";

import loading from "../../assets/images/loading.svg";
import axios from "axios";

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
      .get(`${API_URL}/hashtags`)
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

function Post({
  picture,
  name,
  user_id,
  description,
  link_title,
  link_description,
  link,
  link_image,
}) {
  const navigate = useNavigate();

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

  return (
    <PostContainer>
      <div className="icones">
        <img
          onClick={() => navigate(`/user/${user_id}`)}
          src={picture}
          alt="Foto de perfil"
        />
        <ion-icon name="heart-outline"></ion-icon>
        <p>13 likes</p>
      </div>
      <div className="textos">
        <h5 onClick={() => navigate(`/user/${user_id}`)}>{name}</h5>
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

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/hashtag/${hashtag}`)
      .then(({ data }) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

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
            />
          ))}
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
