import HeaderPortal from "../components/HeaderPortal";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import * as jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentComponent from "../components/Content";
import GetContact from "../components/Contacts";

function GetContactPage() {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);
/*   
  useEffect(() => {
    if (!USUARIO) {
      console.log("Token não encontrado, redirecionando para login");
      navigate('/login');
    } else {
      try {
        const decoded = jwt_decode.jwtDecode(USUARIO);
        const currentTime = Date.now() / 1000;
        if (!decoded || decoded.exp! < currentTime) {
          navigate('/login');
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        navigate('/login');
      }
    }
  }, [USUARIO, navigate]); */
  useEffect(() => {
    const checkTokenValidity = () => {
      const USUARIO = localStorage.getItem('token');
      if (!USUARIO) {
        console.log("Token não encontrado, redirecionando para login");
        navigate('/login');
      } else {
        try {
          const decoded = jwt_decode.jwtDecode(USUARIO);
          const currentTime = Date.now() / 1000;

          if (!decoded || decoded.exp! < currentTime) {
            console.log("Token expirado, redirecionando para login");
            navigate('/login');
          } else {
            setIsTokenValid(true);
          }
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
          navigate('/login');
        }
      }
    };

    checkTokenValidity();
  }, [navigate]);

  if (isTokenValid === false) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <HeaderPortal />
      <div style={{display: "flex", position: "relative"}}>
        <Menu />
        <ContentComponent/>  
        <GetContact />
      </div>
      <Footer />
    </>
  )
}

export default GetContactPage