import styled from 'styled-components'

export const Cards = styled.div`
  opacity: 0.5;

.cardnormal{
    max-width: 70vh;
    padding: 0;
    margin: 0 auto;
    padding: 92px 0;
  opacity: 0.5;
 }



  @media only screen and (max-width: 1365px){
    display: inline !important;

    padding: 92px 0;

   }
`

export const WhatsappButton = styled.a`
position: fixed;
bottom: 20px;
right: 20px;
background-color: #25d366;
color: white;
border-radius: 10%;
width: 155px;
height: 60px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
text-decoration: none;
z-index: 1000;

p {
padding: 5px;
}
img {
padding: 5px;
}

&:hover {
  background-color: #1da851;
}

@media (max-width: 600px) {
  bottom: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
}
`;