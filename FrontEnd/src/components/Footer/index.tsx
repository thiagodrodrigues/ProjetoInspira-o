import styles from "./Footer.module.css";
import ContactForm from "../ContactForm";
import ContactMap from "../ContactMap";


const Footer = () => {
    return (
        <footer>
            <h2 className={`${styles.title} ${styles.line}`}>CONTATO</h2>
            <div className={`${styles.container}`}>
                <div>
                    <ContactForm />
                </div>
                <div className={`${styles.ContactMap}`}>
                    <ContactMap/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;