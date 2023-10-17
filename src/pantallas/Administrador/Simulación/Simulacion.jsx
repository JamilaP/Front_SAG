import React, { useState } from 'react';
import {Container, Tab,Tabs} from "react-bootstrap";
import logo from "../../../logo.svg";
import "./Simulacion.css"
import PedidosSimulacion from "./PedidosSimulacion";
import Leyenda from "./Leyenda";
import Camiones from "./Camiones";
import CargaDeDatos from "./CargaDeDatos";
import Reporte from "../Reporte";


function Simulacion() {
    const [key, setKey] = useState('pestana1');

    return (
        <div  className="Simulacion">
            <img src={logo} className="App-logo" alt="logo" />

            <Container className="table-responsive">
                <Tabs id="miPestanas" activeKey={key} onSelect={(k) => setKey(k)} >
                    <Tab eventKey="pestana1" title="Leyenda"><Leyenda/></Tab>
                    <Tab eventKey="pestana2" title="Camiones"><Camiones/></Tab>
                    <Tab eventKey="pestana3" title="Pedidos"><PedidosSimulacion/></Tab>
                    <Tab eventKey="pestana4" title="Cargar datos"><CargaDeDatos/></Tab>
                    <Tab eventKey="pestana5" title="Reporte Simulación"><Reporte/></Tab>
                </Tabs>
            </Container>
        </div>
    );
}

export default Simulacion;