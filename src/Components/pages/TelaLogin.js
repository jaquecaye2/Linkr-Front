import FormsLoginSingin from "./formsLoginSingin"
import { useState } from "react"
import axios from "axios"



export default function TelaLogin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function sendFormes(e){
        e.preventDefault()
        const dataLogin = {email, password}

        console.log(dataLogin)

        const req = await axios.post('http://localhost:5007/login', dataLogin)
        
        console.log(req)
    }
    
    return(
        <>
           
                <FormsLoginSingin
                type={false}
                sendFormes={sendFormes}
                email = {email} setEmail = {setEmail}
                password = {password} setPassword = {setPassword}
                />
          
        </>
    )
}