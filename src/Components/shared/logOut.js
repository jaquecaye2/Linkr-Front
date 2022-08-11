import styled from "styled-components"
import { useNavigate } from "react-router-dom"


export default function Logout({setShowLogout, setArrow, FiChevronDown}){

    const navigate = useNavigate()

    function logout(){
        setArrow(FiChevronDown)
        setShowLogout(false)
        localStorage.removeItem("token")
        navigate("/")

    }

    function logoutCancel(){
        setArrow(FiChevronDown)
        setShowLogout(false)
    }

    return(
        <>
            <LogOut onClick={logout}>
                <h2>Logout</h2>
            </LogOut>
            <Resto onClick={logoutCancel}>

            </Resto>
        </>
    )
}

const LogOut = styled.div`
position: fixed;
right: 0;
margin-top: 72px;
width: 130px;
height: 47px;
background-color: #171717;
display: flex;
align-items: center;
justify-content: center;
border-radius: 0px 0px 0 20px;
z-index: 2;
`

const Resto = styled.div`
position: fixed;
width: 100%;
height: 100%;

z-index: 1;
background-color: rgba(255, 0, 0, 0);  /* red with opacity */
`