import styles from "./Cards.module.css";

interface CardsProps {
    title: string[];
    text: string[];
    src: string[];
    alt: string[];
}

const Cards = (props: CardsProps) => {
    return (
        <div className={`${styles.CardContainer}`}>
            {props.title.map((title, index) =>(
                <div key={index} className={`${styles.card}`}>
                    <img alt={props.src[index]} src={props.src[index]}></img>
                    <h5>{title}</h5>
                    <p>{props.text[index]}</p>
                    <div  className={`${styles.buttonContainer}`}>
                        <button>Saiba Mais</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;