import { Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImg from '../../assets/background1.png'

export const HeaderStyle = styled.div `
  display: flex;
  justify-content: space-between;
  background-color: #F5F4F3;
  align-items: center;
  opacity: 0.9;

  .logo {
    min-width: 250px;
    max-width: 400px;
    min-height: 120px;
    max-height: 200px;
  }

  .links-container{
    display: flex
  }

  .links{
    margin: 10px 15px;
    max-width: 250px;  
    
    @media only screen and (max-width: 1084px) {
      margin: 10px 5px;
    }
  }

  @media only screen and (max-width: 960px) {
  }
`
export const LinkStyle = styled.a `
  font-family: 'helvetica-fisioterapia';
  font-style: normal;
  font-size: 25px;
  color: #1E9B9F;
  transition: 0.2s;
  cursor: pointer;

  @media only screen and (max-width: 1084px) {
    font-size: 25px;
  }

  @media only screen and (max-width: 1245px)  {
  }
`
export const LinkStyleTo = styled(Link) `
  font-family: 'helvetica-fisioterapia';
  font-style: normal;
  font-size: 25px;
  color: #1E9B9F;
  transition: 0.2s;

  @media only screen and (max-width: 1084px) {
    font-size: 25px;
  }

  @media only screen and (max-width: 1245px)  {
  }
`
export const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
`;