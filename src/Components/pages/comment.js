import styled from 'styled-components';
import testeImg from "../../assets/images/testeImg.png"
import BarraComentario from './BarraComentarios';


export default function Chat() {
    return (
        <Main>
            <ChatConteudo>
                <div>
                    <img src={testeImg} alt="Foto" />
                </div>
                <Comment>
                    <Status>
                        <h3>João Avatares</h3>
                        <p>• following</p>
                    </Status>
                    <Comentario>
                        Adorei esse post, ajuda muito a usar Material UI com React!
                    </Comentario>
                </Comment>
            </ChatConteudo>
            <ChatConteudo>
                <div>
                    <img src={testeImg} alt="Foto" />
                </div>
                <Comment>
                    <Status>
                        <h3>João Avatares</h3>
                        <p>• following</p>
                    </Status>
                    <Comentario>
                        Adorei esse post, ajuda muito a usar Material UI com React!
                    </Comentario>
                </Comment>
            </ChatConteudo>
            <ChatConteudo>
                <div>
                    <img src={testeImg} alt="Foto" />
                </div>
                <Comment>
                    <Status>
                        <h3>João Avatares</h3>
                        <p>• following</p>
                    </Status>
                    <Comentario>
                        Adorei esse post, ajuda muito a usar Material UI com React!
                    </Comentario>
                </Comment>
            </ChatConteudo>
            <ChatConteudo>
                <div>
                    <img src={testeImg} alt="Foto" />
                </div>
                <Comment>
                    <Status>
                        <h3>João Avatares</h3>
                        <p>• following</p>
                    </Status>
                    <Comentario>
                        Adorei esse post, ajuda muito a usar Material UI com React!
                    </Comentario>
                </Comment>
            </ChatConteudo>
            <BarraComentario />
        </Main>
    )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  background-color: #1E1E1E;
  border-radius: 16px;
  padding: 20px;
  height: 300px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 614px) {
    border-radius: 0;
  }
`

const ChatConteudo = styled.div`
display: flex;
  img {
      width: 39px;
      height: 39px;
      object-fit: cover;
      border-radius: 60px;
      margin-bottom: 15px;
      :hover {
        cursor: pointer;
      }
    }
`
const Comment = styled.div`
margin-left: 3%;

`

const Status = styled.div`
width: 100%;
margin-left: 3%;
display: flex;
h3{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #F3F3F3
}
p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    margin-left: 10px;
}

`

const Comentario = styled.div`
width: 100%;
margin-left: 3%;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
color: #ACACAC;
margin-top: 1%;

`