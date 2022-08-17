import styled from 'styled-components';
import BarraComentario from './BarraComentarios';
import loading from "../../assets/images/loading.svg";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function Chat({ postId, setComment }) {
    const token = localStorage.getItem("token");
    const [enableTextArea, setEnableTextArea] = useState(false);
    const [tamanho, setTamanho] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])

    async function renderUsersComments() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const promise = axios.get(
            `http://localhost:6002/comments/users/16`, config
        );

        promise
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
                setIsLoading(false);
                setComment(true);
            })
            .catch((error) => {
                console.log(error)
                alert(error.response.data);
                setIsLoading(true);
                setComment(false)
            });
    }

    useEffect(() => {
        renderUsersComments()
    }, [tamanho]);


    function RenderUsers({ picture, name, comment, owner, userId }) {
        return (

            <ChatConteudo>
                <div>
                    <img src={picture} alt="Foto" />
                </div>
                <Comment>
                    <Status>
                        <h3>{name}</h3>
                        {owner === userId ? (
                            <p>• post’s author</p>
                            ) : (
                                <></>
                            )
                        }
                    </Status>
                    <Comentario>
                        {comment}
                    </Comentario>
                </Comment>
            </ChatConteudo>
        )
    }

    return (
        <Main>
            <ChatMain>
                {isLoading ? (
                    <LoadingSpinner>
                        <img src={loading} alt="carregando..." />
                    </LoadingSpinner>
                ) : (
                    <>
                        {users.length > 0 ? (
                            users.map((e, index) => (
                                <RenderUsers
                                    picture={e.picture}
                                    name={e.name}
                                    comment={e.comment}
                                    owner={e.ownerpost}
                                    userId={e.user_id}
                                />
                            ))
                        ) : (
                            <>Não há posts cadastrados</>
                        )}
                    </>

                )}
            </ChatMain>
            <BarraComentario
                postId={postId}
                setEnableTextArea={setEnableTextArea}
                enableTextArea={enableTextArea}
                setTamanho={setTamanho}
                setComment={setComment}
            />
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
const ChatMain = styled.div`
    width: 100%;
    height: calc(350px - 20%);
       overflow: scroll;
    border-radius: 0 0 20px 20px;
    
    ::-webkit-scrollbar {
        display: none;
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

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
