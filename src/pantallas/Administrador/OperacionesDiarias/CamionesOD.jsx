import React, {useState, useEffect} from 'react';
import {Button, DropdownButton, Table, Dropdown, InputGroup, FormControl} from "react-bootstrap";
import "./CamionesOD.css";

const generarDatosCamiones = () => {
    const camiones = [];

    for (let i = 1; i <= 20; i++) {
        const camion = {
            id: i,
            cargaActual: Math.floor(Math.random() * 100) + 100, // Carga entre 100 y 199
            cargaMaxima: Math.floor(Math.random() * 50) + 150, // Carga entre 150 y 199
            pedidos: Math.floor(Math.random() * 5) + 1, // Entre 1 y 5 pedidos
            estado: Math.random() > 0.5 ? "En ruta" : "En espera",
            galonesDisponibles: Math.floor(Math.random() * 50) + 10, // Entre 10 y 59 galones disponibles
            consumoTotal: Math.floor(Math.random() * 50) + 30, // Entre 30 y 79 unidades de consumo total
            pedidoActual: `c-${Math.floor(Math.random() * 100) + 1}`, // Pedido aleatorio
        };

        camiones.push(camion);
    }

    return camiones;
};

const camiones = generarDatosCamiones();

function CamionesOD() {
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroOpcion, setFiltroOpcion] = useState('Todos');


    // Función para filtrar los camiones según el texto y la opción seleccionada
    const camionesFiltrados = camiones.filter(camion => {
        // Filtrar por texto
        const textoCoincide = camion.id.toString().includes(filtroTexto);
        // Filtrar por opción
        const opcionCoincide = (filtroOpcion === 'Todos' || camion.estado === filtroOpcion);
        return textoCoincide && opcionCoincide;
    });

    return (
        <div className="contenedor-camiones">


             <div className="barra-busqueda">
                <div className="texto-busqueda">Búsqueda por camión:</div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Buscar por ID de camión"
                        value={filtroTexto}
                        onChange={(e) => setFiltroTexto(e.target.value)}
                    />
                </InputGroup>
            </div>

            <Table striped bordered hover className="tabla">
                <thead>
                <tr>
                    <th>Camión</th>
                    <th>Carga del GLP / Capacidad (m3)</th>
                    <th>Combustible usado (galón)</th>
                    <th>Nro. pedidos asignados</th>
                    <th>Pedidos Actual</th>
                    <th>Pedidos Asociados</th>
                </tr>
                </thead>
                <tbody data-bs-search-live="true">
                {camionesFiltrados && camionesFiltrados.map((camion) => (
                    <tr key={camion.id}>
                        <td>{camion.id}</td>
                        <td>{camion.cargaActual}/{camion.cargaMaxima}</td>
                        <td>{camion.pedidos}</td>
                        <td>{camion.consumoTotal}</td>
                        <td>{camion.pedidoActual}</td>
                        <td>
                            <Button className="my-boton">Ver</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CamionesOD;
