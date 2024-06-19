import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Checkbox, CheckboxContainer, Container, Input, Link, LoginForm, Logo, BackgroundOverlay, BackButton } from './Login.style'
import logo from '../../assets/logoColor.png';
import { useNavigate } from "react-router-dom";
import { login } from '../../api/Users';
import arrowLeft from '../../assets/img/angle-left-icon.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, []);
  const number = parseInt("1234567", 10).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", number)   

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', `${rememberMe}`);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
    login({
      email: email,
      password: password,
    }).then((res) => {
      localStorage.setItem('token', `${String(res.data.token)}`);
      localStorage.setItem('id', `${String(res.data.user.id)}`);
      localStorage.setItem('permission', `${String(res.data.permission)}`);
      localStorage.setItem('name', `${String(res.data.user.name)}`);
      localStorage.setItem('email', `${String(res.data.user.email)}`);
      localStorage.setItem('owner', `${String(res.data.user.owner)}`);
      localStorage.setItem('checkbox', `${true}`)
    }).then(() => {
      setTimeout(() => navigate('/portal'), 1000)
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    if (rememberMe) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
      setEmail('');
      setPassword('');
    }
  };
  return (
    <Container>
      <BackgroundOverlay />
      <LoginForm onSubmit={handleLogin}>
        <a href='/'>
        <BackButton>
          <img src={arrowLeft}/>
        </BackButton>
        </a>
        <Logo src={logo} alt="Logo da Empresa" />
        <h2>Inspiração Fisioterapia</h2>
        <form>
          <Input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" placeholder="Senha" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <CheckboxContainer>
            <Checkbox type="checkbox" checked={rememberMe} onChange={handleRememberMeChange}/>
            <label htmlFor="checkbox" style={{ color: 'white' }}>Lembrar-me</label>
          </CheckboxContainer>
          <Button type="submit">Entrar</Button>
        </form>
        <div>
          <Link href="/users/new">Cadastrar</Link>{/*  | <Link href="#">Esqueci minha senha</Link> */}
        </div>
      </LoginForm>
    </Container>
  );
}

export default LoginPage;