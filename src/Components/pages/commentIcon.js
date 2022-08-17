import { AiOutlineComment } from "react-icons/ai";
import styled from 'styled-components';
import axios from "axios";
import { useState , useEffect} from "react";


export default function CommentsIcon({callback,postId}) {
    const token = localStorage.getItem("token");
    const [qtdComments, setQtdComments] = useState([])

    function showCommentsQtd() {
     
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        const dadosPost = {
          postId: postId
        };
    
        const promise = axios.post(
          `http://localhost:6002/comments`,
          dadosPost,
          config
        );
    
        promise
          .then((response) => {
            console.log(response.data)
            setQtdComments(response.data[0].totalcomments)
          })
          .catch((error) => {
            alert(error);
          });
      }
         useEffect(() => {
            showCommentsQtd()
    }, []);

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

