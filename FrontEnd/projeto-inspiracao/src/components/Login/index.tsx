import React from 'react'
import { Button, Checkbox, CheckboxContainer, Container, Input, Link, LoginForm, Logo, BackgroundOverlay } from './Login.style'
import logo from '../../assets/logoColor.png'

const LoginPage: React.FC = () => {
  return (
    <Container>
      <BackgroundOverlay />
      <LoginForm>
        <Logo src={logo} alt="Logo da Empresa" />
        <h2>Inspiração Fisioterapia</h2>
        <form>
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Senha" required />
          <CheckboxContainer>
            <Checkbox type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe" style={{ color: 'white' }}>Lembrar-me</label>
          </CheckboxContainer>
          <Button type="submit">Entrar</Button>
        </form>
        <div>
          <Link href="#">Cadastrar</Link> | <Link href="#">Esqueci minha senha</Link>
        </div>
      </LoginForm>
    </Container>
  );
}

export default LoginPage;