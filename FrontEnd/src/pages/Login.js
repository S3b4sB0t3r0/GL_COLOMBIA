import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logoBackground from '../image/Fondo/1.png';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: data.email,
          contraseña: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const token = result.token; // Guarda el token
        localStorage.setItem('token', token);
        
        // Guardar la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify({
          nombre: result.nombre,
          correo: data.email,
        }));

        setSuccessMessage('Inicio de sesión exitoso. Redirigiendo...'); // Mensaje de éxito
        setTimeout(() => {
          setSuccessMessage(''); // Oculta el mensaje de éxito
          // Redirigir según el correo del usuario
          if (data.email === 'Sebas@GLC.com') {
            navigate('/admin'); // Redirige a la página de administración
          } else {
            navigate('/'); // Redirige a la página principal
          }
        }, 4000); // Dura 7 segundos
      } else {
        setErrorMessage(result.message || 'Correo o contraseña incorrectos');
        setTimeout(() => {
          setErrorMessage(''); // Oculta el mensaje de error
        }, 4000); // Dura 7 segundos
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Hubo un error al conectar con el servidor');
      setTimeout(() => {
        setErrorMessage(''); // Oculta el mensaje de error
      }, 4000); // Dura 7 segundos
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${logoBackground})` }}>
      <header className="login-header">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta para continuar</p>
      </header>
      
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" placeholder="Correo electrónico*" required />
        
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" placeholder="Contraseña" required />
        
        <br />
        <button type="submit">INICIAR SESIÓN</button>
      </form>

      {errorMessage && (
        <div className="notification error" data-id="login.error">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="notification success" data-id="login.success">
          {successMessage}
        </div>
      )}
      <small>¿Olvidaste tu Contraseña? <a href="/restablecer">Ingresa Aquí</a></small>
    </div>
  );
}

export default Login;
