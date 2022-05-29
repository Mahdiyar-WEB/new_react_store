import { BsInstagram, BsTelegram, BsGithub, BsLinkedin } from "react-icons/bs";
import styles from "./footer.module.css";

const Footer = ({product}) => {
  return (
    <footer className={`${styles.container} ${product && styles.footer}`}>
      <h1>Mahdiyar-WEB</h1>
      <div className={styles.linkContainer}>
        <a href="https://t.me/mahdiyarMN">
          <BsTelegram />
        </a>
        <a href="https://www.instagram.com/mahdiyar_xd">
          <BsInstagram />
        </a>
        <a href="https://github.com/Mahdiyar-WEB">
          <BsGithub />
        </a>
        <a href="https://www.linkedin.com/in/mahdiyar-marvi-93731a222/">
          <BsLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
