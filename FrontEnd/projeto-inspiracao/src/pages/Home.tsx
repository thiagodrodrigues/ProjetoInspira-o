import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import styled from "styled-components";
import backgroundImg from '../assets/background1.png'
import ActivitiesList from "../components/Activities";
import FaWhatspp from "../assets/img/whatsapp-white-icon.svg";
import { WhatsappButton } from "./Home.style";


const BackgroundOverlay = styled.div`
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

const Home = () => {
  return (
    <>
      <>
      <BackgroundOverlay />
        <Header />
        <HomePage />
        <ActivitiesList />
        <div>
          <WhatsappButton href="https://wa.me/5531999910113?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta%20de%20fisioterapia." target="_blank" rel="noopener noreferrer">
            <img src={FaWhatspp} height="50px"></img><p>Agende sua consulta</p>
          </WhatsappButton>
        </div>
      </>
      <Footer/>
    </>
  )
}
/*   const BackgroundOverlay = styled.div`
  position: fixed;
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Home = () => {
  return (
    <>
      <BackgroundOverlay />
      <ContentWrapper>
        <Header />
        <HomePage />
        <ActivitiesList />
        <Footer />
      </ContentWrapper>
    </>
  );
}; */



export default Home