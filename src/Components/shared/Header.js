import styled from "styled-components";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

import perfil from "../../assets/images/perfil.jpeg"

export default function Header() {
  return (
    <HeaderStyle>
      <Link to={"/timeline"}>
        <h1>linkr</h1>
      </Link>
      <SearchBar />
      <img
        src={perfil}
        alt="Foto de perfil"
      />
    </HeaderStyle>
  );
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
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

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
`;
