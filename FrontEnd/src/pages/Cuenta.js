import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cuenta.css';

function Cuenta() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login'); // Redirige a login si no hay usuario almacenado
    }
  }, [navigate]);

  const handleReservacionesClick = () => {
    navigate('/reservas');
  };

  if (!user) {
    return <div className="cuenta-error">Cargando información del usuario...</div>;
  }

  return (
    <div className="cuenta-page" id="cuenta-page-sebastian">
      <aside className="cuenta-sidebar" id="cuenta-sidebar-sebastian">
        <ul className="cuenta-sidebar-list" id="cuenta-sidebar-list-sebastian">
          <li onClick={handleReservacionesClick}>Reservaciones</li>
          <li className="active">Cuenta</li>
        </ul>
      </aside>

      <main className="cuenta-main-content" id="cuenta-main-content-sebastian">
        <h1>Hola {user.nombre}</h1>
        <div className="cuenta-profile-view" id="cuenta-profile-view-sebastian">
          <p><strong>Correo electrónico:</strong> {user.correo}</p>
        </div>
      </main>
    </div>
  );
}

export default Cuenta;
