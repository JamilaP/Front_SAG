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
    const [dataSocketPedidos, setDataSocketPedidos] = useState([]);
    const [dataSocketBloqueos, setDataSocketBloqueos] = useState([]);
    const [indexData, setIndexData] = useState(0);
    const [indexDataPedidos, setIndexDataPedidos] = useState(0);
    const [renderizarMapa, setRenderizarMapa] = useState(false);
    const [listoParaSiguientePaquete, setListoParaSiguientePaquete] = useState(true);
    //const [renderizarSeccionPosterior, setRenderizarSeccionPosterior] = useState(true);

    //Conexion websocket
    let conexion = null;
    const [sClient, setSClient] = useState();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    //worker
    const [dataWorker, setDataWorker] = useState(null);

    const onConnectSocket = () => {
        conexion.subscribe('/topic/simulation-progress', (mensaje) => {
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
            conexion.deactivate();
        }
    };

    const conectarWS = () => {
        conexion = new Client();
        // const stompClient = new Client();
        // setSClient(conexion);
        //onWebSocketClose();
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
        // console.log(conexion);
    };

    const enviarMensaje = () => {
        // conectarWS();
        // console.log(conexion);
        if (conexion) {
            if(conexion.connected){
                conexion.publish({
                    destination: '/app/simulacion-semanal',
                    headers: {
                        'file-name': "ventas202303.txt"
                    }
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

    const moverEscena = () => {
        if( indexData < dataSocket.length){
            console.log("Esperando...");

            //setRenderizarSeccionPosterior(true);
            // Esperar 1000 milisegundos (1 segundo) antes de actualizar el estado
            setTimeout(() => {
                setIndexData(indexData + 1);
                console.log("Escena movida después de esperar", indexData);
            }, 208);


        }else console.log("Se alcanzo el limite");
    }
    const moverPedido = () => {
        if( indexDataPedidos < dataSocketPedidos.length){
            console.log("Esperando...");
            // Esperar 1000 milisegundos (1 segundo) antes de actualizar el estado
            setTimeout(() => {
                setIndexDataPedidos(indexDataPedidos + 1);
                console.log("Pedido movido después de esperar", indexDataPedidos);
            }, 1000);
        }else console.log("Se alcanzo el limite");
    }

    useEffect(() => {
        conectarWS();
        if (conexion) {
            console.log('Se ha conectado');
            console.log(conexion);
        } else {
            console.log('Fallo effect');
        }
    }, []);

    // useEffect(() => {
    //     if(dataSocket.length > 0 && indexData < dataSocket.length ){
    //         // setIndexData(indexData + 1);
    //         console.log('Renderizando', indexData);
    //     }
    //     // console.log('Cantidad: ', dataSocket.length);
    //   }, [indexData]);


    return (
        <div className="Simulacion">
            {/* {workerInstance.postMessage('Hola')} */}
            <h1> Escena {indexData}</h1>
            {
                dataSocket && dataSocket[indexData] && dataSocket[indexData].camiones ? (
                    <MapaSimu dataMapa = { dataSocket[indexData].camiones }
                    index = {indexData}
                    setIndex = {moverEscena}/>
                ):(
                    console.log('No hay datos para procesar')
                )
            }
                {/* <MapaSimu dataMapa = { dataSocket[0] }/> */}

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
                            onClick={() => { enviarMensaje(); handleButtonClickControles('Play')}}>
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
                        <Tab eventKey="pestana2" title="Camiones">
                            {dataSocket && dataSocket[indexData] && dataSocket[indexData].camiones ? (
                                <Camiones data={dataSocket[indexData].camiones}/>
                            ):(
                                console.log('No hay datos para procesar')
                                )
                            }

                        </Tab>
                        <Tab eventKey="pestana3" title="Pedidos">
                            {dataSocket && dataSocket[indexData] && dataSocket[indexData].pedidos ? (
                                console.log('Pedidos: ', dataSocket[indexData].pedidos),
                                    console.log('Index pedidos: ', indexData),
                                <PedidosSimulacion data={dataSocket[indexData].pedidos}/>
                            ):(
                                console.log('No hay datos para procesar en pedidos 1')
                            )}
                        </Tab>
                        <Tab eventKey="pestana5" title="Reporte Simulación"><ReporteSimulacion/></Tab>
                    </Tabs>
                </Container>

            </div>
    );
}

export default Simulacion;