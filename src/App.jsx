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
import Simulacion from './pantallas/Administrador/Simulacion/Simulacion'
import {FileProvider} from './Componentes/FileContext';
import {Client} from '@stomp/stompjs';
import ModalColapso from "./Componentes/ModalColapso";

function App() {

    let conexion = null;
    const horaActual = new Date();
    const formatoHoraActual = `${horaActual.getFullYear()}-${(horaActual.getMonth() + 1).toString().padStart(2, '0')}-${horaActual.getDate().toString().padStart(2, '0')}`;

    // const [conexion, setConexion] = useState(null);
    const [dataSocket, setDataSocket] = useState([]);
    const [duracionEscena, setDuracionEscena] = useState(60000);
    const [indexData, setIndexData] = useState(0);
    const [pausar, setPausar] = useState(false);
    const [dataAnt, setDataAnt] = useState([]);

    const [modal, setModal] = useState({text: "", exito: true, open: false});

    const [activeLink, setActiveLink] = useState("operaciones");
    const [seEnvioMensaje, setSeEnvioMensaje] = useState(false);

    const moverEscena = (pausarArg) => {
        if (!pausarArg) {
            if (indexData < dataSocket.length) {
                setDataAnt(dataSocket[0]);
                setDataSocket((prevArreglo) => prevArreglo.slice(1));

                /*setTimeout(() => {
                    setDataSocket((prevArreglo) => prevArreglo.slice(1));
                    console.log("Escena removida después de esperar", indexData);
                }, duracionEscena);*/
                /*if(indexData === 0 ){
                    console.log("Esperando inicialmente al back...");
                    setTimeout(() => {
                        console.log("Escena movida después de esperar", indexData);
                    }, 10000);
                }
                setTimeout(() => {
                    setIndexData(indexData + 1);
                    console.log("Escena movida después de esperar", indexData);
                }, duracionEscena);*/
                //setRenderizarSeccionPosterior(true);
                // Esperar 1000 milisegundos (1 segundo) antes de actualizar el estado
            } else {
                console.log("Se alcanzo el limite");
            }
        }
    }

    const handleLinkClick = (id) => {
        setActiveLink(id);
        localStorage.setItem('activeTab', id);
        if(!seEnvioMensaje){
            enviarMensaje();
            setSeEnvioMensaje(true);
        }
    };

    const onConnectSocket = () => {
        conexion.subscribe('/topic/daily-progress', (mensaje) => {
            console.log('Data conseguida');
            const data = JSON.parse(mensaje.body);
            // Renderizacion
            setDataSocket(prevDataSocket => [...prevDataSocket, data]);
        });
        conexion.onStompError = (frame) => {
            console.log('Stomp Error : ', frame);
        };
    };

    const onWebSocketClose = () => {
        console.log('WebSocket connection close');
        if (conexion !== null) {
            conexion.activate();
        }
    };

    const conectarWS = () => {
        let conexion = null;
        conexion = new Client();
        console.log('Connecting to WebSocket...');
        try {
            conexion.configure({
                webSocketFactory: () => new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint')
            });
            console.log('Conectado');
        } catch (error) {
            console.log('No se pudo conectar', error);
        }

        conexion.onConnect = onConnectSocket;
        conexion.onWebSocketClose = onWebSocketClose;
        conexion.activate();
        return conexion;
    };

    const enviarMensaje = () => {
        // conectarWS();
        if (conexion && formatoHoraActual) {
            console.log('CUMPLE CON TODO');
            if (conexion.connected) {
                try {
                    conexion.publish({
                        destination: '/app/daily-operations',
                        headers: {
                            'start_date': formatoHoraActual,
                        },
                        body: 'hola'
                    });                    
                } catch (error) {
                    console.log('No se envio el mensaje')
                }
                
            }
            console.log('Mensaje enviado');
        } else {
            console.log("No se pudo enviar el mensaje");
            if (!formatoHoraActual) setModal(e => ({...e, text: "Debe ingresar una fecha ", exito: false, open: true}));
            if (!conexion) setModal(e => ({
                ...e,
                text: "Recuerde seleccionar el tipo de visualización",
                exito: false,
                open: true
            }));
        }
    };

//    conexion = conectarWS(); //Conexion websocket

    useEffect(() => {
        console.log('Conexion: ', conexion);
        console.log('Fecha actual app: ', formatoHoraActual);
        enviarMensaje();
    }, []);

    useEffect(() => {
        const storedTab = localStorage.getItem('activeTab');
        if (storedTab) {
            setActiveLink(storedTab);
        }
    }, []);

    return (
        <div className="App">
            {/*<button onClick={enviarMensaje}>Probar</button>*/}

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
                        <Route path="/administrador/operaciones-diarias" 
                        element={<OperacionesDiarioas 
                        conexion={conexion} 
                        dataSocket={dataSocket}
                        indexData={indexData}
                        moverEscena={moverEscena}
                        duracionEscena={duracionEscena}
                        pausar={pausar}
                        dataAnt={dataAnt}/>}/>
                        <Route path="/administrador/simulacion" element={<Simulacion/>}/>
                        <Route path="/administrador/configuracion" element={<ConfiguracionGeneral/>}/>
                        <Route path="/administrador/pedidos" element={<Pedidos conexion={conexion} enviarMensaje={enviarMensaje}/> }/>
                    </Routes>
                </FileProvider>
            </div>

        </div>
    );
}

export default App;
