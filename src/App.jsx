import {Routes, Route, Link,Navigate} from 'react-router-dom';
import React, {useEffect,useState} from 'react';
import logonav from './imagenes/logo-nav.png';
import perfil from './imagenes/perfil.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Image} from 'react-bootstrap';
import ConfiguracionGeneral from './pantallas/Administrador/Configuracion/ConfiguracionGeneral'
import OperacionesDiarioas from './pantallas/Administrador/OperacionesDiarias/OperacionesDiarioas'
import Pedidos from './pantallas/Administrador/Pedidos/Pedidos'
import Simulacion from './pantallas/Administrador/Simulación/Simulacion'
import {FileProvider} from './Componentes/FileContext';

function App() {
    const [activeLink, setActiveLink] = useState("operaciones");

    const handleLinkClick = (id) => {
        setActiveLink(id);
        localStorage.setItem('activeTab', id);
    };

    useEffect(() => {
        const storedTab = localStorage.getItem('activeTab');
        if (storedTab) {
            setActiveLink(storedTab);
        }
    }, []);

    return (
        <div className="App">

            <Navbar expand="lg" className="barra-navegacion">

                <Navbar.Brand href="#home" className="logotipo">
                        <Image src={logonav} className="imagen-logo"/>
                        <span className="texto-logo">SAG</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="menu-desplegable"/>

                <Navbar.Collapse id="basic-navbar-nav" className="pestanas-navegacion">
                    <Nav className="contenedor-pestanas">
                        <Nav.Link as={Link} to="/administrador/operaciones-diarias"
                                  className={`pestana-link ${activeLink === 'operaciones' ? 'selected' : ''}`}
                                  onClick={() => handleLinkClick('operaciones')}
                        >Operaciones Diarias</Nav.Link>
                        <Nav.Link as={Link} to="/administrador/simulacion"
                                  className={`pestana-link ${activeLink === 'simulacion' ? 'selected' : ''}`}
                                  onClick={() => handleLinkClick('simulacion')}
                        >Simulación</Nav.Link>
                        <Nav.Link as={Link} to="/administrador/pedidos"
                                  className={`pestana-link ${activeLink === 'pedidos' ? 'selected' : ''}`}
                                  onClick={() => handleLinkClick('pedidos')}
                        >Pedidos</Nav.Link>
                        <Nav.Link as={Link} to="/administrador/configuracion"
                                  className={`pestana-link ${activeLink === 'configuracion' ? 'selected' : ''}`}
                                  onClick={() => handleLinkClick('configuracion')}
                        >Configuración General</Nav.Link>
                    </Nav>

                    <div className="contenedor-perfil" >
                        <Image src={perfil} className="imagen-perfil"/>
                        <div className="texto-persona">
                            <span className="nombre">Marcelo Ruiz</span>
                            <span className="rol">Administrador</span>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Navbar>

            <div className="contenido-pantallas">
                <FileProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="/administrador/operaciones-diarias" />} />
                        <Route path="/administrador/operaciones-diarias" element={<OperacionesDiarioas/>}/>
                        <Route path="/administrador/simulacion" element={<Simulacion/>}/>
                        <Route path="/administrador/configuracion" element={<ConfiguracionGeneral/>}/>
                        <Route path="/administrador/pedidos" element={<Pedidos/>}/>
                    </Routes>
                </FileProvider>
            </div>

        </div>
    );
}

export default App;
