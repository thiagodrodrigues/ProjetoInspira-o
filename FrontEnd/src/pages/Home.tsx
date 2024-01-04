import {LogoStyle, HeaderStyle, UlStyle, LiStyle, NavStyle} from "../styles/Home.styles.ts";

const Home = () => {
    return (<>
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
    </>)
};

export default Home