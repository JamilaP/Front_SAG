import React, {useState} from 'react';
import {Container, Tab, Tabs } from 'react-bootstrap';
import Leyenda from "../Simulación/Leyenda";
import CamionesOD from "./CamionesOD";
import CargaDeDatos from "../Simulación/CargaDeDatos";
import PedidosOD from "./PedidosOD";
import "./OperacionesDiarias.css";
import MapaSimu from "../Simulación/MapaSimu";
function OperacionesDiarioas() {
    const [key, setKey] = useState('pestana1');

    return (
        <div className="OperacionesDiarias">
            <div className="contenedorCanvas">
                <MapaSimu/>
            </div>

            <div className="elemento">
                <div className="espacio"> </div>
                    <div className="tabla-container">
                        <Container className="table-responsive">
                            <Tabs id="miPestanas" activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="pestana1" title="Leyenda"><Leyenda/></Tab>
                                <Tab eventKey="pestana2" title="Camiones"><CamionesOD/></Tab>
                                <Tab eventKey="pestana3" title="Pedidos"><PedidosOD/></Tab>
                                {/*<Tab eventKey="pestana4" title="Cargar datos"><CargaDeDatos/></Tab>*/}
                            </Tabs>
                        </Container>
                    </div>
            </div>
        </div>
    );
}

export default OperacionesDiarioas;