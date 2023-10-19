import React from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap';
import "./Pedidos.css";

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

function Pedidos() {
    return (
        <div>
            <h1 className="titulo">Registrar Pedido</h1>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2} className="label-left">Coordenada del Pedido</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Ingrese la coordenada" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2} className="label-left">GLP Solicitado</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" placeholder="Ingrese la cantidad de GLP" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2} className="label-left">Fecha y Hora de Entrega Solicitada</Form.Label>
                    <Col sm={4}>
                        <Form.Control type="datetime-local" />
                    </Col>
                </Form.Group>
                <Button className="boton-registrar" type="submit">
                    Registrar
                </Button>
            </Form>

            <h1 className="titulo">Pedidos</h1>
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

export default Pedidos;