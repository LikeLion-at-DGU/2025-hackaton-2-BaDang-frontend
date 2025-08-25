
import styled from 'styled-components';
import Btn from "../CoworkC/PopupButton.jsx";
import Robot from '../../assets/Icons/SadRobotIcon.svg';

const Page=styled.div`
padding: 220px 0px;
    display: flex;
width: 708px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 48px;
`
const Text=styled.div`
width: 100%;
    color: #494954;
text-align: center;
font-family: SUIT;
font-size: 30px;
font-style: normal;
font-weight: 700;
line-height: 45px; /* 150% */
`
const Wrapper=styled.div`
    display: flex;
flex-direction: column;
align-items: center;
gap: 36px;
align-self: stretch;
`

function CoworkUnavailable() {
    return(<Page>
        <img src={Robot} alt="로봇 이미지" />

        <Wrapper>
            <Text>협업 기능에 동의하지 않으시면<br/>
해당 기능을 이용하실 수 없어요</Text>
        <Btn width="708px" height="70px" btnName="협업 기능 동의하러 가기" color="#759AFC"/>
        </Wrapper>
        </Page>);
}

export default CoworkUnavailable;
