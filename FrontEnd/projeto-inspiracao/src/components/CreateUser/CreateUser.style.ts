import styled from 'styled-components';
import backgroundImg from '../../assets/background1.png';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const Form = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: rgba(32, 127, 195, 0.85); 
padding: 10px;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
width: 30%;
height: 90%;
text-align: center;
position: relative;

h2 {
font-size: 16px;
color: white
}
label {
width: 70%;
font-size: 15px;
display: flex;
align-items: start;
color: white
}
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

export const Logo = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
`;

export const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  z-index: -1;
`;

export const BackButton = styled.button`
position: absolute;
top: 1rem;
left: 1rem;
display: flex;
align-items: center;
background: none;
border: none;
color: #007bff;
cursor: pointer;
font-size: 1.5rem;
color: white;
  img {
  width: 20%;
  color: white;
  filter: invert(100%);
  background-color: transparent;
  }

&:hover {
  color: #0056b3;
}
`;