import styled from 'styled-components';
import backgroundImg from '../../assets/background1.png';

export const Container = styled.div`
  width: 80%;
  height: 100vh;
  float: right;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  opacity: 0.2;
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