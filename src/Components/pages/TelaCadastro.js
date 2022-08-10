import FormsLoginSingin from "./formsLoginSingin"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export default function TelaCadastro(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')

    let navigate = useNavigate()
    
    async function sendFormes(e){
        try{

            e.preventDefault()
            const dataSingin = {name, email, password, pictureUrl}
            
            console.log(dataSingin)
            
            await axios.post('http://localhost:5007/singin', dataSingin)
            
            navigate("/")

        }catch(error){
        

                alert(error.response.data)

        }
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
                LinkTo={"/"}
                TextRedirect="Log In"
                />
          
        </>
    )
}