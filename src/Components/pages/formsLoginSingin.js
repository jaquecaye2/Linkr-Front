import styled from "styled-components"
import { Link } from 'react-router-dom';

export default function FormsLoginSingin({
    type, sendFormes,
     name, setName,
     email, setEmail,
     password, setPassword,
     pictureUrl, setPictureUrl,
     LinkTo, TextRedirect
    }){

       

    return(
      <>
        <Form onSubmit={sendFormes}>
            <input placeholder="e-mail" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>

            <input placeholder="password" type="text" required value={password} onChange={e=>setPassword(e.target.value)}/>

        {!type ? 

        <></>
        :
            <>
            <input placeholder="usename" type="text" required value={name} onChange={e=>setName(e.target.value)}/>

            <input placeholder="picture url" type="text" required value={pictureUrl} onChange={e=>setPictureUrl(e.target.value)}/>
            </>
        }
        <button> enviar</button>
        </Form>

        <RedirectRoute >
       
        <Link to={LinkTo}>
          <h1>{TextRedirect}</h1>
        </Link>
        </RedirectRoute>


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
const RedirectRoute = styled.div`

background-color: red;
`