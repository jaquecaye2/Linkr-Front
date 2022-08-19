import { BiRepost } from "react-icons/bi";

import axios from "axios";
import Modal from "react-modal";
import React, { useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function SharedIcon({
  idPost,
  token,
  numberShares,
  renderizarPosts,
}) {
  Modal.setAppElement(".root");

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  function modalDinamico() {
    setIsOpen(!isOpen);
  }

  async function sheredPost() {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const dadosPost = {
        idPost,
      };

      await axios.post(`http://localhost:6002/shared`, dadosPost, config);

      setLoading(false);
      modalDinamico();
      renderizarPosts();
    } catch (e) {
      console.log(e);
      modalDinamico();
      alert("Não foi possível compartilhar o post");
      setLoading(false);
    }
  }

  return (
    <>
      {" "}
      <Icon onClick={() => modalDinamico()}>
        <BiRepost />
      </Icon>
      <p> {numberShares} re-posts </p>
      <Conteudo>
        <Modal
          isOpen={isOpen}
          className="_"
          overlayClassName="_"
          contentElement={(props, children) => (
            <ModalStyle {...props}>{children}</ModalStyle>
          )}
          overlayElement={(props, contentElement) => (
            <OverlayStyle {...props}>{contentElement}</OverlayStyle>
          )}
        >
          <div className="pergunta">Do you want to re-post this link?</div>
          <div className="opcao">
            <button
              className="voltar"
              onClick={modalDinamico}
              disabled={loading}
            >
              No, cancel
            </button>
            {loading ? (
              <Carregando>
                <ThreeDots color="#FFFFFF" width={50} />
              </Carregando>
            ) : (
              <button className="deletar" onClick={sheredPost}>
                Yes, share!
              </button>
            )}
          </div>
        </Modal>
      </Conteudo>
    </>
  );
}

const Repost = styled.div`
  p {
    margin-top: 3px;
    text-align: center;
    font-size: 11px;
  }
`;

const Icon = styled.div`
  font-size: 28px;
  margin-top: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Conteudo = styled.div`
  svg {
    color: #ffffff;
    cursor: pointer;
  }
  width: 14px;
  height: 14px;
  background-color: #171717;
`;

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #333333;
  border: none;
  border-radius: 50px;
  width: 597px;
  height: 262px;
  padding: 38px 120px 65px 120px;
  .opcao {
    width: 298px;
    display: flex;
    justify-content: space-between;
    background-color: #333333;
    margin-left: 40px;
  }
  .pergunta {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #ffffff;
    background-color: #333333;
  }
  button {
    border: none;
    cursor: pointer;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
  }
  .voltar {
    color: #1877f2;
    background-color: #ffffff;
  }
  .deletar {
    color: #ffffff;
    background-color: #1877f2;
  }
  @media (max-width: 700px) {
    width: 400px;
    height: 200px;
    padding: 18px 50px 18px 50px;
    .pergunta {
      font-size: 24px;
      width: 280px;
    }

    .opcao {
      width: 250px;
      justify-content: space-evenly;
      margin: auto;
    }
    button {
      width: 100px;
      height: 37px;
      font-size: 14px;
    }
  }
  @media (max-width: 500px) {
    width: 320px;
    height: 140px;
    padding: 20px 50px 50px 50px;
    .pergunta {
      font-size: 14px;
      width: 280px;
      margin-bottom: 20px;
    }

    .opcao {
      width: 180px;
      margin: auto;
      justify-content: space-between;
    }
    button {
      width: 85px;
      height: 30px;
      font-size: 12px;
    }
  }
`;

const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9); ;
`;

const Carregando = styled.div`
  border: none;
  border-radius: 5px;
  width: 134px;
  height: 37px;
  background-color: #1877f2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  @media (max-width: 700px) {
    width: 100px;
    height: 37px;
  }
  @media (max-width: 500px) {
    width: 85px;
    height: 30px;
  }
`;
