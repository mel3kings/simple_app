import styled from "styled-components";
import NewsImage from './news.jpeg';
import CyberImage from './cyber.jpeg';
import GetUpTodateImage from './link.png'
import headerImage from './menu.png'
import companyOne from './Navigation_essentials.png'
import companyTwo from './Navigation_Patagonia.png'

import NumberImage from './number.png'
import BestPracticeImage from './best_practice.png'

export const ContentBody = styled.div`
padding: 20px
`
export const DailyNewsBriefCard = styled.div`
/* Vector */
padding-left:20px;
padding-top:10px;
background: #FFFFFF;
border: 1px solid #E4E4E4;
margin-bottom: 18px;
padding-bottom:10px;
/* Daily Brief */

position: static;
left: 5.92%;
right: 52.96%;
top: 15.38%;
bottom: 15.38%;

/* H2 Aon */
h2{
font-family: Roboto Slab;
font-style: normal;
font-weight: normal;
font-size: 28px;
line-height: 36px;
color: #012774;
}


h3{
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
/* or 140% */

/* Charcoal */
color: #2E2E2E;

}

h5{
/* Input Label */
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
text-align: right;

/* Gray · 60% */
color: #919699;

margin-top:auto;

}
`

export const ButtonContainer = styled.div`
display:flex;
justify-content: space-between;
margin-right:10px

`


export const H3 = styled.div`
font-family: Roboto Slab;
font-style: normal;
font-weight: normal;
font-size: 28px;
line-height: 36px;
color: #012774;
`
export const BlueButton = styled.button`
/* Button */

width: 132px;
right: 20px;
top: 85.17%;
bottom: 4.94%;
/* Frame 5 */

/* Auto Layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

width: 135px;
height: 44px;
left: 0px;
top: 0px;

background: #012774;
border-radius: 4px;


/* Button */

position: static;
left: 31.11%;
right: 31.11%;
top: 27.27%; 
bottom: 27.27%;

font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */
text-align: center;

color: #FFFFFF;


/* Inside Auto Layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 0px 12px;
`


export const LineBreak = styled.hr`
background: #F8F8F8;
`
export const RiskMonitor = styled.div`
/* Skills snapshot */
margin-top:18px;
position: static;
left: 0%;
right: 4.05%;
top: 0%;
bottom: 42.86%;

/* H3 Aon */
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 32px;
/* identical to box height, or 133% */

color: #000000;


/* Inside Auto Layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 4px 0px;
`
export const SubHeading = styled.div`/* Your recommended focus areas */

position: static;
left: 0%;
right: 0%;
top: 64.29%;
bottom: 0%;

/* Paragraph Default */
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 20px;
/* identical to box height, or 125% */

color: #BFC5D2;


/* Inside Auto Layout */
flex: none;
order: 1;
flex-grow: 0;
margin: 4px 0px;
padding-bottom:18px
`

export const Card = styled.div`
display: flex;
padding-bottom:18px;
`

export const ImageHolder = styled.div`
margin-top: auto;
margin-bottom: auto;
padding-right:10px;
`
export const TextHolder = styled.div`
position:relative;
bottom:45px;
left:18.5px;

font-family: Roboto Slab;
font-style: normal;
font-weight: bold;
font-size: 28px;
line-height: 36px;
/* or 129% */
display: flex;
align-items: flex-end;
text-align: center;

/* White Base */
color: #FFFFFF;
`


export const CardContentHolder = styled.div`
/* Risk */
display:flex;
background: #FFFFFF;
/* Aon elevated */
box-shadow: 0px 4px 10px rgba(192, 192, 192, 0.4);
border-radius: 4px;
padding: 16px;
width:100%

`
export const CardHeader = styled.div`
padding-bottom:4px;
padding-right:6px;
/* H5 Aon */
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 28px;
/* or 140% */

color: #000000;
`

export const CardSubHeader = styled.div`
/* Paragraph Default */
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
color: #000000;
`

export const Author = styled.div`/* First Last */
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 16px;
/* or 133% */

color: #BFC5D2;
`

export const PictureHolder = styled.div`/* Small picture */
/* Rectangle */
width: 89px;
height:89px;
left: calc(50% - 133px/2);
top: -6.67%;
bottom: 0%;
background: #D3D3D3;
`

export const BestPractice = styled.img`
height:100%;
width:100%;

`
BestPractice.defaultProps = {
    src: BestPracticeImage,
};

export const NumberHolder = styled.img`
height:56px;
width:50px;

`
NumberHolder.defaultProps = {
    src: NumberImage,
};

export const CompanyOneImage = styled.img`
/* Rectangle */
height: 223px;
width: 100%;
`
CompanyOneImage.defaultProps = {
    src: NewsImage,
};

export const CompanyTwoImage = styled.img`
/* Rectangle */
height: 223px;
width: 100%;
`

CompanyTwoImage.defaultProps = {
    src: CyberImage,
};

export const GetUpToDateImage = styled.img`
height: 24px;
width: 100%;
`

GetUpToDateImage.defaultProps = {
    src: GetUpTodateImage,
};

export const HeaderImage = styled.img`
height: 100%;
width: 100%;
`

HeaderImage.defaultProps = {
    src: headerImage,
};

export const CompanyOne = styled.img`
height: 100%;
width: 100%;
`

CompanyOne.defaultProps = {
    src: companyOne,
};

export const CompanyTwo = styled.img`
height: 100%;
width: 100%;
`

CompanyTwo.defaultProps = {
    src: companyTwo,
};

