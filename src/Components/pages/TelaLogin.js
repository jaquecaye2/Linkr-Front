import FormsLoginSingin from "./formsLoginSingin"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"



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
        <>
           
                <FormsLoginSingin
                type={false}
                sendFormes={sendFormes}
                email = {email} setEmail = {setEmail}
                password = {password} setPassword = {setPassword}
                LinkTo={"/sign-up"}
                TextRedirect="Sign Up"
                />
          
        </>
    )
}