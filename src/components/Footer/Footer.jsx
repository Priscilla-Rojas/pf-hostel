import React from 'react';
<<<<<<< HEAD
import styles from './Footer.module.css';
=======
import '../Footer/Footer.modules.css';

//Al darle click al icono de google maps, te va a llevar modal y ese modal debe mostrar el iframe (google maps siempre tiene q estar entre un iframe)
{
  /* <iframe
  className="mapa"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886.5555418056924!2d-57.019182085077766!3d-37.32366949064503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959b5dd0e82128d5%3A0xd9877fa09d587e9a!2sCaba%C3%B1a%20Willow!5e0!3m2!1ses-419!2sar!4v1649704101986!5m2!1ses-419!2sar"
></iframe>; */
}
>>>>>>> arf

const Footer = () => {
  return (
    <footer className="container">
<<<<<<< HEAD
      <iframe
        className={styles.mapa}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886.5555418056924!2d-57.019182085077766!3d-37.32366949064503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959b5dd0e82128d5%3A0xd9877fa09d587e9a!2sCaba%C3%B1a%20Willow!5e0!3m2!1ses-419!2sar!4v1649704101986!5m2!1ses-419!2sar"
      ></iframe>
      <div className={styles.icons}>
        <h1 className={styles.title}>Seguinos en nuestras redes sociales !</h1>
        <a className={styles.link} target="_blank" href="www.instagram.com">
          <i type="button" className="bi bi-instagram"></i>
        </a>
        <a className={styles.link} target="_blank" href="www.facebook.com">
=======
      <div className="icons">
        <h1 className="title">🛌 ¡Siguenos en nuestras redes sociales! 🛌</h1>
        <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886.5555418056924!2d-57.019182085077766!3d-37.32366949064503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959b5dd0e82128d5%3A0xd9877fa09d587e9a!2sCaba%C3%B1a%20Willow!5e0!3m2!1ses-419!2sar!4v1649704101986!5m2!1ses-419!2sar">
          <i class="bi bi-geo-alt-fill"></i>
        </a>
        <a href="www.instagram.com">
          <i type="button" className="bi bi-instagram"></i>
        </a>
        <a target="_blank" href="https://www.facebook.com/">
>>>>>>> arf
          <i type="button" className="bi bi-facebook"></i>
        </a>
        <a className={styles.link} target="_blank" href="www.whatsapp.com">
          <i type="button" className="bi bi-whatsapp"></i>
        </a>
        <a href="www.twitter.com">
          <i class="bi bi-twitter"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
