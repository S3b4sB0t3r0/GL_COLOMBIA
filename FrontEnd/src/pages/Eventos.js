import React, { useState, useEffect } from 'react';
import '../styles/Eventos.css';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await fetch('http://localhost:4001/Eventos');
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };

    cargarEventos();
  }, []);

  const abrirModal = (evento) => {
    setEventoSeleccionado(evento);
  };

  const cerrarModal = () => {
    setEventoSeleccionado(null);
  };

  const handleComprarBoleta = () => {
    if (eventoSeleccionado && eventoSeleccionado.disponible) {
      window.location.href = 'https://tuboleta.com/';
    }
  };

  return (
    <div className="eventos-container">
      <h2>Próximos Eventos</h2>
      <div className="eventos-grid">
        {Array.isArray(eventos) && eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id} className="evento-card" onClick={() => abrirModal(evento)}>
              <img src={evento.imagen} alt={evento.nombre} className="evento-imagen" />
              <h3>{evento.nombre}</h3>
              <p>{evento.fecha} {evento.hora}</p>
              <p>{evento.disponible ? 'Disponible' : 'No Disponible'}</p>
            </div>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </div>

      {eventoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={cerrarModal}>&times;</span>
            <div className="modal-inner">
              <img src={eventoSeleccionado.imagen} alt={eventoSeleccionado.nombre} className="modal-imagen" />
              <div className="modal-info">
                <h2>{eventoSeleccionado.nombre}</h2>
                <p>{eventoSeleccionado.descripcion}</p>
                <p><strong>Fecha:</strong> {eventoSeleccionado.fecha}</p>
                <p><strong>Hora:</strong> {eventoSeleccionado.hora}</p>
                <p><strong>Estado:</strong> {eventoSeleccionado.disponible ? 'Disponible' : 'No Disponible'}</p>
                {eventoSeleccionado.disponible && (
                  <button className="comprar-boleta-btn" onClick={handleComprarBoleta}>
                    Comprar Boleta
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Eventos;
