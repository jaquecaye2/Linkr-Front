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

    function myLinks(){
        console.log("myLinks")
        const id =  localStorage.getItem("userId")
        navigate(`/user/${id}`)
    }

    function logoutCancel(){
        setArrow(FiChevronDown)
        setShowLogout(false)
    }

    return(
        <>
            
                <LogOut>
                    <h2 onClick={logout}>Logout</h2>
                    <h2 onClick={myLinks}>MyLinks</h2>
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
height: 90px;
background-color: #171717;
display: flex;
align-items: center;
justify-content: center;
border-radius: 0px 0px 0 20px;
z-index: 2;
flex-direction: column;

h2{
    margin: 12px;
    border-color: red;
}
`

const Resto = styled.div`
position: fixed;
width: 100%;
height: 100%;

z-index: 1;
background-color: rgba(255, 0, 0, 0);  /* red with opacity */
`