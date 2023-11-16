import React, {useState} from 'react';
import {Container, Tab, Tabs} from 'react-bootstrap';
import Leyenda from "../Simulación/Leyenda";
import CamionesOD from "./CamionesOD";
import CargaDeDatos from "../Simulación/CargaDeDatos";
import PedidosOD from "./PedidosOD";
import "./OperacionesDiarias.css";
import MapaSimu from "../Simulación/MapaSimu";
import {BiSolidCalendarCheck, BiSolidTruck} from "react-icons/bi";
import {AiFillClockCircle} from "react-icons/ai";
import {PiNotebookFill} from "react-icons/pi";
import {TbNotebookOff} from "react-icons/tb";

function OperacionesDiarioas() {
    const [key, setKey] = useState('pestana1');

    return (
        <div className="OperacionesDiarias">
            <div className="contenedor-mapa-informacion">
                <div className="contenedor-reporte">
                        <div className="grupo-1">
                            <BiSolidCalendarCheck className="icono-1"></BiSolidCalendarCheck>
                            <div className="nombre">Fecha de simulación: 10/01/2023</div>
                        </div>
                        <div className="grupo-1"><AiFillClockCircle className="icono-1"></AiFillClockCircle>
                            <div className="nombre">Días transcurridos: 03:04:12</div>
                        </div>
                        <div className="grupo-1"><BiSolidTruck className="icono-1"></BiSolidTruck>
                            <div className="nombre">Porcentaje de flota ocupada: 30%</div>
                        </div>
                        <div className="grupo-1"><PiNotebookFill className="icono-1"></PiNotebookFill>
                            <div className="nombre">Pedidos atendidos: 1200</div>
                        </div>
                </div>
                <div className="contenedor-mapa">
                    <MapaSimu/>
                </div>
            </div>
            <div className="contenedor-informacion">
                <div className="contenedor-leyenda">
                    <Leyenda/>
                </div>
                <div className="tabla-container">
                    <Container className="table-responsive">
                        <Tabs id="miPestanas" className="cuadro-pestanas" activeKey={key} onSelect={(k) => setKey(k)}>
                            <Tab eventKey="pestana2" title="Camiones"><CamionesOD/></Tab>
                            <Tab eventKey="pestana3" title="Pedidos"><PedidosOD/></Tab>
                        </Tabs>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default OperacionesDiarioas;