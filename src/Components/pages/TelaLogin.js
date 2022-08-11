import FormsLoginSingin from "./formsLoginSingin"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"



export default function TelaLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()
    
    async function sendFormes(e){

        try{
            
            e.preventDefault()
            const dataLogin = {email, password}
            
            const token = await axios.post('http://localhost:5007/login', dataLogin)

            localStorage.setItem("token", token.data)

            const tokenlocal = localStorage.getItem("token")
            console.log(tokenlocal)


            navigate("/timeline")
            
        }catch(error){

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
                TextRedirect="First time? Create an account!"/>
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
