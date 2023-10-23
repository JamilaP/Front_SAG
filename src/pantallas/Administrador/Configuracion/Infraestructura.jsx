import React from 'react';
import {Table, Form} from "react-bootstrap";
import "./Infraestructura.css";

const infraestructuras = [
    {
        idInfraestructura: 1,
        tipo: "Planta",
        ubicacion: "(1,70)",
        estado: "Activo",
        capacidad: 200,

    },
    {
        idInfraestructura: 2,
        tipo: "Cisterna Intermedia",
        ubicacion: "(50,60)",
        estado: "Activo",
        capacidad: 100,
    },
    {
        idInfraestructura: 1,
        tipo: "Cisterna Intermedia",
        ubicacion: "(40,30)",
        estado: "Inactivo",
        capacidad: 80,
    }
];
function Infraestructura() {
    return (
        <div>
            <h1 className="titulo-pagina">Configuración general</h1>

            <div className="contenedor">
                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Infraestructura</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" />
                    </div>
                </div>
                {/* <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Capacidad(m3)</th>
                </tr>
                </thead>
                <tbody data-bs-search-live="true">
                {infraestructuras.map((inf) => (
                    <tr key={inf.idInfraestructura}>
                        <td>{inf.idInfraestructura}</td>
                        <td>{inf.tipo}</td>
                        <td>{inf.ubicacion}</td>
                        <td>{inf.estado}</td>
                        <td>{inf.capacidad}</td>
                    </tr>
                ))}
                </tbody>
                </Table>
                */}

                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Flota</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" />
                    </div>
                </div>

                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Bloqueos</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" />
                    </div>
                </div>

                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Mantenimiento</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" />
                    </div>
                </div>

            </div>



        </div>
    );
}

export default Infraestructura;