import styled from 'styled-components';


export default function Chat() {
    return (
        <ChatConteudo>
            <h1>oi</h1>
        </ChatConteudo>
    )
}

const ChatConteudo = styled.div`
  width: 100%;
  display: flex;
  background-color: pink;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  @media (max-width: 614px) {
    border-radius: 0;
  }

`