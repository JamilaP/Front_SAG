import React, { useState, useEffect }  from 'react';
import {Button, Table} from "react-bootstrap";
import "./Camiones.css";


function Camiones() {
    const [camiones, setCamiones] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/sag-genetico/api/camiones/initial')
            .then((response) => response.json())
            .then((data) => setCamiones(data))
            .catch((error) => console.error('Error al obtener datos de camiones:', error));
    }, []);

    return (
        <div>
            <h1 className="titulo">Detalle de flota</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Camión</th>
                    <th>Carga del GLP/Capacidad (m3)</th>
                    <th>Nro. pedidos asignados</th>
                    <th>En mantenimiento</th>
                    <th>Combustible disponible (galón)</th>
                    <th>Combustible usado (galón)</th>
                    <th>Pedidos Actual</th>
                    <th>Pedidos Asociados</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody data-bs-search-live="true">
                {camiones.map((camion) => (
                    <tr key={camion.id}>
                        <td>{camion.idCamion}</td>
                        <td>{camion.cargaActual}/{camion.cargaMaxima}</td>
                        <td>{camion.pedidos}</td>
                        <td>{camion.estado}</td>
                        <td>{camion.galonesDisponibles}</td>
                        <td>{camion.consumoTotal}</td>
                        <td>{camion.consumoTotal}</td>
                        <td>{camion.consumoTotal}</td>
                        <td>
                            <Button variant="primary">Ver</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Camiones;
