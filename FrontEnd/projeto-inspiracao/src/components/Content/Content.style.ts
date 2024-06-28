import styled from 'styled-components';
import backgroundImg from '../../assets/background1.png';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: -1; /* Coloca o background atrás do conteúdo */
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white; /* Cor de exemplo para o texto */
`;