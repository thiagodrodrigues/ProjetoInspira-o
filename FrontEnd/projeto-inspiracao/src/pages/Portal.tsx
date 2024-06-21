import HeaderPortal from "../components/HeaderPortal";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import * as jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ContentComponent from "../components/Content";

function PortalPage() {
  const navigate = useNavigate();
  const USUARIO = localStorage.getItem('token');
  
  useEffect(() => {
    if (!USUARIO) {
      console.log("Token não encontrado, redirecionando para login");
      navigate('/login');
    } else {
      try {
        const decoded = jwt_decode.jwtDecode(USUARIO);
        console.log("Token decodificado:", decoded);
        // Verifique se o token está expirado ou é inválido
        if (!decoded) {
          navigate('/login');
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        navigate('/login');
      }
    }
  }, [USUARIO, navigate]);

  return (
    <>
      <HeaderPortal />
      <div style={{display: "flex"}}>
        <Menu />
        <ContentComponent/>  
      </div>
      <Footer />
    </>
  )
}

export default PortalPage