import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import SearchBar from "./SearchBar";
import perfil from "../../assets/images/perfil.jpeg";

export default function Header() {
  const location = useLocation();

  // verificar qual o nome que vem do localStorage
  const imagemPerfil = localStorage.getItem("imagem");

  function canRenderHeader() {
    return !["/", "/sign-up"].includes(location.pathname);
  }

  return canRenderHeader() ? (
    <>
      <HeaderStyle>
        <Link to="/timeline">
          <h1>linkr</h1>
        </Link>
        <div className="barraPesquisar">
          <SearchBar />
        </div>
        <img src={imagemPerfil} alt="Foto de perfil" />
      </HeaderStyle>
      <BarraPesquisa>
        <SearchBar />
      </BarraPesquisa>
    </>
  ) : null;
}

const HeaderStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 72px;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: var(--cor-header);
  display: flex;
  align-items: top;
  justify-content: space-between;
  padding: 10px 20px;

  a {
    text-decoration: none;
    color: var(--cor-branca);
  }

  h1 {
    font-size: 49px;
    font-weight: 700;
  }

  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 60px;
  }

  @media (max-width: 935px) {
  }

  @media (max-width: 614px) {
    .barraPesquisar {
      display: none;
    }
  }
`;

const BarraPesquisa = styled.div`
  display: none;

  @media (max-width: 614px) {
    padding: 15px;
    margin-top: 72px;
    display: block;
  }
`;
