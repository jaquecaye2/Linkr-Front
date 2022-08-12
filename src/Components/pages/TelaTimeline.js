import styled from "styled-components";
import { Link } from "react-router-dom";
import teste from "../../assets/images/test.png";

export default function TelaTimeline() {
  return (
    <TelaTimelineStyle>
      <Titulo>
        <h2>timeline</h2>
      </Titulo>
      <Conteudo>
        <Principal>
          <CriarPost>
            <Link to={"/users/1"}>
            <div>
              <img src={teste} alt="Foto de perfil" />
            </div>
            </Link>
            <div className="postInfo">
              <h4>What are you going to share today?</h4>
              <form>
                <input
                  type="link"
                  name="link"
                  id="link"
                  placeholder="http://..."
                  required
                />
                <textarea
                  type="text"
                  name="descricao"
                  id="descricao"
                  placeholder="Awesome article about #javascript"
                  required
                />
                <div>
                  <button>Publish</button>
                </div>
              </form>
            </div>
          </CriarPost>
          <Posts>
            <Post>
              <div className="icones">
                <img src={teste} alt="Foto de perfil" />
                <ion-icon name="heart-outline"></ion-icon>
                <p>13 likes</p>
              </div>
              <div className="textos">
                <h5>Juvenal Juvêncio</h5>
                <p>
                  Muito maneiro esse tutorial de Material UI com React, deem uma
                  olhada! <span>#react</span> <span>#material</span>
                </p>
                <InfoLink>
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
                </InfoLink>
              </div>
            </Post>
            <Post>
              <div className="icones">
                <img src={teste} alt="Foto de perfil" />
                <ion-icon name="heart-outline"></ion-icon>
                <p>13 likes</p>
              </div>
              <div className="textos">
                <h5>Juvenal Juvêncio</h5>
                <p>
                  Muito maneiro esse tutorial de Material UI com React, deem uma
                  olhada! <span>#react</span> <span>#material</span>
                </p>
                <InfoLink>
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
                </InfoLink>
              </div>
            </Post>
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
      </Conteudo>
    </TelaTimelineStyle>
  );
}

const TelaTimelineStyle = styled.div`
  width: 80%;
  margin: 72px auto 0 auto;
`;

const Titulo = styled.div`
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: left;
  h2 {
    font-size: 43px;
    font-weight: 700;
  }
`;

const Conteudo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Principal = styled.div`
  width: 66%;
`;

const CriarPost = styled.div`
  display: flex;
  background-color: var(--cor-branca);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 29px;
  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 60px;
    margin-right: 18px;
  }
  div.postInfo {
    width: 100%;
    h4 {
      color: #707070;
      margin: 20px 0;
      font-size: 20px;
      font-weight: 300;
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
        background-color: #efefef;
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
        background-color: #efefef;
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
          :hover {
            filter: brightness(0.7);
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const Posts = styled.div`
`;

const Post = styled.div`
  display: flex;
  background-color: var(--cor-header);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  div.icones {
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
    ion-icon{
        font-size: 20px;
        :hover{
            cursor: pointer;
        }
    }
    p{
        margin-top: 5px;
        text-align: center;
        font-size: 11px;
    }
  }
  div.textos{
    h5{
        font-size: 19px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    p{
        color: #B7B7B7;
        font-size: 17px;
        line-height: 20px;
        margin-bottom: 15px;
    }
    span{
        color: #FFFFFF;
        font-weight: 700;
    }
  }
`;

const InfoLink = styled.div`
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div.infoLink{
        width: 70%;
        height: 100%;
        padding: 25px 16px;
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
        width: 30%;
        height: 160px;
        img{
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