import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';

function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [teatros, setTeatros] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [activeSection, setActiveSection] = useState('usuarios');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [teatroEditando, setTeatroEditando] = useState(null);

  const apiUrl = 'http://localhost:4001';
  const backendUrl = 'http://localhost:4000';

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [usuariosResponse, eventosResponse, teatrosResponse, contactosResponse, reservasResponse] = await Promise.all([
        fetch(`${apiUrl}/Usuarios`),
        fetch(`${apiUrl}/Eventos`),
        fetch(`${apiUrl}/Teatros`),
        fetch(`${apiUrl}/Contactos`),
        fetch(`${apiUrl}/Reservas`),
      ]);

      if (!usuariosResponse.ok) throw new Error('Error al cargar usuarios');
      if (!eventosResponse.ok) throw new Error('Error al cargar eventos');
      if (!teatrosResponse.ok) throw new Error('Error al cargar teatros');
      if (!contactosResponse.ok) throw new Error('Error al cargar contactos');
      if (!reservasResponse.ok) throw new Error('Error al cargar reservas');

      setUsuarios(await usuariosResponse.json());
      setEventos(await eventosResponse.json());
      setTeatros(await teatrosResponse.json());
      setContactos(await contactosResponse.json());
      setReservas(await reservasResponse.json());
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarEvento = async (id) => {
    await fetch(`${apiUrl}/Eventos/${id}`, { method: 'DELETE' });
    cargarDatos();
  };

  const eliminarTeatro = async (id) => {
    await fetch(`${apiUrl}/Teatros/${id}`, { method: 'DELETE' });
    cargarDatos();
  };

  const agregarEvento = async (e) => {
    e.preventDefault();
    const newEvento = {
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
      fecha: e.target.fecha.value,
      hora: e.target.hora.value,
      imagen: e.target.imagen.value,
      disponible: true,
    };

    await fetch(`${apiUrl}/Eventos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvento),
    });
    cargarDatos();
    e.target.reset();
  };

  const agregarTeatro = async (e) => {
    e.preventDefault();
    const newTeatro = {
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
      capacidad: e.target.capacidad.value,
      telefono: e.target.telefono.value,
      direccion: e.target.direccion.value,
      imagen: e.target.imagen.value,
      mapa: e.target.mapa.value,
    };

    await fetch(`${apiUrl}/Teatros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeatro),
    });
    cargarDatos();
    e.target.reset();
  };

  const cambiarDisponibilidad = async (id, disponible) => {
    const confirm = window.confirm(`¿Estás seguro de que deseas cambiar la disponibilidad?`);
    if (confirm) {
      await fetch(`${apiUrl}/Eventos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disponible: !disponible }),
      });
      cargarDatos();
    }
  };

  const confirmarReserva = async (id) => {
    const confirm = window.confirm(`¿Estás seguro de que deseas confirmar la reserva ${id}?`);
    if (confirm) {
      try {
        const response = await fetch(`${backendUrl}/Reservas/${id}/confirmar`, { method: 'POST' });
        if (!response.ok) throw new Error('Error al confirmar la reserva');
        alert(`Reserva ${id} aceptada.`);
        cargarDatos();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const rechazarReserva = async (id) => {
    const confirm = window.confirm(`¿Estás seguro de que deseas rechazar la reserva ${id}?`);
    if (confirm) {
      try {
        const response = await fetch(`${backendUrl}/Reservas/${id}/rechazar`, { method: 'POST' });
        if (!response.ok) throw new Error('Error al rechazar la reserva');
        alert(`Reserva ${id} rechazada.`);
        cargarDatos();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const eliminarReserva = async (id) => {
    await fetch(`${apiUrl}/Reservas/${id}`, { method: 'DELETE' });
    cargarDatos();
  };

  const abrirModalEvento = (evento) => {
    setEventoEditando(evento);
    setModalVisible(true);
  };

  const abrirModalTeatro = (teatro) => {
    setTeatroEditando(teatro);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEventoEditando(null);
    setTeatroEditando(null);
  };

  const editarEvento = async (e) => {
    e.preventDefault();
    const updatedEvento = {
      nombre: e.target.nombre.value,
      descripcion: e.target.descripcion.value,
      fecha: e.target.fecha.value,
      hora: e.target.hora.value,
      imagen: e.target.imagen.value,
    };

    await fetch(`${apiUrl}/Eventos/${eventoEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvento),
    });
    cargarDatos();
    cerrarModal();
  };

  const editarTeatro = async (e) => {
    e.preventDefault();
    const updatedTeatro = {
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
      capacidad: e.target.capacidad.value,
      telefono: e.target.telefono.value,
      direccion: e.target.direccion.value,
      imagen: e.target.imagen.value,
      mapa: e.target.mapa.value,
    };

    await fetch(`${apiUrl}/Teatros/${teatroEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeatro),
    });
    cargarDatos();
    cerrarModal();
  };

  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <h2>Administración</h2>
        <ul>
          <li><a href="#" onClick={() => setActiveSection('usuarios')}>Usuarios</a></li>
          <li><a href="#" onClick={() => setActiveSection('agregarevento')}>Agregar Evento</a></li>
          <li><a href="#" onClick={() => setActiveSection('eventos')}>Eventos</a></li>
          <li><a href="#" onClick={() => setActiveSection('agregarteatros')}>Agregar Teatros</a></li>
          <li><a href="#" onClick={() => setActiveSection('teatros')}>Teatros</a></li>
          <li><a href="#" onClick={() => setActiveSection('contacto')}>Contactos</a></li>
          <li><a href="#" onClick={() => setActiveSection('reservas')}>Reservas</a></li>
        </ul>
      </nav>

      <div className="admin-content">
        <h1 className="admin-section-title">Panel de Administración</h1>

        {activeSection === 'usuarios' && (
          <section id="admin-usuarios">
            <h2 className="admin-section-title">Usuarios Registrados</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSection === 'eventos' && (
          <section id="admin-eventos">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Disponibilidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {eventos.map(evento => (
                  <tr key={evento.id}>
                    <td>{evento.nombre}</td>
                    <td>{evento.fecha}</td>
                    <td>{evento.disponible ? 'Disponible' : 'No disponible'}</td>
                    <td>
                      <button className="admin-button" onClick={() => cambiarDisponibilidad(evento.id, evento.disponible)}>
                        {evento.disponible ? 'Desactivar' : 'Activar'}
                      </button>
                      <button className="admin-button" onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
                      <button className="admin-button" onClick={() => abrirModalEvento(evento)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSection === 'agregarevento' && (
          <section id="admin-eventos">
            <h2 className="admin-section-title">Eventos</h2>
            <form className="admin-event-form" onSubmit={agregarEvento}>
              <input className="admin-input" type="text" name="nombre" placeholder="Nombre" required />
              <input className="admin-input" type="text" name="descripcion" placeholder="Descripción" required />
              <input className="admin-input" type="date" name="fecha" required />
              <input className="admin-input" type="time" name="hora" required />
              <input className="admin-input" type="url" name="imagen" placeholder="URL de la imagen" required />
              <button className="admin-button" type="submit">Agregar Evento</button>
            </form>
          </section>
        )}

        {activeSection === 'teatros' && (
          <section id="admin-teatros">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Capacidad</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teatros.map(teatro => (
                  <tr key={teatro.id}>
                    <td>{teatro.titulo}</td>
                    <td>{teatro.descripcion}</td>
                    <td>{teatro.capacidad}</td>
                    <td>{teatro.telefono}</td>
                    <td>
                      <button className="admin-button" onClick={() => eliminarTeatro(teatro.id)}>Eliminar</button>
                      <button className="admin-button" onClick={() => abrirModalTeatro(teatro)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSection === 'agregarteatros' && (
          <section id="admin-teatros">
                      <h2 className="admin-section-title">Teatros</h2>
                      <form className="admin-teatro-form" onSubmit={agregarTeatro}>
                        <input className="admin-input" type="text" name="titulo" placeholder="Título" required />
                        <input className="admin-input" type="text" name="descripcion" placeholder="Descripción" required />
                        <input className="admin-input" type="number" name="capacidad" placeholder="Capacidad" required />
                        <input className="admin-input" type="text" name="telefono" placeholder="Teléfono" required />
                        <input className="admin-input" type="url" name="direccion" placeholder="Dirección" required />
                        <input className="admin-input" type="url" name="imagen" placeholder="URL de la imagen" required />
                        <input className="admin-input" type="text" name="mapa" placeholder="Código de mapa" required />
                        <button className="admin-button" type="submit">Agregar Teatro</button>
                      </form>
                      </section>
        )}

        {activeSection === 'contacto' && (
          <section id="admin-contacto">
            <h2 className="admin-section-title">Mensajes de Contacto</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {contactos.map(mensaje => (
                  <tr key={mensaje.id}>
                    <td>{mensaje.nombre}</td>
                    <td>{mensaje.email}</td>
                    <td>{mensaje.mensaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeSection === 'reservas' && (
          <section id="admin-reservas">
            <h2 className="admin-section-title">Reservas</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Teatro</th>
                  <th>Tipo de Evento</th>
                  <th>Duración</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td>{reserva.nombre}</td>
                    <td>{reserva.email}</td>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.hora}</td>
                    <td>{reserva.teatro}</td>
                    <td>{reserva.tipoEvento}</td>
                    <td>{reserva.duracion}</td>
                    <td>
                      <button className="admin-button" onClick={() => confirmarReserva(reserva.id)}>Confirmar</button>
                      <button className="admin-button" onClick={() => rechazarReserva(reserva.id)}>Rechazar</button>
                      <button className="admin-button" onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={cerrarModal}>&times;</span>
              {eventoEditando ? (
                <form onSubmit={editarEvento}>
                  <h2>Editar Evento</h2>
                  <input className="admin-input" type="text" name="nombre" defaultValue={eventoEditando.nombre} required />
                  <input className="admin-input" type="text" name="descripcion" defaultValue={eventoEditando.descripcion} required />
                  <input className="admin-input" type="date" name="fecha" defaultValue={eventoEditando.fecha} required />
                  <input className="admin-input" type="time" name="hora" defaultValue={eventoEditando.hora} required />
                  <input className="admin-input" type="url" name="imagen" defaultValue={eventoEditando.imagen} required />
                  <button className="admin-button" type="submit">Guardar Cambios</button>
                </form>
              ) : (
                <form onSubmit={editarTeatro}>
                  <h2>Editar Teatro</h2>
                  <input className="admin-input" type="text" name="titulo" defaultValue={teatroEditando.titulo} required />
                  <input className="admin-input" type="text" name="descripcion" defaultValue={teatroEditando.descripcion} required />
                  <input className="admin-input" type="number" name="capacidad" defaultValue={teatroEditando.capacidad} required />
                  <input className="admin-input" type="text" name="telefono" defaultValue={teatroEditando.telefono} required />
                  <input className="admin-input" type="url" name="direccion" defaultValue={teatroEditando.direccion} required />
                  <input className="admin-input" type="url" name="imagen" defaultValue={teatroEditando.imagen} required />
                  <input className="admin-input" type="text" name="mapa" defaultValue={teatroEditando.mapa} required />
                  <button className="admin-button" type="submit">Guardar Cambios</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
