import React from 'react';
import { Button, Table } from "react-bootstrap";

const pedidos = [
    {
        idPedido: 1,
        idCliente: 101,
        ubicacion: "Lugar 1",
        fechaHoraSolicitada: "2023-10-16 14:00",
        plazoHoras: 24,
        cantidadGLPSolicitado: 10,
        camiones: 2
    },
    {
        idPedido: 2,
        idCliente: 102,
        ubicacion: "Lugar 2",
        fechaHoraSolicitada: "2023-10-17 10:30",
        plazoHoras: 12,
        cantidadGLPSolicitado: 12,
        camiones: 1
    },
    {
        idPedido: 3,
        idCliente: 103,
        ubicacion: "Lugar 3",
        fechaHoraSolicitada: "2023-10-18 16:45",
        plazoHoras: 36,
        cantidadGLPSolicitado: 8,
        camiones: 3
    }
];

function PedidosSimulacion() {
    return (
        <div>
            <h1 className="titulo">Detalle de pedidos</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Id-cliente</th>
                    <th>Ubicación</th>
                    <th>Fecha y hora de llegada solicitada</th>
                    <th>Plazo (horas)</th>
                    <th>Cantidad de GLP solicitado (m3)</th>
                    <th>Camiones</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {pedidos.map((pedido) => (
                    <tr key={pedido.idPedido}>
                        <td>{pedido.idPedido}</td>
                        <td>{pedido.idCliente}</td>
                        <td>{pedido.ubicacion}</td>
                        <td>{pedido.fechaHoraSolicitada}</td>
                        <td>{pedido.plazoHoras}</td>
                        <td>{pedido.cantidadGLPSolicitado}</td>
                        <td>{pedido.camiones}</td>
                        <td>
                            <Button variant="primary">Ver</Button>
                        </td>
                    </tr>
                ))}
                {/* Agrega más filas de datos aquí */}
                </tbody>
            </Table>
        </div>
    );
}

export default PedidosSimulacion;