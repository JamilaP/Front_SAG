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
import {Client} from '@stomp/stompjs';
import ModalResultado from '../../../Componentes/ModalResultado';
import {BiSolidCalendarCheck, BiSolidTruck} from "react-icons/bi";
import {AiFillClockCircle} from "react-icons/ai";
import {PiNotebookFill} from "react-icons/pi";
import CamionesOD from "../OperacionesDiarias/CamionesOD";
import PedidosOD from "../OperacionesDiarias/PedidosOD";
import {TbNotebookOff} from "react-icons/tb";
import ModalColapso from "../../../Componentes/ModalColapso";
import ModalFinSemanal from "../../../Componentes/ModalFinSemanal";

function Simulacion() {

    let conexion = null; //Conexion websocket
    const [key, setKey] = useState('pestana2');
    const [dataSocket, setDataSocket] = useState([]);
    const [dataAnt, setDataAnt] = useState([]);
    const [indexData, setIndexData] = useState(0);
    const [filePedidos, setFilePedidos] = useState(null);
    const [modal, setModal] = useState({text: "", exito: true, open: false});
    const [duracionEscena, setDuracionEscena] = useState(100);
    const [pausar, setPausar] = useState(false);
    const [activeButtonControles, setActiveButtonControles] = useState(null);
    const [activeButtonColapsoSemanal, setActiveButtonColapsoSemanal] = useState(null);
    const [startDate, setStartDate] = useState(null); // Valor inicial
    const [modalColapso, setModalColapso] = useState({text: "", exito: true, open: false});
    const [modalFin, setModalFin] = useState({text: "", exito: true, open: false});


    function formatearFecha(fecha) {
        if (!fecha) {
            return '0000-00-00, 00:00:00';
        }

        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDate().toString().padStart(2, '0');
        const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaObj.getFullYear();
        const horas = fechaObj.getHours().toString().padStart(2, '0');
        const minutos = fechaObj.getMinutes().toString().padStart(2, '0');
        const segundos = fechaObj.getSeconds().toString().padStart(2, '0');

        return `${dia}-${mes}-${anio}, ${horas}:${minutos}:${segundos}`;
    }

    //WEBSOCKET
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
            //conexion.deactivate();
            conexion.activate();
        }

    };
    const conectarWS = () => {
        if (activeButtonColapsoSemanal) {
            const stompConfig = {
                reconnectDelay: 200,
            };
            conexion = new Client(stompConfig);
            console.log('Connecting to WebSocket...');
            try {
                conexion.configure({
                    webSocketFactory: () => new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint')
                });
                console.log('Conectado');
                console.log("estado de la conexion despues de el URL conexion", conexion);
            } catch (error) {
                console.log('No se pudo conectar', error);
            }

            conexion.onConnect = onConnectSocket;
            conexion.onWebSocketClose = onWebSocketClose;
            conexion.activate();
        }
    };
    const enviarMensaje = () => {
        // conectarWS();
        console.log("parametros", startDate, filePedidos, activeButtonColapsoSemanal);
        if (conexion && startDate && activeButtonColapsoSemanal) {
            console.log('CUMPLE CON TODO');
            if (conexion.connected) {
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
            if (!startDate) setModal(e => ({...e, text: "Debe ingresar una fecha ", exito: false, open: true}));
            if (!activeButtonColapsoSemanal) setModal(e => ({
                ...e,
                text: "Debe seleccionar un tipo de visualización",
                exito: false,
                open: true
            }));
            if (!conexion) setModal(e => ({
                ...e,
                text: "Recuerde seleccionar el tipo de visualización",
                exito: false,
                open: true
            }));
        }
    };

    const moverEscena = (pausarArg) => {
        if (!pausarArg) {
            if (indexData < dataSocket.length) {
                setDataAnt(dataSocket[0]);
                // setDataSocket((prevArreglo) => prevArreglo.slice(1));

                setTimeout(() => {
                    setDataSocket((prevArreglo) => prevArreglo.slice(1));
                    console.log("Escena removida después de esperar", indexData);
                }, duracionEscena);
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


    const pausarEscena = () => {
        setPausar(true);
    }
    const seguirEscena = () => {
        if (dataSocket.length == 0) {
            enviarMensaje();
        }
        setPausar(false);
    }

// conectar WS con el boton de colapso/semanal
    useEffect(() => {
        if (activeButtonColapsoSemanal === 'Semana') {
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
        console.log("conexion estado", conexion)
    }, [conexion]);

    useEffect(() => {
        setStartDate(localStorage.getItem('startDate'));
    }, []);

    useEffect(() => {
        if(dataSocket && dataSocket[indexData] && dataSocket[indexData].collapse) {
            setModalColapso(e => ({...e, text: "", exito: false, open: true}));
        }
    }, [dataSocket]);

    useEffect(() => {
        // Verifica si startDate está definido y dataAnt tiene la propiedad currentDateTime
        if (startDate && dataAnt?.currentDateTime) {
            // Convierte startDate a un objeto de fecha
            const [year, month, day] = startDate.split('-');
            const startDateObj = new Date(Number(year), Number(month-1), Number(day), 0, 0, 0);
            //const startDateObj = new Date(`${startDate}T00:00:00Z`);

            // Suma 7 días a la fecha de inicio
            const endDate = new Date(startDateObj);
            endDate.setDate(startDateObj.getDate() + 7);

            // Convierte la fecha actual de dataAnt.currentDateTime a un objeto de fecha
            const currentDateTimeObj = new Date(dataAnt.currentDateTime);

            // Compara las fechas
            if (endDate.getTime() === currentDateTimeObj.getTime()) {
                // Si las fechas son iguales, activa el modal ModalFinSemanal
                setModalFin({ text: "", exito: true, open: true });
                // Desactivar modal
            }
        }
    }, [startDate, dataAnt]);

    return (
        <div className="Simulacion">
            <ModalResultado isOpen={modal.open} mensaje={modal.text} exito={modal.exito}
                            closeModal={() => setModal(e => ({...e, open: false}))}/>
            {
                dataSocket && dataSocket[indexData] && dataSocket[indexData].collapse ? (
                    <ModalColapso isOpen={modalColapso.open} mensaje={modalColapso.text} exito={modalColapso.exito}
                                  closeModal={() => setModalColapso(e => ({...e, open: false}))}
                                  reporteData={dataSocket[indexData]} startDate={startDate}/>

                ) : (
                    <ModalColapso isOpen={modalColapso.open} mensaje={modalColapso.text} exito={modalColapso.exito}
                                  closeModal={() => setModalColapso(e => ({...e, open: false}))}
                                  reporteData={dataAnt} startDate={startDate}/>
                )}

            <ModalFinSemanal isOpen={modalFin.open} mensaje={modalFin.text} exito={modalFin.exito}
                             closeModal={() => setModalFin(e => ({...e, open: false}))}
                             reporteData={dataAnt} startDate={startDate}/>

            <div className="contenedor-mapa-informacion">
                <div className="contenedor-reporte">
                    <div className="grupo-icono-texto"><BiSolidCalendarCheck className="icono"></BiSolidCalendarCheck>
                        <div className="texto">Fecha de
                            simulación: {formatearFecha(dataAnt?.currentDateTime)}</div>
                    </div>
                    <div className="grupo-icono-texto"><BiSolidTruck className="icono"></BiSolidTruck>
                        <div className="texto">Porcentaje de flota
                            ocupada: {dataAnt?.occupiedTrucksPercentage != null
                                ? `${(dataAnt?.occupiedTrucksPercentage * 100).toFixed(2)}%`
                                : "0%"}</div>
                    </div>
                    <div className="grupo-icono-texto"><PiNotebookFill className="icono"></PiNotebookFill>
                        <div className="texto">Pedidos
                            atendidos: {dataAnt?.fulfilledOrdersNumber ?? "00"}</div>
                    </div>
                    <div className="grupo-icono-texto"><TbNotebookOff className="icono"></TbNotebookOff>
                        <div className="texto">Pedidos pendientes en el
                            día: {dataAnt?.pendingOrdersOnTheDay ?? "00"}</div>
                    </div>
                </div>
                <div className="contenedor-mapa">
                    {/*<h6> { indexData == 0 ? ( 'Esperando al back...'): ( 'Segundo: ' + indexData ) } </h6>*/}
                    <>{console.log('Datos de escena: ', indexData, ' ', dataSocket[indexData])}</>
                    {
                        dataSocket && dataSocket[indexData] && dataSocket[indexData].trucks ? (
                            <MapaSimu dataMapa={dataSocket[indexData].trucks}
                                      index={indexData}
                                      setIndex={moverEscena}
                                      dataBloqueos={dataSocket[indexData].lockdowns}
                                      duracion={duracionEscena}
                                      pausarR={pausar}
                                      pedidos={dataSocket[indexData].orders}/>
                        ) : (
                            <MapaSimu
                                dataMapa={dataAnt.trucks}
                                index={indexData}
                                setIndex={moverEscena}
                                dataBloqueos={dataAnt.lockdowns}
                                duracion={duracionEscena}
                                pausarR={pausar}
                                pedidos={dataAnt.orders}/>
                        )
                    }
                </div>
            </div>


            <div className="contenedor-informacion">
                <div className="contenedor-leyenda">
                    <Leyenda pestana={'simulacion'} conectarWS={conectarWS} seguirEscena={seguirEscena}
                             pausarEscena={pausarEscena}
                             conexion={conexion} setStartDate={setStartDate} startDate={startDate}
                             setActiveButtonColapsoSemanal={setActiveButtonColapsoSemanal}
                             activeButtonColapsoSemanal={activeButtonColapsoSemanal}
                             setActiveButtonControles={setActiveButtonControles}
                             activeButtonControles={activeButtonControles} setDataSocket={setDataSocket}/>
                </div>

                <div className="tabla-container">
                    <Container className="table-responsive">
                        <Tabs id="miPestanas" className="cuadro-pestanas" activeKey={key} onSelect={(k) => setKey(k)}>
                            <Tab eventKey="pestana2" title="Camiones">
                                {dataSocket && dataSocket[indexData] && dataSocket[indexData].trucks ? (
                                    <Camiones data={dataSocket[indexData].trucks}/>
                                ) : (
                                    <Camiones data={dataAnt.trucks}/>
                                )
                                }
                            </Tab>
                            <Tab eventKey="pestana3" title="Pedidos">
                                {dataSocket && dataSocket[indexData] && dataSocket[indexData].orders ? (
                                    <PedidosSimulacion data={dataSocket[indexData].orders}/>
                                ) : (
                                    <PedidosSimulacion data={dataAnt.orders}/>
                                )}
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </div>

        </div>
    );
}

export default Simulacion;