import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

export default function BarraComentario({
  postId,
  setComment,
  setEnableTextArea,
  enableTextArea,
  setTamanho,
}) {
  const imagemPerfil = localStorage.getItem("picture");

  const token = localStorage.getItem("token");
  const [texto, setTexto] = useState("");

  const dados = {
    comment: texto,
    postId: postId,
  };

  async function sendComment() {
    setEnableTextArea(true);
    setTamanho(true);
    setComment(false);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`https://linkr-driven-16.herokuapp.com/comment`, dados, config);

      setEnableTextArea(false);
      setTamanho(false);
      setTexto("");
      setComment(true);
    } catch (e) {
      alert("Não foi possível salvar as alterações!");
      setEnableTextArea(true);
    }
  }

  return (
    <BarraMain>
      <BarraConteudo>
        <img src={imagemPerfil} alt="Foto" />
      </BarraConteudo>
      <SendForm>
        <TextArea
          readOnly={enableTextArea}
          placeholder="write a comment..."
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <SendComment
          className="submit"
          type="submit"
          id="submit"
          onClick={() => sendComment()}
        >
          <StyledIcon />
        </SendComment>
      </SendForm>
    </BarraMain>
  );
}

const BarraMain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  display: flex;
  font-family: "Lato";
  input {
    width: 100%;
    height: 39px;
    border-radius: 8px;
    background-color: #252525;
    border-style: none;
    ::placeholder {
      font-family: "Lato";
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.05em;
      color: #575757;
    }
  }
`;

const SendForm = styled.div`
  display: flex;
  width: 82%;
  height: 45px;
  background: #252525;
  border-radius: 8px;
  display: flex;
  font-family: "Lato";
`;

const TextArea = styled.input`
  margin-left: 15px;
  width: 90%;
  border: none;
  background: #252525;
  color: #acacac;
  margin-bottom: 2%;
  font-size: 15px;
  ::placeholder {
    font-size: 14px;
    color: #575757;
  }
  :focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const BarraConteudo = styled.div`
  display: flex;
  img {
    width: 39px;
    height: 39px;
    border-radius: 25px;
    object-fit: cover;
    margin-right: 18px;
    :hover {
      cursor: pointer;
    }
  }
`;

const SendComment = styled.button`
  cursor: pointer;
  width: 17px;
  height: 17px;
  margin-right: 17px;
  font-size: 15px;
  background: #252525;
  border: none;
  margin-top: 3%;
`;

const StyledIcon = styled(FiSend)`
  color: #f3f3f3;
`;
