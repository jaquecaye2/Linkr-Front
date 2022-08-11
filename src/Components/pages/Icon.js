import { useEffect  } from "react";
import { TiPencil } from "react-icons/ti";
import styled from "styled-components";

function  ModificarCartao({ativar, setAtivar, TextoRef, setCartaoId, postId}) {
    function getTextArea() {
        setAtivar(!ativar);
        setCartaoId(postId)
    }

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);
    }, [])

    const detectKeyDown = (e) => {
        if (e.key === "Escape") {
            setAtivar(false);
        }
    }

    useEffect(() => {
        if (ativar) {
            TextoRef.current.focus();
          console.log(TextoRef.current.value);
        }
    }, [ativar]);

    return (
        <Icon>
             <TiPencil onClick={() => getTextArea()}/>
        </Icon>
    )
}

export default ModificarCartao;

const Icon = styled.div`
    width: 16px;
    height: 16px;
    background-color: #171717;
    svg {
        cursor: pointer;
        color: #FFFFFF;
        
    }
`;