import styled from "styled-components";
import backImg from "./back.png"
import nextImg from "./next.png"


export const DailyNewsContent = styled.div`

padding:20px;

h3{

/* H3 Aon */
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 32px;
/* or 133% */
color: #012774;

}

p {
/* Paragraph Default */
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
/* or 125% */

color: #000000;
}

h4{
/* 1 of 3 */
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
/* or 125% */

/* Charcoal */
color: #2E2E2E;

}
`

export const ButtonContainer = styled.div`  
position: absolute;
bottom: 30px;
display: flex;
width:90%;
`

export const BackButtonHolder = styled.img`
/* Rectangle */
height:48px;
width:48px;
`
BackButtonHolder.defaultProps = {
    src: backImg,
};


export const NextButtonHolder = styled.img`
height:48px;
width:48px;
margin-left: auto;
`
NextButtonHolder.defaultProps = {
    src: nextImg,
};

