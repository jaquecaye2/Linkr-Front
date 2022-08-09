import styled from "styled-components"

export default function Header(){
    return(
        <div>
            <Topo>
                <h1>Linkr</h1>
                <h2>oi</h2>
            </Topo>
        </div>
    )
}

const Topo = styled.div`
display: flex;
justify-content: space-between;
padding-left: 5%;
padding-right: 5%;
height: 72px;
width: 100vw;
background-color: #151515;
align-items: center;
h1{
    font-size: 45px;
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 50px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    font-weight: 700
}
`