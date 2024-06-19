import React, { FormEvent, useState } from 'react';
import { Container, Button, Form, Input, BackgroundOverlay, Logo, BackButton } from './CreateUser.style';
import logo from '../../assets/logoColor2.jpeg';
import { createUser } from '../../api/Users';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/img/angle-left-icon.svg';

const CreateUserComponent: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    createUser({
      name: name,
      email: email,
      password: password,
    }).then(() => {
      setTimeout(() => navigate('/login'), 1000)
    }).catch((err) => {
      console.log(err);
      alert("Aconteceu um imprevisto")
    });
  };

  return (
    <Container>
      <BackgroundOverlay/>
      <Form onSubmit={handleSignUp}>
        <a href='/login'>
          <BackButton>
            <img src={arrowLeft}/>
          </BackButton>
        </a>
        <Logo src={logo} alt="Logo da Empresa" />
        <form>
          <label>Nome:</label>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email:</label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha:</label>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Form>
    </Container>
  );
};

export default CreateUserComponent;