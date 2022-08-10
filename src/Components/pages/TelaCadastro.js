import FormsLoginSingin from "./formsLoginSingin"
import { useState } from "react"
import axios from "axios"



export default function TelaCadastro(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    
    async function sendFormes(e){
        e.preventDefault()
        const dataSingin = {name, email, password, pictureUrl}

        console.log(dataSingin)

       const req = await axios.post('http://localhost:5007/singin', dataSingin)

       console.log(req)
    }
    
    return(
        <>
           
                <FormsLoginSingin
                type={true}
                sendFormes={sendFormes}
                name = {name} setName = {setName}
                email = {email} setEmail = {setEmail}
                password = {password} setPassword = {setPassword}
                pictureUrl = {pictureUrl} setPictureUrl = {setPictureUrl}
                />
          
        </>
    )
}