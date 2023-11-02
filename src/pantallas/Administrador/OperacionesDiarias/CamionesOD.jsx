import React, {useState, useEffect} from 'react';
import {Button, DropdownButton, Table, Dropdown, InputGroup, FormControl} from "react-bootstrap";
import "./CamionesOD.css";

function CamionesOD() {

    const camiones = [
        {
            id: 1,
            cargaActual: 110,
            cargaMaxima: 120,
            pedidos: 3,
            estado: "En ruta",
            galonesDisponibles: 10,
            consumoTotal: 50,
            pedidoActual: "c-38",
        },
        {
            id: 2,
            cargaActual: 120,
            cargaMaxima: 130,
            pedidos: 2,
            estado: "En espera",
            galonesDisponibles: 30,
            consumoTotal: 60,
            pedidoActual: "c-38",
        },
        {
            id: 3,
            cargaActual: 100,
            cargaMaxima: 140,
            pedidos: 1,
            estado: "En ruta",
            galonesDisponibles: 40,
            consumoTotal: 30,
            pedidoActual: "c-48",
        },
    ];


    return (
        <div>

            <h1 className="titulo">Detalle de flota</h1>

            {/*} <div className="barra-busqueda">

                <div className="texto-busqueda">Búsqueda por camión:</div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Buscar por ID de camión"
                        value={filtroTexto}
                        onChange={(e) => setFiltroTexto(e.target.value)}
                    />

                </InputGroup>

                <div className="texto-busqueda"> Filtrado por estado:</div>
                <DropdownButton className="dropdown-busqueda" id="dropdown-basic-button" title={filtroOpcion}>
                    <Dropdown.Item onClick={() => setFiltroOpcion('Todos')}>Todos</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('En mantenimiento')}>En mantenimiento</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('En uso')}>En uso</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('Libre')}>Libre</Dropdown.Item>
                </DropdownButton>

            </div>*/}

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
                </tr>
                </thead>
                <tbody data-bs-search-live="true">
                {camiones && camiones.map((camion) => (
                    <tr key={camion.id}>
                        <td>{camion.id}</td>
                        <td>{camion.cargaActual}/{camion.cargaMaxima}</td>
                        <td>{camion.pedidos}</td>
                        <td>{camion.estado}</td>
                        <td>{camion.galonesDisponibles}</td>
                        <td>{camion.consumoTotal}</td>
                        <td>{camion.pedidoActual}</td>
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

export default CamionesOD;
