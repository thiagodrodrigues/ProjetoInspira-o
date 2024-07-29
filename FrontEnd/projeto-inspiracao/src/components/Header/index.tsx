import logo from '../../assets/logoColor-transparente.png'
import React, { FormEvent } from 'react'
import { BackgroundOverlay, HeaderStyle, LinkStyle, LinkStyleTo } from './Header.style'
import { Link, useNavigate } from 'react-router-dom';


const index: React.FC = () => {
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth' 
        });
    }
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/portal'); 
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <BackgroundOverlay />
      <HeaderStyle className='logo-container'>
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className='links-container'>
          <LinkStyle className='links' style={{textDecoration: 'none'}} onClick={() => scrollToSection('about-us')}>Sobre Nós</LinkStyle>
          <LinkStyle className='links' style={{textDecoration: 'none' }} onClick={() => scrollToSection('physiotherapists')}>Profissionais</LinkStyle>
          <LinkStyle className='links' style={{textDecoration: 'none' }} onClick={() => scrollToSection('activities')}>Atividades</LinkStyle>
          <LinkStyle className='links' style={{textDecoration: 'none'}} onClick={() => scrollToSection('contact')}>Contato</LinkStyle>
          <LinkStyleTo className='links' style={{textDecoration: 'none'}} to="">Blog</LinkStyleTo>
          <LinkStyle className='links' style={{textDecoration: 'none'}} onClick={handleClick}>Entrar</LinkStyle>
        </div>
      </HeaderStyle>
    </>
  )
}

export default index