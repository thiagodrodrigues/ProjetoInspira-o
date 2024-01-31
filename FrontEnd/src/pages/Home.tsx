import {HeaderStyle, LiStyle, LogoStyle, MainStyle, NavStyle, UlStyle} from "../styles/Home.styles.ts";
import Article from "../components/Article";
import Section from "../components/Section";
import Cards from "../components/Cards";

const Home = () => {
    return (
        <>
            <HeaderStyle>
                <LogoStyle src='src/assets/images/horizontalLogo.png'></LogoStyle>
                <NavStyle>
                    <UlStyle>
                        <LiStyle>SOBRE NÓS</LiStyle>
                        <LiStyle>CONVÊNIOS</LiStyle>
                        <LiStyle>ATIVIDADES</LiStyle>
                        <LiStyle>BLOG</LiStyle>
                        <LiStyle>CONTATO</LiStyle>
                        <LiStyle>ENTRAR</LiStyle>
                    </UlStyle>
                </NavStyle>
            </HeaderStyle>
            <MainStyle>
                <Section title={'SOBRE NÓS'}>
                    <Article title={'NOSSA MISSÃO'}
                             text={['Na Clínica de Fisioterapia Inspiração, nossa missão é proporcionar cuidados de fisioterapia da mais alta qualidade, com foco na recuperação e bem-estar de nossos pacientes. Com anos de experiência no setor, nossa equipe altamente qualificada e dedicada trabalha incansavelmente para oferecer serviços de fisioterapia excepcionais a todos que buscam nossa ajuda.​']}
                             src={['src/assets/images/presentation/image1.jpg']}
                             alt={['image1']}
                             side={'left'}
                    >
                    </Article>
                    <Article title={'NOSSO ESPAÇO'}
                             text={['Nosso espaço foi cuidadosamente projetado para criar um ambiente acolhedor e confortável. Acreditamos que um ambiente agradável desempenha um papel fundamental na recuperação dos pacientes. Ao entrar em nossa clínica, você será recebido por uma atmosfera serena e relaxante, projetada para aliviar a tensão e promover a sensação de bem-estar.', 'Nossas instalações modernas e equipamentos de última geração são cuidadosamente mantidos para garantir um ambiente limpo e seguro para nossos pacientes. Cada sala de tratamento é projetada para privacidade e conforto, proporcionando um local tranquilo para que nossos fisioterapeutas desenvolvam planos de tratamento personalizados.']}
                             src={['src/assets/images/presentation/image2.jpg', 'src/assets/images/presentation/image2.jpg']}
                             alt={['image1', 'image2']}
                             side={'right'}
                    >
                    </Article>
                    <Article title={'PROFISSIONAIS'}
                             text={['A qualidade técnica de nossa equipe é o que nos diferencia. Todos os nossos fisioterapeutas são altamente qualificados, licenciados e experientes em diversas áreas da fisioterapia. Mantemos um compromisso constante com a aprendizagem contínua, garantindo que nossa equipe esteja atualizada com as mais recentes pesquisas e técnicas inovadoras.', 'Nossos tratamentos são baseados em evidências científicas e adaptados às necessidades individuais de cada paciente. Utilizamos abordagens multifacetadas que incluem terapia manual, exercícios terapêuticos, modalidades de tratamento avançadas e aconselhamento para promover a recuperação completa e duradoura.', 'Além disso, a comunicação aberta e a empatia são fundamentais em nosso atendimento. Queremos que todos os pacientes se sintam ouvidos e compreendidos, e estamos sempre disponíveis para responder a perguntas e fornecer suporte ao longo de sua jornada de reabilitação.']}
                             src={['src/assets/images/presentation/image3.jpg', 'src/assets/images/presentation/image3.jpg']}
                             alt={['image1', 'image2']}
                             side={'left'}
                    >
                    </Article>
                    <Article title={'COMPROMISSO'}
                             text={['Na Clínica de Fisioterapia Inspiração, nossa paixão é ajudar as pessoas a recuperar sua mobilidade e qualidade de vida. Estamos comprometidos em proporcionar o mais alto nível de atendimento e cuidado, a fim de garantir que nossos pacientes alcancem seus objetivos de saúde e bem-estar', 'Se você está enfrentando dores, lesões musculares, problemas de mobilidade ou qualquer outra condição que exija tratamento de fisioterapia, estamos aqui para ajudar. Agende uma consulta conosco e experimente em primeira mão a excelência em cuidados de fisioterapia em um ambiente acolhedor e de qualidade.', 'Obrigado por considerar a Clínica de Fisioterapia Inspiração como sua escolha para cuidados de fisioterapia. Estamos ansiosos para acompanhá-lo em sua jornada em direção à recuperação e ao bem-estar.']}
                             src={['src/assets/images/presentation/image2.jpg']}
                             alt={['image1']}
                             side={'right'}
                    >
                    </Article>
                </Section>
                <Section title={'ATIVIDADES'}>
                    <Cards
                        title={['Fisioterapia Desportiva', 'Fisioterapia Ortopédica', 'Fisioterapia Neurológica']}
                        text={['Descrição Fisioterapia Desportiva','Descrição Fisioterapia Ortopédica', 'Descrição Fisioterapia Neurológica' ]}
                        src={['src/assets/images/presentation/image1.jpg', 'src/assets/images/presentation/image1.jpg', 'src/assets/images/presentation/image1.jpg']}
                        alt={['image1', 'image2', 'image3']}
                    ></Cards>
                </Section>
            </MainStyle>

        </>
    )
};

export default Home;