import { AiOutlineComment } from "react-icons/ai";
import styled from 'styled-components';


export default function CommentsIcon({callback}) {
  

    return (
        <ConteudoComment>
            <div>
                <CommentIcon onClick={callback}/>
                <TotalComments>0 comments</TotalComments>
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

