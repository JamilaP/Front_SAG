import React, {useState, useEffect} from 'react';
import {Button, DropdownButton, Table, Dropdown, InputGroup, FormControl} from "react-bootstrap";
import "./Camiones.css";
import WebSocketComponent from "../../../Componentes/WebSocketComponent";
import PruebaWs from '../../../Componentes/PruebaWS';

function Camiones(props) {

    const { data } = props || { data: null }; // Destructura la propiedad data
    const [filtroTexto, setFiltroTexto] = useState(''); // Estado para el filtro de texto
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro de opciones

    useEffect(() => {
        //console.log('data: ', data);
        //console.log('arreglo de pedidos',nuevoArreglo);
    }, [data]);

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        console.log('No hay datos para procesar');
        return;
    }

    const nuevoArreglo = data.map(camion => {
        let arrPedidos = [];
        if (camion.pedidos && camion.pedidos.length > 0) {
                arrPedidos = camion.pedidos.map(pedido => ({
                fechaRegistro: pedido.first.fechaRegistro,
                idCliente: pedido.first.idCliente,
                cantidadGLP: pedido.first.cantidadGLP,
                horasLimite: pedido.first.horasLimite,
                ubicacion: pedido.first.ubicacion,
                entrega: pedido.second
            }));
        }

        return {
            id: camion.idCamion,
            cargaActual: camion.cargaActual,
            cargaMaxima: camion.cargaMaxima,
            pedidos: arrPedidos.length,
            estado: camion.estado,
            galonesDisponibles: camion.galonesDisponibles,
            consumoTotal: camion.consumoTotal,
            pedidoActual: arrPedidos.length > 0 ? arrPedidos[0].idCliente : '-',
            //quiero un arreglo de pedidos
            arrPedidos: arrPedidos,

        };

    });

/*
    useEffect(() => {
        fetch('http://localhost:8090/sag-genetico/api/camiones/initial')
            .then((response) => response.json())
            .then((data) => setCamiones(data))
            .catch((error) => console.error('Error al obtener datos de camiones:', error));
    }, []);
*/


/*
    // Función para filtrar los camiones según el texto y la opción seleccionada
    const camionesFiltrados = camiones.filter(camion => {
        // Filtrar por texto
        const textoCoincide = camion.idCamion.toString().includes(filtroTexto);
        // Filtrar por opción
        const opcionCoincide = (filtroOpcion === 'Todos' || camion.estado === filtroOpcion);
        return textoCoincide && opcionCoincide;
    });
*/
    return (
        <div>

            {/* <PruebaWs/> */}
            {/* <WebSocketComponent onSimulacionData={handleWebSocketMessage}/> */}
            <h1 className="titulo">Detalle de flota</h1>

            <div className="barra-busqueda">
                {/* Barra de búsqueda de texto */}
                <div className="texto-busqueda">Búsqueda por camión:</div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Buscar por ID de camión"
                        value={filtroTexto}
                        onChange={(e) => setFiltroTexto(e.target.value)}
                    />

                </InputGroup>
                {/* Menú desplegable para filtrar por estado */}
                <div className="texto-busqueda"> Filtrado por estado:</div>
                <DropdownButton className="dropdown-busqueda" id="dropdown-basic-button" title={filtroOpcion}>
                    <Dropdown.Item onClick={() => setFiltroOpcion('Todos')}>Todos</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('En mantenimiento')}>En mantenimiento</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('En uso')}>En uso</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('Libre')}>Libre</Dropdown.Item>
                </DropdownButton>

            </div>

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
                {nuevoArreglo && nuevoArreglo.map((camion) => (
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

export default Camiones;
