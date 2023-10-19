import React, {useState} from 'react';
import {Image, Container, Tab, Tabs } from 'react-bootstrap';
import mapa from "../../../imagenes/mapa.png";
import Leyenda from "../Simulación/Leyenda";
import Camiones from "../Simulación/Camiones";
import CargaDeDatos from "../Simulación/CargaDeDatos";
import PedidosSimulacion from "../Simulación/PedidosSimulacion";
import "./OperacionesDiarias.css";
function OperacionesDiarioas() {
    const [key, setKey] = useState('pestana1');

    return (
        <div className="OperacionesDiarias">
            <div className="Imagen">
            <Image src={mapa} width={1000} height={400} className="mr-2" />
            </div>
            <div className="espacio"> </div>
            <div className="tabla-container">
                <Container className="table-responsive">
                    <Tabs id="miPestanas" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="pestana1" title="Leyenda"><Leyenda/></Tab>
                        <Tab eventKey="pestana2" title="Camiones"><Camiones/></Tab>
                        <Tab eventKey="pestana3" title="Pedidos"><PedidosSimulacion/></Tab>
                        <Tab eventKey="pestana4" title="Cargar datos"><CargaDeDatos/></Tab>
                    </Tabs>
                </Container>
            </div>
        </div>
    );
}

export default OperacionesDiarioas;