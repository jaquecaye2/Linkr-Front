import styled from "styled-components"
import { Link } from 'react-router-dom';

export default function FormsLoginSingin({
    type, sendFormes,
     name, setName,
     email, setEmail,
     password, setPassword,
     pictureUrl, setPictureUrl,
     LinkTo, TextRedirect, TextButton
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
        <Button><h2>{TextButton}</h2> </Button>
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
width: 100%;
padding-top: 20%;



input{
    height: 55px;
    width:84%;
    border-radius:6px;
    margin-bottom:11px;
    
}
input::placeholder{
  padding-left: 17px;
  font-size: 22px;
  color: #9F9F9F;
  font-weight: 700;
}
`
const RedirectRoute = styled.div`
a{
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 300;
  
}
`

const Button = styled.button`
    height: 65px;
    width:84%;
    background-color: #1877F2;
    border:  none;
    border-radius: 6px;
    margin-bottom: 14px;
    h2{
      color: #FFFFFF;
      font-size: 27px;
    }

`

