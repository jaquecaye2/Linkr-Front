import styled from "styled-components"
import axios from "axios"

export default function FormsLoginSingin({
    type, sendFormes,
     name, setName,
     email, setEmail,
     password, setPassword,
     pictureUrl, setPictureUrl}){

       

    return(
      <>
        <Form onSubmit={sendFormes}>
            <input placeholder="e-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>

            <input placeholder="password" type="text" value={password} onChange={e=>setPassword(e.target.value)}/>

        {!type ? 

        <></>
        :
            <>
            <input placeholder="usename" type="text"value={name} onChange={e=>setName(e.target.value)}/>

            <input placeholder="picture url" type="text"value={pictureUrl} onChange={e=>setPictureUrl(e.target.value)}/>
            </>
        }
        <button> enviar</button>
        </Form>
      </>
    )
}

const Form = styled.form`

display: flex;
flex-direction: column;
align-items: center;

input{
    height: 55px;
    width:90%;
    margin-bottom:11px
}

`