import styled from "styled-components";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logout from "./logout";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

export default function Header() {
  const [arrow, setArrow] = useState(FiChevronDown)
  const [showLogout, setShowLogout]= useState(false)

  const location = useLocation();
  const imagemPerfil = localStorage.getItem("picture");
   

  function logout(){
    setArrow(FiChevronUp)
    setShowLogout(true)

  }

  function canRenderHeader() {
    return !["/", "/sign-up"].includes(location.pathname);
  }

  return canRenderHeader() ? (
    <>
      <HeaderStyle onClick={logout}>
        <Link to="/timeline">
          <h1>linkr</h1>
        </Link>
        <div className="barraPesquisar">
          <SearchBar />
        </div>
        <ImageLogout>
              {arrow} 
              <img
                src={imagemPerfil}
                alt="Foto de perfil"
                />
          </ImageLogout>
        {showLogout?
        <Logout 
        setArrow={setArrow}
        setShowLogout={setShowLogout} FiChevronDown={FiChevronDown}/>
        :<></>
        }
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

  a{
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

const ImageLogout = styled.div`
display: flex;
align-items: center;
justify-content: center;
img {
  width: 53px;
  height: 53px;
  object-fit: cover;
  border-radius: 60px;
  margin-left: 5px;
}
font-size: 30px;
`;