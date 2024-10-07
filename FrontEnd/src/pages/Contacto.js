import React from 'react';
import '../styles/Contacto.css';
import logoBackground from '../image/logo/5.png';

function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Capturar los datos del formulario
    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get('name'), // Cambiado a 'nombre'
      email: formData.get('email'),
      mensaje: formData.get('message') // Cambiado a 'mensaje'
    };

    // Enviar los datos al backend
    fetch('http://localhost:4000/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          alert('Mensaje recibido y almacenado. Nos pondremos en contacto pronto.');
        } else {
          alert('Error al enviar el mensaje');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
      });
  };

  return (
    <div className="contact-container" style={{ backgroundImage: `url(${logoBackground})` }}>
      <h2>Comunícate con nosotros</h2>
      <p>Estás interesado en que te apoyemos con tu evento, comunícate con nosotros.</p>
      
      <form id="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" placeholder="Nombre" required />
        
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" placeholder="Correo electrónico*" required />
        
        <label htmlFor="message">Mensaje</label>
        <textarea name="message" id="message" placeholder="Mensaje" required></textarea>
        
        <br />
        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
}

export default Contacto;
