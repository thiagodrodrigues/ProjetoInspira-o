import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import styles from "./ContactMap.module.css";

const ContactMap = () => {
    return (
        <>
            <p>
                <WhatsAppIcon/> (31) 9 9548-6517
            </p>
            <p><EmailIcon/> inspiracaofisioterapia@gmail.com</p>
            <img className={`${styles.map}`} alt={'mapa'} src={'src/assets/images/map.jpg'}/>
        </>
    );
};

export default ContactMap;