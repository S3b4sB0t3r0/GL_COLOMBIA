import React, { useState } from 'react';
import '../styles/Contacto.css';
import logo from '../image/logo/9.png'; // Asegúrate de que esta ruta sea correcta

function Contacto() {
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null); // Estado para la notificación

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get('name'),
      email: formData.get('email'),
      mensaje: formData.get('message'),
    };

    if (!data.nombre || !data.email || !data.mensaje) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    fetch('http://localhost:4000/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al enviar el mensaje');
        }
      })
      .then(data => {
        setNotification(data.message); // Establece el mensaje de notificación
        setTimeout(() => {
          setNotification(null); // Oculta la notificación
          window.location.href = '/'; // Redirige a la ruta raíz
        }, 2000); // Dura 2 segundos
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Error al enviar el mensaje.'); // Mensaje de error
        setTimeout(() => {
          setError(''); // Oculta el mensaje de error
        }, 2000); // Dura 2 segundos
      });
  };

  return (
    <div className="contact-container">
      <img src={logo} alt="Logo de Contacto" className="contacto-logo" />
      <h2>Comunícate con nosotros</h2>
      <p>Estás interesado en que te apoyemos con tu evento, comunícate con nosotros.</p>

      {error && (
        <div className="notification error">
          {error}
        </div>
      )}

      {notification && (
        <div className="notification success">
          {notification}
        </div>
      )}

      <form id="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Nombre</label>
        <input type="text" name="name" id="contact-name" placeholder="Nombre" required />

        <label htmlFor="contact-email">Correo electrónico</label>
        <input type="email" name="email" id="contact-email" placeholder="Correo electrónico*" required />

        <label htmlFor="contact-message">Mensaje</label>
        <textarea name="message" id="contact-message" placeholder="Mensaje" required></textarea>

        <br />
        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
}

export default Contacto;
