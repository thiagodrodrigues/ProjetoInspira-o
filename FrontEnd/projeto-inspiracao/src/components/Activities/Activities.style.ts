import styled from 'styled-components';
import esportiva from '../../assets/esportiva.jpg';
import idoso from '../../assets/idoso2.jpg';
import pilates from '../../assets/pilates.jpg';
import neuro from '../../assets/neuro.jpg';
import ortopedica from '../../assets/ortopedica.jpg';

export const Container = styled.div`
  width: 80%;
  height: 50%;
  padding-bottom: 20px;
  padding-top: 20px;
  margin: 0 auto;
`;

export const Title = styled.h1`
text-align: start;
color: #207FC3;
font-size: 46px;  
position: relative;
background-image: radial-gradient(#207FC3, darkcyan);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

&::after {
  content: '';
  display: block;
  width: 210px; 
  height: 4px; 
  background-image: radial-gradient(#207FC3, darkcyan);
  margin: 8px 5px; 
}
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const ActivityName = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const activities = [
  {
    name: 'Fisioterapia Traumato-Ortopédica',
    image: ortopedica
  },
  {
    name: 'Fisioterapia Esportiva',
    image: esportiva
  },
  {
    name: 'Fisioterapia Neurofuncional',
    image: neuro
  },
  {
    name: 'Fisioterapia em Gerontologia',
    image: idoso
  },
  {
    name: 'Pilates',
    image: pilates
  }
];