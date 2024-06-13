import React, { useEffect, useState } from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { StyledCarouselContainer, CarouselImage, AboutUs } from './Home.style';
import { getBlog } from '../../api/Blog';
import bemestar from '../../assets/carousel/bemestar.jpg';
import corrida from '../../assets/carousel/corrida.jpg';
import pilates from '../../assets/carousel/pilates1.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import fachada from '../../assets/fachada.png';
import fisioterapia1 from '../../assets/fisioterapia1.jpg';
import fisioterapeuta from '../../assets/roberta2.png';
import rosa from '../../assets/margarida1.jpg'


const HomePage: React.FC = () => {
  const [hasBlogPosts, setHasBlogPosts] = useState<boolean | null>(null);
  const [blogPosts, setBlogPosts] = useState<Array<{ url: string, titleUrl: string, title: string }> | null>(null);

  useEffect(() => {
    searchBlog();
  }, []);

  const searchBlog = async () => {
    try {
      const response = await getBlog();
      if (response.status === 200 && response.data.length > 0) {
        setHasBlogPosts(true);
        setBlogPosts(response.data.slice(0, 5));
      } else {
        setHasBlogPosts(false);
      }
    } catch (error) {
      setHasBlogPosts(false);
    }
  };
  

  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#F5F4F3'}}>
      {hasBlogPosts === false && (
        <StyledCarouselContainer>
        <ResponsiveCarousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={6000}>
          <div>
            <CarouselImage src={bemestar} alt="bemestar" style={{borderRadius: "20px"}}/>
          </div>
          <div>
            <CarouselImage src={corrida} alt="corrida"/>
          </div>
          <div>
            <CarouselImage src={pilates} alt="pilates"/>
          </div>
        </ResponsiveCarousel >
        </StyledCarouselContainer>
      )}
      {hasBlogPosts === true && blogPosts !== null && (
        <StyledCarouselContainer>
        <ResponsiveCarousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={3000}>
          {blogPosts.map((post, index) => (
            <Link to={post['titleUrl']}>
              <div key={index}>
                <CarouselImage src={post.url} alt={post.title} style={{borderRadius: "20px"}} />
                <p className="legend">{post.title}</p>
              </div>
            </Link>
          ))}
        </ResponsiveCarousel>
      </StyledCarouselContainer>
      )}
      <AboutUs>
      <div className="about-us-container">
      <h1 id="about-us">SOBRE NÓS</h1>
      <div className="section">
        <div className="column">
          <h3>NOSSA MISSÃO</h3>
          <p className="text-about-us">Na Clínica de Fisioterapia Inspiração, nossa missão é proporcionar cuidados de fisioterapia da mais alta qualidade, com foco na recuperação e bem-estar de nossos pacientes. Com anos de experiência no setor, nossa equipe altamente qualificada e dedicada trabalha incansavelmente para oferecer serviços de fisioterapia excepcionais a todos que buscam nossa ajuda.</p>
        </div>
        <div className="column">
          <img src={fachada} alt="Foto Seção 1" />
        </div>
      </div>
      <div className="section">
        <div className="column">
          <img src={fisioterapia1} alt="Foto Seção 2" />
        </div>
        <div className="column">
          <h3>NOSSO ESPAÇO</h3>
          <p className="text-about-us">Nosso espaço foi cuidadosamente projetado para criar um ambiente acolhedor e confortável. Acreditamos que um ambiente agradável desempenha um papel fundamental na recuperação dos pacientes. Ao entrar em nossa clínica, você será recebido por uma atmosfera serena e relaxante, projetada para aliviar a tensão e promover a sensação de bem-estar.</p>
          <br/>
          <p className="text-about-us">Nossas instalações modernas e equipamentos de última geração são cuidadosamente mantidos para garantir um ambiente limpo e seguro para nossos pacientes. Cada sala de tratamento é projetada para privacidade e conforto, proporcionando um local tranquilo para que nossos fisioterapeutas desenvolvam planos de tratamento personalizados.</p>
        </div>
      </div>
      <div className="section">
        <div className="column">
          <h3>PROFISSIONAIS</h3>
          <p className="text-about-us">A qualidade técnica de nossa equipe é o que nos diferencia. Todos os nossos fisioterapeutas são altamente qualificados, licenciados e experientes em diversas áreas da fisioterapia. Mantemos um compromisso constante com a aprendizagem contínua, garantindo que nossa equipe esteja atualizada com as mais recentes pesquisas e técnicas inovadoras.</p>
          <br/>
          <p className="text-about-us">Nossos tratamentos são baseados em evidências científicas e adaptados às necessidades individuais de cada paciente. Utilizamos abordagens multifacetadas que incluem terapia manual, exercícios terapêuticos, modalidades de tratamento avançadas e aconselhamento para promover a recuperação completa e duradoura.</p>
          <br/>
          <p className="text-about-us">Além disso, a comunicação aberta e a empatia são fundamentais em nosso atendimento. Queremos que todos os pacientes se sintam ouvidos e compreendidos, e estamos sempre disponíveis para responder a perguntas e fornecer suporte ao longo de sua jornada de reabilitação.</p>
        </div>
        <div className="column-workers">
          <img src={fisioterapeuta} alt="Foto Seção 3" />
          <img src={fisioterapeuta} alt="Foto Seção 3" />
        </div>
      </div>
      <div className="section">
        <div className="column">
          <img src={rosa} alt="Foto Seção 4" />
        </div>
        <div className="column">
          <h3>COMPROMISSO</h3>
          <p className="text-about-us">Na Clínica de Fisioterapia Inspiração, nossa paixão é ajudar as pessoas a recuperar sua mobilidade e qualidade de vida. Estamos comprometidos em proporcionar o mais alto nível de atendimento e cuidado, a fim de garantir que nossos pacientes alcancem seus objetivos de saúde e bem-estar.</p>
          <br/>
          <p className="text-about-us">Agende uma consulta conosco e experimente em primeira mão a excelência em cuidados de fisioterapia em um ambiente acolhedor e de qualidade.</p>
          <br/>
          </div>
      </div>
    </div>
      </AboutUs>
    </div>
  );
}

export default HomePage;