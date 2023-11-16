import {Routes, Route, Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import logonav from './imagenes/logo-nav.png';
import perfil from './imagenes/perfil.png';
import './App.css'; // Asegúrate de que el nombre del archivo CSS sea correcto
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import {Navbar, Nav, Container, Image} from 'react-bootstrap'; // Importa los componentes de react-bootstrap que deseas usar
import Flota from './pantallas/Administrador/Flota'
import GestionDeUsuarios from './pantallas/Administrador/GestionDeUsuarios'
import ConfiguracionGeneral from './pantallas/Administrador/Configuracion/ConfiguracionGeneral'
import OperacionesDiarioas from './pantallas/Administrador/OperacionesDiarias/OperacionesDiarioas'
import Pedidos from './pantallas/Administrador/Pedidos/Pedidos'
import Reporte from './pantallas/Administrador/Reporte'
import Simulacion from './pantallas/Administrador/Simulación/Simulacion'
import {FileProvider} from './Componentes/FileContext';

function App() {
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (id) => {
        setActiveLink(id);
    };

    return (
        <div className="App">

            <Navbar expand="lg" className="custom-navbar">

                    <Navbar.Brand href="#home" className="custom-navbar-text-log">
                        <div className="contenedor-logo">
                            <Image src={logonav} roundedCircle width={30} height={30} className="mr-2"/>
                            <span>SAG</span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/administrador/operaciones-diarias"
                                      className={`custom-navbar-link ${activeLink === 'operaciones' ? 'selected' : ''}`}
                                      onClick={() => handleLinkClick('operaciones')}
                            >Operaciones Diarias</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/simulacion"
                                      className={`custom-navbar-link ${activeLink === 'simulacion' ? 'selected' : ''}`}
                                      onClick={() => handleLinkClick('simulacion')}
                            >Simulación</Nav.Link>
                            <Nav.Link as={Link} to="/administrador/pedidos"
                                      className={`custom-navbar-link ${activeLink === 'pedidos' ? 'selected' : ''}`}
                                      onClick={() => handleLinkClick('pedidos')}
                            >Pedidos</Nav.Link>
                            {/*<Nav.Link as={Link} to="/administrador/flota" className="custom-navbar-link">Flota</Nav.Link>*/}
                            {/*<Nav.Link as={Link} to="/administrador/gestion-de-usuarios" className="custom-navbar-link">Gestión De Usuarios</Nav.Link>*/}
                            <Nav.Link as={Link} to="/administrador/infraestructura"
                                      className={`custom-navbar-link ${activeLink === 'configuracion' ? 'selected' : ''}`}
                                      onClick={() => handleLinkClick('configuracion')}
                            >Configuración General</Nav.Link>
                            {/*<Nav.Link as={Link} to="/administrador/reportes" className="custom-navbar-link">Reporte</Nav.Link>*/}
                        </Nav>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto',marginRight: '25px' }}>
                            <Image src={perfil} roundedCircle width={40} height={40} className="mr-2"/>
                            <div className="perfil-persona">
                                <span className="custom-navbar-text">Joaquin Ruiz</span>
                                <span className="custom-subtext">Administrador</span>
                            </div>
                        </div>
                    </Navbar.Collapse>

            </Navbar>

            <FileProvider>
                <Routes>
                    <Route path="/administrador/operaciones-diarias" element={<OperacionesDiarioas/>}/>
                    <Route path="/administrador/simulacion" element={<Simulacion/>}/>
                    <Route path="/administrador/flota" element={<Flota/>}/>
                    <Route path="/administrador/gestion-de-usuarios" element={<GestionDeUsuarios/>}/>
                    <Route path="/administrador/infraestructura" element={<ConfiguracionGeneral/>}/>
                    <Route path="/administrador/reportes" element={<Reporte/>}/>
                    <Route path="/administrador/pedidos" element={<Pedidos/>}/>
                </Routes>
            </FileProvider>

        </div>
    );
}

export default App;
