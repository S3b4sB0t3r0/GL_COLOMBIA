import React, { useState } from 'react';
import '../styles/Restablecer.css';
import logoBackground from '../image/logo/5.png';

function Restablecer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:4000/restablecer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('Se ha enviado un enlace para restablecer tu contraseña.');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al enviar el enlace. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Error al enviar el enlace. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restablecer-container" style={{ backgroundImage: `url(${logoBackground})` }}>
      <h1 className="restablecer-titulo">Restablecer contraseña</h1>
      <p className="restablecer-instrucciones">
        Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer la contraseña.
      </p>
      <form className="restablecer-formulario" onSubmit={handleSubmit}>
        <label className="restablecer-label" htmlFor="email">Correo electrónico</label>
        <input 
          type="email" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Dirección de correo electrónico" 
          className="restablecer-input"
          required
        />
        <button type="submit" className="restablecer-boton" disabled={loading}>
          {loading ? 'Enviando...' : 'ENVIAR ENLACE PARA RESTABLECER'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <p className="restablecer-opcion">
        ¿No necesitas restablecer tu contraseña? <a href="/login">Inicia sesión.</a>
      </p>
    </div>
  );
}

export default Restablecer;
