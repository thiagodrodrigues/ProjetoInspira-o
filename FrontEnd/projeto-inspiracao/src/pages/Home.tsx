import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import styled from "styled-components";
import backgroundImg from '../assets/background1.png'
import ActivitiesList from "../components/Activities";


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