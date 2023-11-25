import React, {useState} from 'react';
import {Container, Tab, Tabs} from 'react-bootstrap';
import Leyenda from "../Simulacion/Leyenda";
import CamionesOD from "./CamionesOD";
import CargaDeDatos from "../Simulacion/CargaDeDatos";
import PedidosOD from "./PedidosOD";
import "./OperacionesDiarias.css";
import MapaSimu from "../Simulacion/MapaSimu";
import {BiSolidCalendarCheck, BiSolidTruck} from "react-icons/bi";
import {AiFillClockCircle} from "react-icons/ai";
import {PiNotebookFill} from "react-icons/pi";
import {TbNotebookOff} from "react-icons/tb";
import Camiones from "../Simulacion/Camiones";
import PedidosSimulacion from "../Simulacion/PedidosSimulacion";

function OperacionesDiarioas(props) {
    const [key, setKey] = useState('pestana2');

    return (
        <div className="OperacionesDiarias">
            <div className="contenedor-mapa-informacion">
                <div className="contenedor-reporte">
                        <div className="grupo-icono-texto"><BiSolidCalendarCheck className="icono"></BiSolidCalendarCheck>
                            <div className="nombre">Fecha operacional: 10/01/2023 03:04:12</div>
                        </div>
                        <div className="grupo-icono-texto"><BiSolidTruck className="icono"></BiSolidTruck>
                            <div className="nombre">Porcentaje de flota ocupada: 30%</div>
                        </div>
                        <div className="grupo-icono-texto"><PiNotebookFill className="icono"></PiNotebookFill>
                            <div className="nombre">Pedidos atendidos en el día: 200</div>
                        </div>
                </div>
                <div className="contenedor-mapa">
                {
                    props.dataSocket && props.dataSocket[props.indexData] && props.dataSocket[props.indexData].trucks ? (
                        <MapaSimu dataMapa={props.dataSocket[props.indexData].trucks}
                                  index={props.indexData}
                                  setIndex={props.moverEscena}
                                  dataBloqueos={props.dataSocket[props.indexData].lockdowns}
                                  duracion={props.duracionEscena}
                                  pausarR={props.pausar}
                                  pedidos={props.dataSocket[props.indexData].orders}/>
                    ) : (
                        <MapaSimu 
                        dataMapa={props.dataAnt.trucks}
                        index={props.indexData}
                        setIndex={props.moverEscena}
                        dataBloqueos={props.dataAnt.lockdowns}
                        duracion={props.duracionEscena}
                        pausarR={props.pausar}
                        pedidos={props.dataAnt.orders}/>
                    )
                }
                </div>
            </div>
            <div className="contenedor-informacion">
                <div className="contenedor-leyenda">
                    <Leyenda pestaña={'operacionesDiarias'}/>
                </div>
                <div className="tabla-container">
                    <Container className="table-responsive">
                        <Tabs id="miPestanas" className="cuadro-pestanas" activeKey={key} onSelect={(k) => setKey(k)}>
                            <Tab eventKey="pestana2" title="Camiones">
                                {props.dataSocket && props.dataSocket[props.indexData] && props.dataSocket[props.indexData].trucks ? (
                                    <Camiones data={props.dataSocket[props.indexData].trucks}/>
                                ) : (
                                    <Camiones data={props.dataAnt.trucks}/>
                                )}
                            </Tab>
                            <Tab eventKey="pestana3" title="Pedidos">
                                {props.dataSocket && props.dataSocket[props.indexData] && props.dataSocket[props.indexData].orders ? (
                                    <PedidosSimulacion data={props.dataSocket[props.indexData].orders}/>
                                ) : (
                                    <PedidosSimulacion data={props.dataAnt.orders}/>
                                )}
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default OperacionesDiarioas;