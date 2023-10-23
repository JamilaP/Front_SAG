import React, {useState} from 'react';
import {Container, Image, Tab, Tabs, Button, ButtonGroup} from 'react-bootstrap';
import "./Simulacion.css"
import PedidosSimulacion from "./PedidosSimulacion";
import Leyenda from "./Leyenda";
import Camiones from "./Camiones";
import CargaDeDatos from "./CargaDeDatos";
import ReporteSimulacion from "./ReporteSimulacion";
import {FaPlay, FaStop} from 'react-icons/fa';
import MapaSimu from './MapaSimu';

function Simulacion() {
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


    return (
        <div className="Simulacion">
            <div className="contenedorCanvas">
                <MapaSimu/>
            </div>

            <div className="elemento">
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
                            onClick={() => handleButtonClickControles('Play')}>
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
                        <Tab eventKey="pestana2" title="Camiones"><Camiones/></Tab>
                        <Tab eventKey="pestana3" title="Pedidos"><PedidosSimulacion/></Tab>
                        <Tab eventKey="pestana5" title="Reporte Simulación"><ReporteSimulacion/></Tab>
                    </Tabs>
                </Container>
            </div>
        </div>
    );
}

export default Simulacion;