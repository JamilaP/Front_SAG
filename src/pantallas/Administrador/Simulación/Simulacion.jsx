import React, { useState } from 'react';
import {Container, Image, Tab, Tabs} from "react-bootstrap";
import mapa from "../../../imagenes/mapa.png";
import "./Simulacion.css"
import PedidosSimulacion from "./PedidosSimulacion";
import Leyenda from "./Leyenda";
import Camiones from "./Camiones";
import CargaDeDatos from "./CargaDeDatos";
import ReporteSimulacion from "./ReporteSimulacion";

function Simulacion() {
    const [key, setKey] = useState('pestana1');

    return (
        <div  className="Simulacion">
            <Image src={mapa} width={1000} height={400} className="mr-2" />

            <Container className="table-responsive">
                <Tabs id="miPestanas" activeKey={key} onSelect={(k) => setKey(k)} >
                    <Tab eventKey="pestana1" title="Leyenda"><Leyenda/></Tab>
                    <Tab eventKey="pestana2" title="Camiones"><Camiones/></Tab>
                    <Tab eventKey="pestana3" title="Pedidos"><PedidosSimulacion/></Tab>
                    <Tab eventKey="pestana4" title="Cargar datos"><CargaDeDatos/></Tab>
                    <Tab eventKey="pestana5" title="Reporte Simulación"><ReporteSimulacion/></Tab>
                </Tabs>
            </Container>
        </div>
    );
}

export default Simulacion;