import React, {useState, useEffect} from 'react';
import {Container, Image, Tab, Tabs, Button, ButtonGroup} from 'react-bootstrap';
import "./Simulacion.css"
import PedidosSimulacion from "./PedidosSimulacion";
import Leyenda from "./Leyenda";
import Camiones from "./Camiones";
import CargaDeDatos from "./CargaDeDatos";
import ReporteSimulacion from "./ReporteSimulacion";
import {FaPlay, FaStop} from 'react-icons/fa';
import MapaSimu from './MapaSimu';
import { Client } from '@stomp/stompjs';

function Simulacion() {
    const [dataSocket, setDataSocket] = useState([]);

    //Conexion websocket
    let conexion = null;
    const [sClient, setSClient] = useState();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const onConnectSocket = () => {
        conexion.subscribe('/topic/simulation-progress', (mensaje) => {
            const data = JSON.parse(mensaje.body);
            setDataSocket(data);
            //console.log('Mensaje recibido:',dataSocket);
            // mostrarMensaje(mensaje.body);
            // Llamar a onSimulacionData con los datos recibidos
            // if (onSimulacionData) {
            //     onSimulacionData(mensaje.body);
            // }
        });
        conexion.onStompError = (frame) => {
            console.log('Stomp Error : ', frame);
        };
    };

    const onWebSocketClose = () => {
        console.log('WebSocket connection close');
        if (conexion !== null) {
            conexion.deactivate();
        }
    };

    const conectarWS = () => {
        conexion = new Client();
        // const stompClient = new Client();
        // setSClient(conexion);
        //onWebSocketClose();
        console.log('Connecting to WebSocket...');
        conexion.configure({
            webSocketFactory: () => new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint')
        });
        conexion.onConnect = onConnectSocket;
        conexion.onWebSocketClose = onWebSocketClose;
        conexion.activate();
        // console.log(sClient);
    };

    const enviarMensaje = () => {
        console.log(conexion);
        if (conexion) {
            if(conexion.connected){
                conexion.publish({
                    destination: '/app/simulacion-semanal',
                    body: JSON.stringify({
                        nombre: inputMessage,
                        contenido: inputMessage
                    })
                });
            }            
            console.log('Mensaje enviado');
        } else {
            console.log("No se pudo enviar el mensaje");
        }
    };

    const [key, setKey] = useState('pestana1');

    // Botones de colapso/semanal
    const [activeButtonColapsoSemanal, setActiveButtonColapsoSemanal] = useState(null);
    const handleButtonClickColapsoSemanal = (buttonName) => {
        setActiveButtonColapsoSemanal(buttonName);
    };

    // Botones de controles
    const [activeButtonControles, setActiveButtonControles] = useState(null);
    const handleButtonClickControles = (buttonName) => {
        setActiveButtonControles(buttonName);
    };

    useEffect(() => {
        conectarWS();
        if(conexion.connected) console.log('Conectado');
    }, []);


    return (
        <div className="Simulacion">
                <MapaSimu dataMapa = {dataSocket}/>

                {/* Botones de colapso/semanal */}
                <div className="control-buttons">
                    Tipo de visualización:
                    <ButtonGroup aria-label="Semana/Colapso" className="botones">
                        <Button
                            className={`custom-button ${activeButtonColapsoSemanal === 'Semana' ? 'active' : ''}`}
                            onClick={() => handleButtonClickColapsoSemanal('Semana')}
                        >
                            Semana
                        </Button>
                        <Button
                            className={`custom-button ${activeButtonColapsoSemanal === 'Colapso' ? 'active' : ''}`}
                            onClick={() => handleButtonClickColapsoSemanal('Colapso')}
                        >
                            Colapso
                        </Button>
                    </ButtonGroup>

                    {/* Botones de control */}
                    <ButtonGroup aria-label="Barra de control" className="controles">
                        <Button
                            className={`custom-button success ${activeButtonControles === 'Play' ? 'active' : ''}`}
                            onClick={() => { enviarMensaje();handleButtonClickControles('Play')}}>
                            <FaPlay className="controles play"/>
                        </Button>
                        <Button
                            className={`custom-button danger ${activeButtonControles === 'Stop' ? 'active' : ''}`}
                            onClick={() => handleButtonClickControles('Stop')}>
                            <FaStop className="controles stop"/>
                        </Button>
                        <Button
                            className={`custom-button warning ${activeButtonControles === '1.5x' ? 'active' : ''}`}
                            onClick={() => handleButtonClickControles('1.5x')}>
                            1.5x
                        </Button>
                    </ButtonGroup>
                </div>


                <Container className="table-responsive">
                    <Tabs id="miPestanas" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="pestana1" title="Leyenda"><Leyenda/></Tab>
                        <Tab eventKey="pestana4" title="Cargar pedidos"><CargaDeDatos/></Tab>
                        <Tab eventKey="pestana2" title="Camiones"><Camiones data={dataSocket}/></Tab>
                        <Tab eventKey="pestana3" title="Pedidos"><PedidosSimulacion data={dataSocket}/></Tab>
                        <Tab eventKey="pestana5" title="Reporte Simulación"><ReporteSimulacion/></Tab>
                    </Tabs>
                </Container>
            </div>
    );
}

export default Simulacion;