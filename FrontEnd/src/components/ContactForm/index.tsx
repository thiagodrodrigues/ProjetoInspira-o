import styles from "./ContactForm.module.css";

const ContactForm = () => {
    return (
        <>
            <form className={`${styles.form}`}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome"/>
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email"/>
                </div>
                <div>
                    <label htmlFor="msg">Mensagem:</label>
                    <textarea className={`${styles.textarea}`} id="msg"></textarea>
                </div>
                <div>
                    <button className={`${styles.button}`} type="button">Enviar</button>
                </div>
            </form>
        </>
    );
};

export default ContactForm;