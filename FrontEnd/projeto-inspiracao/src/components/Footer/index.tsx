import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FooterStyle, FormStyle, InfoStyle, InputStyle, TextAreaStyle, ButtonStyle, LinkStyle, Copyright } from './Footer.style';
import { createContact } from '../../api/Contact';
import whatsapp from '../../assets/img/whatsapp-white-icon.svg';
import home from '../../assets/img/home-page-white-icon.svg';

const Footer: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const newContact = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      message,
    };
    try {
      const response = await createContact(payload);
      if (response.status !== 201) {
        return alert("Ops... Deu algo errado. Por favor, revise os dados de cadastro e tente novamente");
      } else{
        setName('');
        setEmail('');
        setMessage('');
        navigate("/");
        return alert("Mensagem Encaminhada para Inspiração Fisioterapia!");
      }
    } catch (error) {
      alert("Ops... Deu algo errado. Por favor, revise os dados de cadastro e tente novamente");
    }
  }

  return (
    <>
    <FooterStyle>
      <FormStyle onSubmit={newContact}>
        <h2 id="contact" >Contato</h2>
        <InputStyle
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputStyle
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextAreaStyle
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <ButtonStyle type="submit">Enviar Mensagem</ButtonStyle>
      </FormStyle>
      <InfoStyle>
        <div>
    <p style={{display: "flex", alignItems: "center"}}><img className="avatar" src={whatsapp} style={{width: "30px", color: "white", padding: "5px"}} alt="icon_whatsapp" /><LinkStyle href="https://wa.me/5531999910113?text=Olá%2C%20gostaria%20de%20agendar%20uma%20consulta%20de%20fisioterapia." target="_blank">(31) 99991-0113</LinkStyle></p>
    <p style={{display: "flex", alignItems: "center"}}><img className="avatar" src={home} style={{width: "30px", color: "white", padding: "5px"}} alt="icon_whatsapp" /> <LinkStyle href="https://maps.app.goo.gl/hRafNZev4vUrqpqD8" target="_blank">Rua São Gonçalo, 995, Nova Floresta - Belo Horizonte, MG</LinkStyle></p>
    <br/>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d937.9345680759491!2d-43.932826330512654!3d-19.893270637763997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa69b17ed56c24d%3A0xe4d48941d999d20d!2zQ29uc3VsdMOzcmlvIEluc3BpckHDp8Ojbw!5e0!3m2!1spt-BR!2sbr!4v1717453870579!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    </div>
</InfoStyle>
    </FooterStyle>
    <Copyright>© Copyright – Todos os Direitos Reservados – Desenvolvido por Thiago Daniel Alvim Rodrigues - thiago.alvimrodrigues@gmail.com</Copyright>
    </>
  );
}

export default Footer;