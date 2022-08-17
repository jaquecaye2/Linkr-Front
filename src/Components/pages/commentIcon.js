import { AiOutlineComment } from "react-icons/ai";
import styled from 'styled-components';
import axios from "axios";
import { useState , useEffect} from "react";


export default function CommentsIcon({callback,postId, comment}) {
    const token = localStorage.getItem("token");
    const [qtdComments, setQtdComments] = useState([])
   
    async function commentsQtd() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const promise = axios.get(
            `http://localhost:6002/comments/users/${postId}`, config
        );

        promise
            .then((response) => {
                setQtdComments(response.data.length)
               
            })
            .catch((error) => {
                alert(error);
              
            });
    }
        

    useEffect(() => {
        commentsQtd()
    }, [comment]);


    return (
        <ConteudoComment>
            <div>
                <CommentIcon onClick={callback}/>
                <TotalComments>{qtdComments} comments</TotalComments>
            </div>
        </ConteudoComment>
    );
}

const TotalComments = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF
`
const ConteudoComment = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const CommentIcon = styled(AiOutlineComment)`
    font-size: 20px;
    cursor: pointer;
  
`

