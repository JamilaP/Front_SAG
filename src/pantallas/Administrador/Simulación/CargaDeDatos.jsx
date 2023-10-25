import React from 'react';
import { Form, Button } from 'react-bootstrap';
import "./CargaDeDatos.css";

function CargaDeDatos() {

    return (
        <div>
            <h1 className="titulo">Carga de Pedidos</h1>
            {/*<div className="grupo-label-control">
                <div className="label">
                    <Form.Label className="titulos-archivos">Bloqueos</Form.Label>
                </div>
                <div className="control">
                    <Form.Control type="file" size="sm" />
                </div>
            </div>
            */}

            <div className="grupo-label-control">
                <div className="label">
                    <Form.Label className="titulos-archivos">Pedidos</Form.Label>
                </div>
                <div className="control">
                    <Form.Control type="file" size="sm" />
                </div>
                <Button className="boton-guardar" variant="success">
                    Guardar
                </Button>
            </div>

            {/*
            <div className="grupo-label-control">
                <div className="label">
                    <Form.Label className="titulos-archivos">Flota</Form.Label>
                </div>
                <div className="control">
                    <Form.Control type="file" size="sm" />
                </div>
            </div>
            */}


        </div>
    );


}

export default CargaDeDatos;
