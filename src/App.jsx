import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import './App.css'; // Asegúrate de que el nombre del archivo CSS sea correcto
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Navbar, Nav, Container, Table, Button } from 'react-bootstrap'; // Importa los componentes de react-bootstrap que deseas usar

import Flota from './pantallas/Administrador/Flota'
import GestionDeUsuarios from './pantallas/Administrador/GestionDeUsuarios'
import Infraestructura from './pantallas/Administrador/Infraestructura'
import OperacionesDiarioas from './pantallas/Administrador/OperacionesDiarioas'
import Pedidos from './pantallas/Administrador/Pedidos'
import Reporte from './pantallas/Administrador/Reporte'
import Simulacion from './pantallas/Administrador/Simulación/Simulacion'

function App() {

    return (
        <div className="App">
            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="#home"  className="custom-navbar-text">SAG</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/administrador/operaciones-diarias" className="custom-navbar-link">Operaciones Diarias</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/simulacion" className="custom-navbar-link">Simulación</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/pedidos" className="custom-navbar-link">Pedidos</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/flota" className="custom-navbar-link">Flota</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/gestion-de-usuarios" className="custom-navbar-link">Gestión De Usuarios</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/infraestructura" className="custom-navbar-link">Infraestructura</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/reportes" className="custom-navbar-link">Reporte</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                        <Route path="/administrador/operaciones-diarias" element={<OperacionesDiarioas />} />
                        <Route path="/administrador/simulacion" element={<Simulacion />} />
                        <Route path="/administrador/flota" element={<Flota />} />
                        <Route path="/administrador/gestion-de-usuarios" element={<GestionDeUsuarios />} />
                        <Route path="/administrador/infraestructura" element={<Infraestructura />} />
                        <Route path="/administrador/reportes" element={<Reporte />} />
                        <Route path="/administrador/pedidos" element={<Pedidos />} />
            </Routes>
        </div>
    );
}

export default App;
