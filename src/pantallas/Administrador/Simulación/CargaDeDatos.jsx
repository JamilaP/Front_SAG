import React from 'react';
import { Form, Button } from 'react-bootstrap';
import "./CargaDeDatos.css";

function CargaDeDatos() {

    return (
        <div>
            <h1 className="titulo">Carga de datos</h1>

            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label className="titulos-archivos">Bloqueos</Form.Label>
                <Form.Control type="file" size="sm" />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label className="titulos-archivos">Pedidos</Form.Label>
                <Form.Control type="file" size="sm" />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label className="titulos-archivos">Flota</Form.Label>
                <Form.Control type="file" size="sm" />
            </Form.Group>
        </div>
    );
}

export default CargaDeDatos;
