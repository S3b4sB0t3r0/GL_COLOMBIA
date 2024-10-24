import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Registro.css';
import logoBackground from '../image/Fondo/1.png';

function Registro() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data["confirm-password"]) {
      setMessage('Las contraseñas no coinciden');
      setMessageType('warning');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000); // 5 segundos
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/Usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.name,
          correo: data.email,
          contraseña: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setMessageType('success');
        setTimeout(() => {
          navigate('/login');
        }, 5000); // Redirige después de 5 segundos
      } else {
        setMessage(result.message || 'Hubo un error en el registro');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Hubo un error al conectar con el servidor');
      setMessageType('error');
    }

    // Limpia el mensaje después de 5 segundos
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="registro-container" style={{ backgroundImage: `url(${logoBackground})` }}>
      <header className="registro-header">
        <h2>Regístrate</h2>
        <p>Crea una cuenta para acceder a nuestros servicios</p>
      </header>

      <form id="registro-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" placeholder="Nombre completo" required />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" placeholder="Correo electrónico*" required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" placeholder="Contraseña" required />

        <label htmlFor="confirm-password">Confirma tu contraseña</label>
        <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirma tu contraseña" required />

        <br />
        <button type="submit">REGISTRARME</button>
      </form>

      {message && (
        <div className={`notification ${messageType}`} data-id={`registro.${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Registro;
