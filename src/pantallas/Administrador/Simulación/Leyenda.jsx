import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Col, Form, Row} from 'react-bootstrap';
import "./Leyenda.css";
import { BsFillGeoAltFill } from "react-icons/bs";
import { FiDatabase } from 'react-icons/fi';
import { AiOutlineRise } from 'react-icons/ai';
import {PiNavigationArrowFill} from "react-icons/pi";
import { LuWarehouse } from "react-icons/lu";
import {FaPause, FaPlay} from "react-icons/fa";
import {HiRefresh} from "react-icons/hi";

function Leyenda() {
    let startDate = "2023-03-13";
    const [activeButtonControles, setActiveButtonControles] = useState(null);
    const [activeButtonColapsoSemanal, setActiveButtonColapsoSemanal] = useState(null);

    const handleButtonClickControles = (buttonName) => {
        setTimeout(() => {
            console.log("Espera 2 segundos");
        }, 2000);
        setActiveButtonControles(buttonName);
    };

    return (
        <div className="contenedor-general">

            <div className="simulacion-componentes">
                <Form className="form-grupo-1">
                    <Form.Group as={Row} className="fecha">
                            <Form.Label className="label-right">Fecha de inicio de la simulación:</Form.Label>
                            <Form.Control className="contenedor-fecha" type="date" value={startDate}/>
                    </Form.Group>
                </Form>
            </div>

            <div className="control-buttons">
                <div className="label">Tipo de visualización:</div>
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
                        onClick={() => {  handleButtonClickControles('Play')}}>
                        <FaPlay className="controles play"/>
                    </Button>
                    <Button
                        className={`custom-button danger ${activeButtonControles === 'Stop' ? 'active' : ''}`}
                        onClick={() => {  handleButtonClickControles('Stop')}}>
                        <FaPause className="controles stop"/>
                    </Button>
                    <Button
                        className={`custom-button warning ${activeButtonControles === '1.5x' ? 'active' : ''}`}
                        onClick={() => handleButtonClickControles('1.5x')}>
                        <HiRefresh className="controles-refresh"/>
                    </Button>
                </ButtonGroup>
            </div>

            <div className="card-leyenda">
                <div className="titulo-leyenda">Leyenda:</div>
                    <ul className="list-unstyled">
                        <li className="d-flex align-items-center">
                            <BsFillGeoAltFill className="mr-3 geo-icon"/>
                            Pedidos
                        </li>
                        <li className="d-flex align-items-center">
                            <PiNavigationArrowFill className="mr-3 truck-icon"/>
                            Camión
                        </li>
                        <li className="d-flex align-items-center">
                            <FiDatabase className="mr-3 database-icon"/>
                            Cisterna
                        </li>
                        <li className="d-flex align-items-center">
                            <LuWarehouse className="mr-3 buildings-icon"/>
                            Planta
                        </li>
                        <li className="d-flex align-items-center">
                            <AiOutlineRise className="mr-3 rise-icon"/>
                            Bloqueo
                        </li>
                        <li className="d-flex align-items-center">
                            <AiOutlineRise className="mr-3 route-icon"/>
                            Ruta
                        </li>
                    </ul>
            </div>
        </div>
    );
}

export default Leyenda;
