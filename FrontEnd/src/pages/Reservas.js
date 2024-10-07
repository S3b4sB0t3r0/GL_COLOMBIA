import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Reservas.css';

function Reservas() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [teatro, setTeatro] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [otroEvento, setOtroEvento] = useState('');
  const [duracion, setDuracion] = useState('');
  const [imagenUrl, setImagenUrl] = useState(''); // Nuevo estado para la URL de la imagen
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const fechaSeleccionada = new Date(`${fecha}T${hora}`);
    if (fechaSeleccionada < now) {
      alert("La fecha y hora deben ser futuras.");
      return;
    }

    const reserva = {
      nombre,
      email,
      fecha,
      hora,
      teatro,
      tipoEvento: tipoEvento === "Otro" ? otroEvento : tipoEvento,
      duracion,
      imagenUrl, // Añadir la URL de la imagen al objeto de reserva
    };

    console.log('Reserva enviada:', reserva);

    try {
      const response = await fetch('http://localhost:4000/reservas', { // Asegúrate que el puerto sea correcto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la reserva');
      }

      const data = await response.json();
      console.log('Reserva guardada:', data);
      alert('Reserva realizada con éxito!');
      navigate('/'); // Redirigir a otra página si lo deseas
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('Hubo un error al realizar la reserva. Intenta nuevamente.');
    }
  };

  return (
    <div className="reservas-page" id="reservas-page">
      <aside className="reservas-sidebar" id="reservas-sidebar">
        <ul className="reservas-sidebar-list" id="reservas-sidebar-list">
          <li className="reservas-menu-item" id="reservaciones-link" onClick={() => navigate('/reservas')}>
            Reservaciones
          </li>
          <li className="reservas-menu-item" id="cuenta-link" onClick={() => navigate('/cuenta')}>
            Cuenta
          </li>
        </ul>
      </aside>

      <main className="reservas-main-content" id="reservas-main-content">
        <h1 className="reservas-title" id="reservas-title">Reservar Teatro</h1>
        <div className="reservas-form-container" id="reservas-form-container">
          <form className="reservas-form" id="reservas-form" onSubmit={handleSubmit}>
            <label htmlFor="nombre" className="reservas-label">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              className="reservas-input" 
              required 
            />
            
            <label htmlFor="email" className="reservas-label">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="reservas-input" 
              required 
            />

            <label htmlFor="fecha" className="reservas-label">Fecha</label>
            <input 
              type="date" 
              id="fecha" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              className="reservas-input" 
              required 
            />

            <label htmlFor="hora" className="reservas-label">Hora</label>
            <input 
              type="time" 
              id="hora" 
              value={hora} 
              onChange={(e) => setHora(e.target.value)} 
              className="reservas-input" 
              required 
            />

            <label htmlFor="teatro" className="reservas-label">Teatro</label>
            <select 
              id="teatro" 
              value={teatro} 
              onChange={(e) => setTeatro(e.target.value)} 
              className="reservas-input" 
              required
            >
              <option value="">Selecciona un teatro</option>
              <option value="Teatro Libre">Teatro Libre</option>
              <option value="Teatro Colon">Teatro Colon</option>
              <option value="Teatro Delia">Teatro Delia</option>
              <option value="Teatro Nacional">Teatro Nacional</option>
              <option value="Teatro Lozano">Teatro Lozano</option>
            </select>

            <label htmlFor="tipoEvento" className="reservas-label">Tipo de Evento</label>
            <select 
              id="tipoEvento" 
              value={tipoEvento} 
              onChange={(e) => setTipoEvento(e.target.value)} 
              className="reservas-input" 
              required
            >
              <option value="">Selecciona el tipo de evento</option>
              <option value="Obra de teatro">Obra de teatro</option>
              <option value="Obra Musical">Obra Musical</option>
              <option value="Otro">Otro</option>
            </select>

            {tipoEvento === 'Otro' && (
              <div>
                <label htmlFor="otroEvento" className="reservas-label">Especifica el Tipo de Evento</label>
                <input 
                  type="text" 
                  id="otroEvento" 
                  value={otroEvento} 
                  onChange={(e) => setOtroEvento(e.target.value)} 
                  className="reservas-input" 
                  required 
                />
              </div>
            )}

            <label htmlFor="duracion" className="reservas-label">Duración del Evento (Horas)</label>
            <input 
              type="number" 
              id="duracion" 
              value={duracion} 
              onChange={(e) => setDuracion(e.target.value)} 
              className="reservas-input" 
              required 
              min="1"
              max="12"
            />

            <label htmlFor="imagenUrl" className="reservas-label">URL de la Imagen</label>
            <input 
              type="url" 
              id="imagenUrl" 
              value={imagenUrl} 
              onChange={(e) => setImagenUrl(e.target.value)} 
              className="reservas-input" 
              required 
            />

            <button type="submit" className="reservas-submit-btn" id="reservas-submit-btn">Reservar</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Reservas;
