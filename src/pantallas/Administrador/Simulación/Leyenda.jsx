import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, Col, Form, Row} from 'react-bootstrap';
import "./Leyenda.css";
import {BsFillGeoAltFill} from "react-icons/bs";
import {FiDatabase} from 'react-icons/fi';
import {AiOutlineRise} from 'react-icons/ai';
import {PiNavigationArrowFill} from "react-icons/pi";
import {LuWarehouse} from "react-icons/lu";
import {FaPause, FaPlay} from "react-icons/fa";
import {HiRefresh} from "react-icons/hi";

function Leyenda(props) {
    const [storedStartDate, setStoredStartDate] = useState(() => {
        // Obtener la fecha almacenada en localStorage o usar el valor inicial
        return localStorage.getItem('startDate') || props.startDate;
    });

    useEffect(() => {
        // Actualizar el valor en localStorage cada vez que cambie la fecha
        localStorage.setItem('startDate', storedStartDate);
    }, [storedStartDate]);

    const handleButtonClickControles = (buttonName) => {
        setTimeout(() => {
            console.log("Espera 2 segundos");
        }, 2000);
        props.setActiveButtonControles(buttonName);
        if(buttonName==='Refresh'){
            //props.setActiveButtonColapsoSemanal(null);
            //props.setActiveButtonControles(null);
            //props.setDataSocket([]);
            //props.conexion=null; //puede ser esto
            //props.conexion.unsubscribe('/topic/simulation-progress');

            //setStoredStartDate(props.startDate);
            window.location.reload();
        }
    };

    const handleDateChange = (e) => {
        const newStartDate = e.target.value;
        setStoredStartDate(newStartDate); // Actualizar el estado y almacenar en localStorage
        props.setStartDate(newStartDate);
    };

    return (
        <div className="leyenda">

            {props.pestana === 'simulacion' && (
                <>
                    <Form className="grupo-text-fecha">
                        <Form.Group className="fecha-contenedor">
                            <Form.Label className="texto-label">Fecha de inicio de la simulación:</Form.Label>
                            <Form.Control className="fecha" type="date" value={storedStartDate}
                                          onChange={handleDateChange}/>
                        </Form.Group>
                    </Form>


                    <div className="control-buttons">
                        <div className="texto-tipo-visualizacion">Tipo de visualización:</div>
                        <ButtonGroup aria-label="Semana/Colapso" className="botones">
                            <Button
                                className={`boton ${props.activeButtonColapsoSemanal === 'Semana' ? 'active' : ''}`}
                                onClick={() => props.setActiveButtonColapsoSemanal('Semana')}>
                                Semana
                            </Button>
                            <Button
                                className={`boton ${props.activeButtonColapsoSemanal === 'Colapso' ? 'active' : ''}`}
                                onClick={() => props.setActiveButtonColapsoSemanal('Colapso')}>
                                Colapso
                            </Button>
                        </ButtonGroup>


                        <ButtonGroup aria-label="Barra-de-control" className="botones">
                            <Button
                                className={`boton ${props.activeButtonControles === 'Play' ? 'active' : ''}`}
                                onClick={() => {
                                    props.seguirEscena();
                                    handleButtonClickControles('Play')
                                }}>
                                <FaPlay className="icono-boton"/>
                            </Button>
                            <Button
                                className={`boton ${props.activeButtonControles === 'Stop' ? 'active' : ''}`}
                                onClick={() => {
                                    props.pausarEscena();
                                    handleButtonClickControles('Stop')
                                }}>
                                <FaPause className="icono-boton"/>
                            </Button>
                            <Button
                                className={`boton ${props.activeButtonControles === 'refresh' ? 'active' : ''}`}
                                onClick={() => handleButtonClickControles('Refresh')}>
                                <HiRefresh className="icono-boton"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </>
            )}

            <div className="card-leyenda">
                <div className="titulo-leyenda">Leyenda:</div>
                <ul className="lista-iconos-texto">
                    <li className="icono-texto">
                        <BsFillGeoAltFill className="icono-leyenda pedido"/>
                        Pedido
                    </li>
                    <li className="icono-texto">
                        <PiNavigationArrowFill className="icono-leyenda camion"/>
                        Camión
                    </li>
                    <li className="icono-texto">
                        <FiDatabase className="icono-leyenda cisterna"/>
                        Cisterna
                    </li>
                    <li className="icono-texto">
                        <LuWarehouse className="icono-leyenda planta"/>
                        Planta
                    </li>
                    <li className="icono-texto">
                        <AiOutlineRise className="icono-leyenda bloqueo"/>
                        Bloqueo
                    </li>
                    <li className="icono-texto">
                        <AiOutlineRise className="icono-leyenda ruta"/>
                        Ruta
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Leyenda;