import styles from "./Article.module.css";

interface ArticleProps {
    title: string;
    text: string[];
    src: string[];
    alt: string[];
    side: string;
}

const Article = (props: ArticleProps) => {
    const direction = props.side === "left" ? styles.articleContainerLeft : styles.articleContainerRight;
    return (
        <div className={`${styles.articleContainer} ${direction}`}>
            <div className={styles.articleText}>
                <h4>{props.title}</h4>
                {props.text.map((text) => (
                    <p>{text}</p>
                ))}
            </div>
            <div className={styles.articleImages}>
                {props.src.map((src, index) => (
                    <img key={index} alt={props.alt[index]} src={src} ></img>
                ))}
            </div>
        </div>
    );
};

export default Article;