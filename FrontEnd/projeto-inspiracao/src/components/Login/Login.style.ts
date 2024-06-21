import styled from 'styled-components';
import backgroundImg from '../../assets/background1.png'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
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

export const LoginForm = styled.div`
  background-color: rgba(32, 127, 195, 0.85); 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  position: relative;

  h2 {
  font-size: 16px;
  color: white
  }
`;

export const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinhar à esquerda */
  margin: 10px 0;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #2080c3;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #1a69a1;
  }
`;

export const Link = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
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

export const ErrorMessage = styled.p`
  color: black;
  margin-top: 0px;
  font-size: 12px;
`;