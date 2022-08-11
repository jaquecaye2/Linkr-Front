import styled from "styled-components";
import { useState } from "react";
import perfil from "../../assets/images/perfil.jpeg"
import Logout from "./logOut";

import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";

export default function Header() {

  const [arrow, setArrow] = useState(FiChevronDown)
  const [showLogout, setShowLogout]= useState(false)

  function logout(){
    setArrow(FiChevronUp)
    setShowLogout(true)

  }

  return (
      <>
        <HeaderStyle onClick={logout}>
          <h1>linkr</h1>
          <ImageLogout>
              {arrow} 
              <img
                src={perfil}
                alt="Foto de perfil"
                />
          </ImageLogout>
        </HeaderStyle>
        {showLogout?
        <Logout 
        setArrow={setArrow}
        setShowLogout={setShowLogout} FiChevronDown={FiChevronDown}/>
        :<></>
        }
      </>
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

  h1 {
    font-size: 49px;
    font-weight: 700;
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

`