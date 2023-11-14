import React, {useState, useEffect} from 'react';
import {Container, Image, Tab, Tabs, Button, ButtonGroup} from 'react-bootstrap';
import "./Simulacion.css"
import PedidosSimulacion from "./PedidosSimulacion";
import Leyenda from "./Leyenda";
import Camiones from "./Camiones";
import CargaDeDatos from "./CargaDeDatos";
import ReporteSimulacion from "./ReporteSimulacion";
import {FaPlay, FaPause} from 'react-icons/fa';
import {HiRefresh} from 'react-icons/hi';
import {FiRefreshCcw} from 'react-icons/fi';
import MapaSimu from './MapaSimu';
import { Client } from '@stomp/stompjs';
import ModalResultado from '../../../Componentes/ModalResultado';

function Simulacion() {
    const [key, setKey] = useState('pestana1');
    const [dataSocket, setDataSocket] = useState([]);
    const [indexData, setIndexData] = useState(0);
    const [filePedidos, setFilePedidos] = useState(null);
    const [modal, setModal] = useState({ text: "", exito: true, open: false });
    const [duracionEscena, setDuracionEscena] = useState(250);
    const [pausar, setPausar] = useState(false);
    const [activeButtonControles, setActiveButtonControles] = useState(null);
    const [activeButtonColapsoSemanal, setActiveButtonColapsoSemanal] = useState(null);

    //Conexion websocket
    let conexion = null;
    const [startDate, setStartDate] = useState("2023-03-13"); // Valor inicial

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
         console.log("parametros",startDate,filePedidos,activeButtonColapsoSemanal);
        if (conexion && startDate && activeButtonColapsoSemanal) {
            console.log('CUMPLE CON TODO');
            if(conexion.connected ){
                conexion.publish({
                    destination: '/app/weekly-simulation',
                    headers: {
                        'start_date': startDate,
                    }
                });
            }
            console.log('Mensaje enviado');
        } else {
            console.log("No se pudo enviar el mensaje");
            if(!startDate) setModal(e => ({ ...e, text: "Debe ingresar una fecha ", exito: false, open: true }));
            if(!activeButtonColapsoSemanal) setModal(e => ({ ...e, text: "Debe seleccionar un tipo de visualización", exito: false, open: true }));
            if(!conexion) setModal(e => ({ ...e, text: "Recuerde seleccionar el tipo de visualización", exito: false, open: true }));
        }
    };

    // Botones de controles

    const handleButtonClickControles = (buttonName) => {
        setTimeout(() => {
            console.log("Espera 2 segundos");
        }, 2000);
        setActiveButtonControles(buttonName);
    };

    const moverEscena = () => {
        if(!pausar){
            if( indexData < dataSocket.length){
                if(indexData === 0 ){
                    console.log("Esperando inicialmente al back...");
                    setTimeout(() => {
                        console.log("Escena movida después de esperar", indexData);
                    }, 10000);
                }
                setTimeout(() => {
                    setIndexData(indexData + 1);
                    console.log("Escena movida después de esperar", indexData);
                }, duracionEscena);
                //setRenderizarSeccionPosterior(true);
                // Esperar 1000 milisegundos (1 segundo) antes de actualizar el estado
            }else console.log("Se alcanzo el limite");
        }
    }
    const pausarEscena = () => {
        setPausar(true);
    }

    const seguirEscena = () => {
        if(dataSocket.length == 0 ) enviarMensaje();
        setPausar(false);
    }

    useEffect(() => {
        if (activeButtonColapsoSemanal) {
            conectarWS();
        }
        if (conexion) {
            console.log('Se ha conectado');
            console.log(conexion);
        } else {
            console.log('Fallo effect');
        }
    }, [activeButtonColapsoSemanal]);

    useEffect(() => {
        console.log("fecha inicio",startDate);
        console.log("file simu",filePedidos);
    }, [startDate,filePedidos]);

    return (
        <div className="Simulacion">
            <ModalResultado isOpen={modal.open} mensaje={modal.text} exito={modal.exito}
                            closeModal={() => setModal(e => ({ ...e, open: false }))} />

            <h1> { indexData == 0 ? ( 'Esperando al back...'): ( 'Segundo: ' + indexData ) } </h1>
            <>{ console.log('Datos de escena: ', indexData ,' ', dataSocket[indexData])}</>
            {
                dataSocket && dataSocket[indexData] && dataSocket[indexData].trucks ? (
                    <MapaSimu dataMapa = { dataSocket[indexData].trucks }
                              index = {indexData}
                              setIndex = {moverEscena}
                              dataBloqueos = {dataSocket[indexData].lockdowns}
                              duracion = {duracionEscena}
                              pausarR = {pausar}
                              pedidos = {dataSocket[indexData].orders}/>
                ):(
                    <MapaSimu/>
                )
            }

            {/* Botones de colapso/semanal */}

            <div className="control-buttons">
                Tipo de visualización:
                <ButtonGroup aria-label="Semana/Colapso" className="botones">
                    <Button
                        className={`custom-button ${activeButtonColapsoSemanal === 'Semana' ? 'active' : ''}`}
                        onClick={() => setActiveButtonColapsoSemanal('Semana')}>
                        Semana
                    </Button>
                    <Button
                        className={`custom-button ${activeButtonColapsoSemanal === 'Colapso' ? 'active' : ''}`}
                        onClick={() =>setActiveButtonColapsoSemanal('Colapso')}>
                        Colapso
                    </Button>
                </ButtonGroup>

                {/* Botones de control */}
                <ButtonGroup aria-label="Barra de control" className="controles">
                    <Button
                        className={`custom-button success ${activeButtonControles === 'Play' ? 'active' : ''}`}
                        onClick={() => { seguirEscena(); handleButtonClickControles('Play')}}>
                        <FaPlay className="controles play"/>
                    </Button>
                    <Button
                        className={`custom-button danger ${activeButtonControles === 'Stop' ? 'active' : ''}`}
                        onClick={() => { pausarEscena(); handleButtonClickControles('Stop')}}>
                        <FaPause className="controles stop"/>
                    </Button>
                    <Button
                        className={`custom-button warning ${activeButtonControles === '1.5x' ? 'active' : ''}`}
                        onClick={() => handleButtonClickControles('1.5x')}>
                        <HiRefresh className="controles-refresh"/>
                    </Button>
                </ButtonGroup>
            </div>


                 <Container className="table-responsive">
                    <Tabs id="miPestanas" activeKey={key} onSelect={(k) => { setKey(k); }}>
                        <Tab eventKey="pestana1" title="Leyenda"><Leyenda/></Tab>
                        <Tab eventKey="pestana4" title="Cargar pedidos">
                            <CargaDeDatos onStartDateChange={setStartDate} onFileUpload={setFilePedidos}
                                          conectarWS={conectarWS}/>
                        </Tab>
                        <Tab eventKey="pestana2" title="Camiones">
                            {dataSocket && dataSocket[indexData] && dataSocket[indexData].trucks ? (
                                <Camiones data={dataSocket[indexData].trucks}/>
                            ):(
                                <Camiones data={null}/>
                                )
                            }
                        </Tab>
                        <Tab eventKey="pestana3" title="Pedidos">
                            {dataSocket && dataSocket[indexData] && dataSocket[indexData].orders ? (
                                <PedidosSimulacion data={dataSocket[indexData].orders}/>
                            ):(
                                <PedidosSimulacion data={null}/>
                            )}
                        </Tab>
                        <Tab eventKey="pestana5" title="Reporte Simulación">
                           {dataSocket && dataSocket[indexData] && dataSocket[indexData].currentDateTime ? (
                                    <ReporteSimulacion data={dataSocket[indexData].currentDateTime}/>
                            ):(
                               <ReporteSimulacion data={null}/>
                            )}
                        </Tab>
                    </Tabs>
                </Container>

            </div>
    );
}

export default Simulacion;