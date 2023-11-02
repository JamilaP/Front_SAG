import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import logonav from './imagenes/logo-nav.png';
import perfil from './imagenes/perfil.png';
import './App.css'; // Asegúrate de que el nombre del archivo CSS sea correcto
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Navbar, Nav, Container, Image  } from 'react-bootstrap'; // Importa los componentes de react-bootstrap que deseas usar
import Flota from './pantallas/Administrador/Flota'
import GestionDeUsuarios from './pantallas/Administrador/GestionDeUsuarios'
import Infraestructura from './pantallas/Administrador/Configuracion/Infraestructura'
import OperacionesDiarioas from './pantallas/Administrador/OperacionesDiarias/OperacionesDiarioas'
import Pedidos from './pantallas/Administrador/Pedidos/Pedidos'
import Reporte from './pantallas/Administrador/Reporte'
import Simulacion from './pantallas/Administrador/Simulación/Simulacion'
import { FileProvider } from './Componentes/FileContext';
function App() {

    return (
        <div className="App">

            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="#home" className="custom-navbar-text-log">
                        <div>
                            <Image src={logonav} roundedCircle width={30} height={30} className="mr-2" />
                            <span>SAG</span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Nav.Link as={Link} to="/administrador/operaciones-diarias" className="custom-navbar-link">Operaciones Diarias</Nav.Link>*/}
                            <Nav.Link as={Link} to="/administrador/simulacion" className="custom-navbar-link">Simulación</Nav.Link>
                            {/*<Nav.Link as={Link} to="/administrador/pedidos" className="custom-navbar-link">Pedidos</Nav.Link>*/}
                            {/*<Nav.Link as={Link} to="/administrador/flota" className="custom-navbar-link">Flota</Nav.Link>*/}
                            {/*<Nav.Link as={Link} to="/administrador/gestion-de-usuarios" className="custom-navbar-link">Gestión De Usuarios</Nav.Link>*/}
                            <Nav.Link as={Link} to="/administrador/infraestructura" className="custom-navbar-link">Configuración General</Nav.Link>
                            {/*<Nav.Link as={Link} to="/administrador/reportes" className="custom-navbar-link">Reporte</Nav.Link>*/}
                        </Nav>
                        <div className="d-flex align-items-center ms-auto">
                            <Image src={perfil} roundedCircle width={40} height={40} className="mr-2" />
                            <div>
                                <span className="custom-navbar-text">Joaquin Ruiz</span>
                                <span className="custom-subtext">Administrador</span>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <FileProvider>
                <Routes>
                    <Route path="/administrador/operaciones-diarias" element={<OperacionesDiarioas />} />
                    <Route path="/administrador/simulacion" element={<Simulacion />} />
                    <Route path="/administrador/flota" element={<Flota />} />
                    <Route path="/administrador/gestion-de-usuarios" element={<GestionDeUsuarios />} />
                    <Route path="/administrador/infraestructura" element={<Infraestructura />} />
                    <Route path="/administrador/reportes" element={<Reporte />} />
                    <Route path="/administrador/pedidos" element={<Pedidos />} />
                </Routes>
            </FileProvider>

        </div>
    );
}

export default App;
