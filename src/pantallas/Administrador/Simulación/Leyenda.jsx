import React from 'react';
import { Card } from 'react-bootstrap';
import "./Leyenda.css";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BiSolidTruck, BiBuildings } from 'react-icons/bi';
import { FiDatabase } from 'react-icons/fi';
import { AiOutlineRise } from 'react-icons/ai';

function Leyenda() {
    return (
        <div>
            <h1 className="titulo">Leyenda</h1>
            <Card className="custom-card">

                <Card.Body>
                    <ul className="list-unstyled">
                        <li className="d-flex align-items-center">
                            <BsFillGeoAltFill className="mr-3 geo-icon"/>
                            Pedidos
                        </li>
                        <li className="d-flex align-items-center">
                            <BiSolidTruck className="mr-3 truck-icon"/>
                            Camión
                        </li>
                        <li className="d-flex align-items-center">
                            <FiDatabase className="mr-3 database-icon"/>
                            Cisterna
                        </li>
                        <li className="d-flex align-items-center">
                            <BiBuildings className="mr-3 buildings-icon"/>
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
                </Card.Body>
            </Card>
        </div>
    );
}

export default Leyenda;
