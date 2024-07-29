import React from 'react';
import { ActivityName, Card, CardsContainer, Container, Image, Title } from './Activities.style'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import esportiva from '../../assets/atividades-esportiva.jpg';
import idoso from '../../assets/atividades-idoso.jpg';
import pilates from '../../assets/atividades-pilates.jpg';
import neuro from '../../assets/atividades-neuro.jpg';
import ortopedica from '../../assets/atividades-ortopedica.jpg';

const ActivitiesList: React.FC = () => {
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };
  
  return (
    <motion.div id='activities' style={{backgroundColor: '#F5F4F3'}} className="section" ref={ref6} initial="hidden" animate={inView6 ? "visible" : "hidden"} variants={sectionVariants}>
    <Container>
      <Title>Atividades</Title>
      <CardsContainer>
        <Card key='Fisioterapia Traumato-Ortopédica'>
          <Image src={ortopedica} alt='Fisioterapia Traumato-Ortopédica'/>
          <ActivityName>Fisioterapia Traumato-Ortopédica</ActivityName>
        </Card>
        <Card key='Fisioterapia Esportiva'>
          <Image src={esportiva} alt='Fisioterapia Esportiva'/>
          <ActivityName>Fisioterapia Esportiva</ActivityName>
        </Card>
        <Card key='Fisioterapia Neurofuncional'>
          <Image src={neuro} alt='Fisioterapia Neurofuncional'/>
          <ActivityName>Fisioterapia Neurofuncional</ActivityName>
        </Card>
        <Card key='Fisioterapia em Gerontologia'>
          <Image src={idoso} alt='Fisioterapia em Gerontologia'/>
          <ActivityName>Fisioterapia em Gerontologia</ActivityName>
        </Card>
        <Card key='Pilates'>
          <Image src={pilates} alt='Pilates'/>
          <ActivityName>Pilates</ActivityName>
        </Card>
      </CardsContainer>
    </Container>
    </motion.div>
  );
};

export default ActivitiesList;