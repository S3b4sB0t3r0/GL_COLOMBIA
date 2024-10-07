import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RestablecerContraseña.css';
import logoBackground from '../image/logo/5.png'; // Importa la imagen

function RestablecerContraseña() {
  const { token } = useParams();
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const response = await fetch(`http://localhost:4000/restablecer/${token}`);
        if (!response.ok) throw new Error('Token inválido o expirado');
        setMensaje('Token válido. Puedes establecer una nueva contraseña.');
      } catch (error) {
        setMensaje(error.message);
      }
    };

    verificarToken();
  }, [token]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (nuevaContraseña !== confirmarContraseña) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/restablecer/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevaContraseña }),
      });

      if (!response.ok) throw new Error('Error al restablecer la contraseña.');
      setMensaje('Contraseña restablecida con éxito.');
      
      // Redirigir a la página de login
      setTimeout(() => {
        navigate('/login');
      }, 1000); // Espera 1 segundo antes de redirigir
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="restablecer-contraseña-container" style={{ backgroundImage: `url(${logoBackground})` }}>
      <h1 className="restablecer-contraseña-titulo">Restablecer Contraseña</h1>
      <p className="restablecer-contraseña-mensaje">{mensaje}</p>
      <form className="restablecer-contraseña-formulario" onSubmit={manejarSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaContraseña}
          onChange={(e) => setNuevaContraseña(e.target.value)}
          required
          className="restablecer-contraseña-input"
        />
        <input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
          required
          className="restablecer-contraseña-input"
        />
        <button type="submit" className="restablecer-contraseña-boton">Restablecer Contraseña</button>
      </form>
    </div>
  );
}

export default RestablecerContraseña;
