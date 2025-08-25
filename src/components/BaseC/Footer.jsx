import styled from 'styled-components';

const Box=styled.div`
    margin-top: 48px;
    display: flex;
    height: 211px;
    padding-left: 40px;
    align-items: center;
    background:#2B3884;
    color:#FAF9F6;
    font-family: SUIT;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 34px; /* 170% */
`
function Footer() {
  return (
  <>
    <Box>동국대학교 멋쟁이자처럼<br/>
    Team 온리유<br/>
    시니어 소상공인을 위한 온라인 데이터 분석 서비스<br/>
    © Badang. All rights reserved.
    </Box>
  </>
    
  );
}

export default Footer;
