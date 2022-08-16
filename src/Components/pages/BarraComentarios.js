import styled from 'styled-components';
import { FiSend } from "react-icons/fi";
import { useState } from 'react';


export default function BarraComentario({postId}) {
    const imagemPerfil = localStorage.getItem("picture");
    const [texto, setTexto] = useState('');
    const comment = {
        comment: texto,
        postId: postId
    }
    return (
        <BarraMain>
            <BarraConteudo>
                <img src={imagemPerfil} alt="Foto" />
            </BarraConteudo>
            <SendForm> 
            <TextArea
                    placeholder="write a comment..."
                    type="text"
                    value={texto}
                    onChange={e => setTexto(e.target.value)}
                />
            <SendComment type="submit" id="submit"><StyledIcon /></SendComment>
            </SendForm>
        </BarraMain>
    );
}


const BarraMain = styled.div`
display: flex;
input{
    width: 100%;
    height: 39px;
    margin-left: 3%;
    border-radius: 8px;
    background-color: #252525;
    border-style: none;
    padding-left: 3%;
    ::placeholder{
        font-family: 'Lato';
        font-style: italic;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.05em; 
        color: #575757;
    }
}

`

const SendForm = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 65px;
    display: flex;
    font-family: 'Lato';
`

const TextArea = styled.input`
    margin-left: 15px;
    width: 90%;
    border: none;
    background: #252525;
    color: #ACACAC;
    font-size: 15px;
    ::placeholder {
        font-size: 14px;
        color: #575757;
    }
    :focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
`

const BarraConteudo = styled.div`
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

const SendComment = styled.button`
    cursor: pointer;
    width: 17px;
    height: 17px;
    margin-right: 17px;
    font-size: 15px;
    background: #252525;
    border: none;
`


const StyledIcon = styled(FiSend)`
    color: #F3F3F3;
`