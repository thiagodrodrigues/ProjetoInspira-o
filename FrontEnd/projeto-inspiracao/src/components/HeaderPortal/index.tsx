import logo from '../../assets/logoColor-transparente.png'
import React from 'react'
import { HeaderStyle, LinkStyle, LinkStyleTo } from './Header.style'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const HeaderPortal: React.FC = () => {
  const navigate = useNavigate()
  const handleRememberMeChange = () => {
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <>
      <HeaderStyle className='logo-container'>
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className='links-container'>
          <LinkStyleTo className='links' style={{textDecoration: 'none'}} to="/">Início</LinkStyleTo>
          <LinkStyleTo className='links' style={{textDecoration: 'none' }} to="">Atividades</LinkStyleTo>
          <LinkStyleTo className='links' style={{textDecoration: 'none'}} to="">Blog</LinkStyleTo>
          <LinkStyle className='links' style={{textDecoration: 'none'}} onClick={handleRememberMeChange}>Logout</LinkStyle>
        </div>
      </HeaderStyle>
    </>
  )
}

export default HeaderPortal