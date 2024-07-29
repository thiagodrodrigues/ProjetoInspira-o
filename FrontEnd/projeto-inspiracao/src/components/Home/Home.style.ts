import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
  width: 80%;
  height: 50%;
  padding-bottom: 20px;
  padding-top: 20px;
  margin: 0 auto;
  
  .carousel .carousel-status {
    display: none;
  }

  .carousel .slide .legend{
    background: linear-gradient(to right, #207FC3, darkblue); 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
    background-clip: text; 
    color: transparent; 
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5); 
    font-size: 32px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
    margin-left: auto;
    width: auto;
    left: 50%;
    bottom: auto;
    top: 10%;
    font-weight: bold;
    line-height: 2;
    text-align: justify;
  }

  @media only screen and (max-width: 960px) {
  }
`;

export const CarouselImage = styled.img`
  width: 100%;
  max-height: 60vh;
  object-fit: cover;
`;

export const AboutUs = styled.div`
.about-us-container {
  width: 80%;
  margin: 25px auto;
}

.section {
  display: flex;
  margin-bottom: 40px;
  margin-top: 40px;
  justify-content: center
}

.text-about-us {
  text-align: justify;
  font-size: 18px;
  color: #207FC3;
  line-height: 1.7;
}

.column {
  width: 50%; 
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.column-workers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 50%; /* Ajuste a largura da seção */
  padding: 10px;
}

.column-workers img {
  width: 40%; /* Ajuste a largura das imagens */
  height: 40%;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  margin: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
}

.column-workers img:first-child {
  top: 8%;
  left: 8%;
  transform: rotate(-5deg);
}

.column-workers img:last-child {
  top: 45%;
  left: 50%;
  transform: rotate(5deg);
}

.column-workers img:hover {
  z-index: 1;
  transform: scale(1.15);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

h1 {
  text-align: start;
  color: #207FC3;
  font-size: 46px;  
  position: relative;
  background-image: radial-gradient(#207FC3, darkcyan);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

h1:after {
  content: '';
  display: block;
  width: 265px; /* Ajuste a largura da linha conforme necessário */
  height: 4px; /* Ajuste a espessura da linha conforme necessário */
  background-image: radial-gradient(#207FC3, darkcyan);
  margin: 8px 5px; /* Centraliza a linha abaixo do título */
}

h3 {
  text-align: start;
  padding-bottom: 10px;
}

img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
`;