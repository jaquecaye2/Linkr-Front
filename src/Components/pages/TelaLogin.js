import FormsLoginSingin from "./formsLoginSingin"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"



export default function TelaLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [disabled, setDisabled] = useState(false);
    const [corBackgroundInput, setCorBackgroundInput] = useState("#1877F2");

    let navigate = useNavigate()

    const API_URL = process.env.REACT_APP_API_URL;
   
    async function sendFormes(e){

        try{
            e.preventDefault()

            setDisabled(true)
            setCorBackgroundInput("#C0D9D9")

            const dataLogin = {email, password}
            const token = await axios.post(`${API_URL}/login`, dataLogin)

            setDisabled(false)
            setCorBackgroundInput("#1877F2")

            localStorage.setItem("token", token.data)

            const tokenlocal = localStorage.getItem("token")
            console.log(tokenlocal)


            navigate("/timeline")
            
        }catch(error){
                setDisabled(false)
                setCorBackgroundInput("#1877F2")
                alert(error.response.data)

        }
    }
    
    return(
        <Container>

                <Slogan>
                    <h1>linkr</h1>
                    <h2>save, share and discover</h2>
                    <h2> the best links on the web</h2>
                </Slogan>
                <Authentication>

                <FormsLoginSingin
                type={false}
                sendFormes={sendFormes}
                email = {email} setEmail = {setEmail}
                password = {password} setPassword = {setPassword}
                LinkTo={"/sign-up"}
                TextButton="Log In"
                TextRedirect="First time? Create an account!"
                disabled={disabled}
                corBackgroundInput={corBackgroundInput}
                />
                </Authentication>

                
          
        </Container>
    )
}

const Container = styled.div`

display: flex;
@media(max-width: 796px) {
    flex-direction: column;
  }

`
const Slogan = styled.div`
width: 65.68%;
height: 100vh;
h1{
    
    margin-top: 120px;
    margin-left: 9.24%;
    font-size: 106px;
    @media(max-width: 796px) {
        margin-top: 12px;
        margin-left: 0px;
        display: flex;
        justify-content: center;
        font-size: 76px;
  }
}

h2{
    
    
    margin-left: 9.24%;
    font-size: 43px;

    @media(max-width: 796px) {
        margin-top: 4px;
        margin-left: 0px;
        display: flex;
        justify-content: center;
        font-size: 23px;
    }
}
background-color: #151515;

@media(max-width: 796px) {
    width: 100%;
    padding-bottom: 27px;
   height: 26%;
  }
`

const Authentication = styled.div`
display: flex;
flex-direction: column;
width: 34%;
align-items: center;

@media(max-width: 796px) {
    width: 100%;
    height: 64%;
  }

`
