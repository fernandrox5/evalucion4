import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Table, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Importamos el archivo CSS personalizado

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuarioId, setNuevoUsuarioId] = useState('');
  const [nuevoUsuarioNombre, setNuevoUsuarioNombre] = useState('');
  const [nuevoUsuarioCorreo, setNuevoUsuarioCorreo] = useState('');
  const [nuevoUsuarioEdad, setNuevoUsuarioEdad] = useState('');
  const [correoPersonal, setCorreoPersonal] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  const handleNuevoUsuario = (e) => {
    setNuevoUsuarioId(e.target.value);
  };

  const handleNuevoNombre = (e) => {
    setNuevoUsuarioNombre(e.target.value);
  };

  const handleNuevoCorreo = (e) => {
    setNuevoUsuarioCorreo(e.target.value);
  };

  const handleNuevoEdad = (e) => {
    setNuevoUsuarioEdad(e.target.value);
  };

  const handleCorreoPersonal = (e) => {
    setCorreoPersonal(e.target.checked);
  };

  const handleAgregarUsuario = () => {
    const nuevoUsuario = {
      id: nuevoUsuarioId,
      nombre: nuevoUsuarioNombre,
      correo: nuevoUsuarioCorreo,
      edad: nuevoUsuarioEdad,
      correoPersonal: correoPersonal
    };
    setUsuarios(prev => {
      const nuevoArreglo = [...prev, nuevoUsuario];
      localStorage.setItem("usuarios", JSON.stringify(nuevoArreglo));
      return nuevoArreglo;
    });
    setNuevoUsuarioId('');
    setNuevoUsuarioNombre('');
    setNuevoUsuarioCorreo('');
    setNuevoUsuarioEdad('');
    setCorreoPersonal(false);
  };

  const handleEliminarUsuario = (idUsuario) => {
    setUsuarios(prev => {
      const resultadosEliminados = prev.filter(objeto => objeto.id !== idUsuario);
      localStorage.setItem("usuarios", JSON.stringify(resultadosEliminados));
      return resultadosEliminados;
    });
  };

  const handleEditarUsuario = (usuario) => {
    setEditandoUsuario(usuario);
    setNuevoUsuarioId(usuario.id);
    setNuevoUsuarioNombre(usuario.nombre);
    setNuevoUsuarioCorreo(usuario.correo);
    setNuevoUsuarioEdad(usuario.edad);
    setCorreoPersonal(usuario.correoPersonal);
  };

  const handleGuardarEdicion = () => {
    setUsuarios(prev => {
      const usuariosActualizados = prev.map(u =>
        u.id === editandoUsuario.id
          ? { ...u, id: nuevoUsuarioId, nombre: nuevoUsuarioNombre, correo: nuevoUsuarioCorreo, edad: nuevoUsuarioEdad, correoPersonal: correoPersonal }
          : u
      );
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
      return usuariosActualizados;
    });
    setEditandoUsuario(null);
    setNuevoUsuarioId('');
    setNuevoUsuarioNombre('');
    setNuevoUsuarioCorreo('');
    setNuevoUsuarioEdad('');
    setCorreoPersonal(false);
  };

  const handleCancelarEdicion = () => {
    setEditandoUsuario(null);
    setNuevoUsuarioId('');
    setNuevoUsuarioNombre('');
    setNuevoUsuarioCorreo('');
    setNuevoUsuarioEdad('');
    setCorreoPersonal(false);
  };

  useEffect(() => {
    const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setUsuarios(usuariosAlmacenados);
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center app-container">
      <Form onSubmit={(e) => e.preventDefault()} className="w-50 text-center">
        <FormGroup>
          <Label for="id_usuario">ID</Label>
          <Input
            type="number"
            value={nuevoUsuarioId}
            onChange={handleNuevoUsuario}
            name="id_usuario"
            id="id_usuario"
          />
        </FormGroup>
        <FormGroup>
          <Label for="nombre_usuario">Nombre</Label>
          <Input
            type="text"
            value={nuevoUsuarioNombre}
            onChange={handleNuevoNombre}
            name="nombre_usuario"
            id="nombre_usuario"
            placeholder="Ingrese un nombre"
          />
        </FormGroup>
        <FormGroup>
          <Label for="correo_usuario">Correo</Label>
          <Input
            type="email"
            value={nuevoUsuarioCorreo}
            onChange={handleNuevoCorreo}
            name="correo_usuario"
            id="correo_usuario"
            placeholder="Ingrese un correo"
          />
        </FormGroup>
        <FormGroup>
          <Label for="edad_usuario">Edad</Label>
          <Input
            type="number"
            value={nuevoUsuarioEdad}
            onChange={handleNuevoEdad}
            name="edad_usuario"
            id="edad_usuario"
            placeholder="Ingrese una edad"
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={correoPersonal}
              onChange={handleCorreoPersonal}
            />
            ¿Correo personal?
          </Label>
        </FormGroup>
        <br />
        {editandoUsuario ? (
          <>
            <Button color="primary" onClick={handleGuardarEdicion} style={{ marginRight: '10px' }}>Guardar Cambios</Button>
            <Button color="secondary" onClick={handleCancelarEdicion}>Cancelar</Button>
          </>
        ) : (
          <Button color="primary" onClick={handleAgregarUsuario}>Añadir usuario</Button>
        )}
      </Form>
      <hr className="w-50" />
      <h3>Lista de usuarios</h3>
      <Table className="text-center w-75 user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Edad</th>
            <th>Correo Personal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usu) => (
            <tr key={usu.id}>
              <td>{usu.id}</td>
              <td>{usu.nombre}</td>
              <td>{usu.correo}</td>
              <td>{usu.edad}</td>
              <td>{usu.correoPersonal ? 'Sí' : 'No'}</td>
              <td>
                <Button onClick={() => handleEditarUsuario(usu)} style={{ marginRight: '10px' }}>Editar</Button>
                <Button onClick={() => handleEliminarUsuario(usu.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
