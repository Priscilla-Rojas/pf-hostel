import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../ContactUs/ContactUs.module.css';
import Logo from '../../Images/fondo.png';

const ContactUs = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [modal, setModal] = useState(false);

  //FALTA IMPLEMENTAR EL FETCH A LA RUTA QUE ME DE ERIC (ASI LE ENVIAMOS LOS DATOS DE ESTE FORMULARIO)

  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
    // ricky tenes q implementar aca q se cierre el modal cuando se envie el formulario
  };

  return (
    <div className={styles.register}>
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          textarea: '',
        }}
        validate={(valores) => {
          let errores = {};
          console.log('pararicky', valores);
          // Validacion nombre
          if (!valores.name || !valores.name.trim()) {
            errores.name = 'Please enter a name';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
            errores.name = 'The name can only contain letters and spaces';
          }

          // Validacion lastname
          if (!valores.lastname || !valores.lastname.trim()) {
            errores.lastname = 'Please enter a lastname';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastname)) {
            errores.lastname =
              'The lastname can only contain letters and spaces';
          }

          // Validacion email
          if (!valores.email) {
            errores.email = 'Please enter a email';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email =
              'Email can only contain letters, numbers, points, script and underscores';
          }

          // Validacion textarea
          if (!valores.textarea || !valores.textarea.trim()) {
            errores.textarea = 'Please enter a textarea';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.textarea)) {
            errores.textarea =
              'The textarea can only contain letters and spaces';
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          //   sendData(valores);
          alert('Created Succesfully');
          resetForm();
          console.log('INFO', valores);
          cambiarFormularioEnviado(true);
          setTimeout(
            () => cambiarFormularioEnviado(false),

            5000
          );
        }}
      >
        {({ errors }) => (
          <Form className={styles.formulario}>
            <div>
              <button onClick={handleClick} className={styles.buttonicon}>
                <i
                  className={`${styles.icon} bi bi-arrow-left-square-fill`}
                ></i>
              </button>
              <img className={styles.img} src={Logo} alt="" />
              <label htmlFor="name">First Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Put your name"
              />
              <ErrorMessage
                name="name"
                component={() => (
                  <div className={styles.error}>{errors.name}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <Field
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Put your lastname"
                // onChange={handleChange}
              />
              <ErrorMessage
                name="lastname"
                component={() => (
                  <div className={styles.error}>{errors.lastname}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="email">Email (Username)</label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="email@email.com"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className={styles.error}>{errors.email}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="textarea">Message</label>
              <Field
                as="textarea"
                type="text"
                id="textarea"
                name="textarea"
                placeholder="Your message"
              />
              <ErrorMessage
                name="textarea"
                component={() => (
                  <div className={styles.error}>{errors.textarea}</div>
                )}
              />
            </div>
            <button type="submit">Send</button>
            {formularioEnviado && (
              <p className={styles.exito}>Formulario enviado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactUs;