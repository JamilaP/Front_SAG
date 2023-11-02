import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";

const pedidos = [
    {
        idCliente: "c-38",
        ubicacion: "(8,9)",
        fechaRegistro: "2023-11-02 00:26:00",
        horasLimite: "5",
        cantidadGLP: 5,
    },
    {
        idCliente: "c-48",
        ubicacion: "(11,9)",
        fechaRegistro: "2023-11-03 00:46:00",
        horasLimite: "4",
        cantidadGLP: 7,
    },
    {
        idCliente: "c-190",
        ubicacion: "(12,9)",
        fechaRegistro: "2023-11-04 00:56:00",
        horasLimite: "8",
        cantidadGLP: 10,
    },
];

function PedidosOD() {
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
                </tr>
                </thead>
                <tbody>
                {pedidos.map((pedido,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{pedido.idCliente}</td>
                        <td>{pedido.ubicacion}</td>
                        <td>{pedido.fechaRegistro}</td>
                        <td>{pedido.horasLimite}</td>
                        <td>{pedido.cantidadGLP}</td>
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

export default PedidosOD;