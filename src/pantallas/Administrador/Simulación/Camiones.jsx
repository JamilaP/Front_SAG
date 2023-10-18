import React from 'react';
import {Button, Table} from "react-bootstrap";
import "./Camiones.css";

const camiones = [
    {
        id: 1,
        carga: "080 / 10",
        pedidosAsignados: 10,
        enMantenimiento: "No",
        combustibleDisponible: 10,
        combustibleUsado: 10,
        pedidosActual: 2,
        pedidosAsociados: 2
    },
    {
        id: 2,
        carga: "075 / 12",
        pedidosAsignados: 8,
        enMantenimiento: "Sí",
        combustibleDisponible: 5,
        combustibleUsado: 4,
        pedidosActual: 3,
        pedidosAsociados: 3
    },
    {
        id: 3,
        carga: "090 / 9",
        pedidosAsignados: 12,
        enMantenimiento: "No",
        combustibleDisponible: 8,
        combustibleUsado: 6,
        pedidosActual: 4,
        pedidosAsociados: 5
    }
];

function Camiones() {
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
                        <td>{camion.id}</td>
                        <td>{camion.carga}</td>
                        <td>{camion.pedidosAsignados}</td>
                        <td>{camion.enMantenimiento}</td>
                        <td>{camion.combustibleDisponible}</td>
                        <td>{camion.combustibleUsado}</td>
                        <td>{camion.pedidosActual}</td>
                        <td>{camion.pedidosAsociados}</td>
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
