import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";
import ModalCamionPedidos from "../../../Componentes/ModalCamionPedidos";
import ModalPedidosCamiones from "../../../Componentes/ModalPedidosCamiones";

const pedidos = [
    {
        idPedido: 10,
        idCliente: "c-38",
        ubicacion: "(8,9)",
        fechaRegistro: "2023-11-02 00:26:00",
        horasLimite: "5",
        cantidadGLP: 5,
        estado: "Entregado",
        arrCamiones: [
            {
                idCamion: "TA01",
                cantidadGLP: 5,
                ruta:"(10,50) -> (10,40) -> (10,30) -> (10,20) -> (10,10) -> (10,0)->(10,50) -> (10,40) -> (10,30) -> " +
                    "(10,20) -> (10,10) -> (10,0) -> (10,50) -> (10,40) -> (10,30) -> (10,20) -> (10,10) -> (10,0)",
                estado: "En camino",
            },
            {
                idCamion: "TA02",
                cantidadGLP: 10,
                ruta:"(10,50) -> (10,40) -> (10,30) -> (10,20) -> (10,10) -> (10,0)",
                estado: "En camino",
            },
            {
                idCamion: "TA03",
                cantidadGLP: 20,
                ruta:"(10,50) -> (10,40) -> (10,30) -> (10,20) -> (10,10) -> (10,0)",
                estado: "Entregado",
            },
        ],
    },
    {
        idPedido: 11,
        idCliente: "c-48",
        ubicacion: "(11,9)",
        fechaRegistro: "2023-11-03 00:46:00",
        horasLimite: "4",
        cantidadGLP: 7,
        estado: "Entregado",
        arrCamiones: [
            {
                idCamion: "TB01",
                cantidadGLP: 15,
                ruta:"(10,50) -> (10,40) -> (10,30) -> (10,20) -> (10,10) -> (10,0)",
                estado: "En camino",
            },
            {
                idCamion: "TB02",
                cantidadGLP: 10,
                ruta:"(10,50) -> (10,40) -> (10,30) -> (10,20) -> (10,10) -> (10,0)",
                estado: "En camino",
            },
        ],
    },
    {
        idPedido: 12,
        idCliente: "c-190",
        ubicacion: "(12,9)",
        fechaRegistro: "2023-11-04 00:56:00",
        horasLimite: "8",
        cantidadGLP: 10,
        estado: "No Entregado",
        arrCamiones: [],
    },
];

function PedidosOD() {
    const [mostrandoPedidoCamiones, setMostrandoPedidoCamiones] = useState(null);
    const [idPedido, setIdPedido] = useState(null);

    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable

    const pedidosFiltrados = pedidos.filter(pedido => {
        // Filtrar por texto
        const coincideIDPedido = pedido.idPedido.toString().includes(filtroIDPedido);
        const coincideIDCliente = pedido.idCliente.toString().includes(filtroIDCliente);
        // Filtrar por opción
        const coincideOpcion = (filtroOpcion === 'Todos' || pedido.estado === filtroOpcion);

        return coincideIDPedido && coincideIDCliente && coincideOpcion;
    });

    return (
        <div>
            <h1 className="titulo">Detalle de pedidos</h1>

            <div className="barra-busqueda">
                {/* Barra de búsqueda de texto */}
                <div className="texto-busqueda">Búsqueda por pedido:</div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Buscar por ID de pedido"
                        value={filtroIDPedido}
                        onChange={(e) => setFiltroIDPedido(e.target.value)}
                    />

                </InputGroup>
                <div className="texto-busqueda">Búsqueda por pedido:</div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Buscar por ID de cliente"
                        value={filtroIDCliente}
                        onChange={(e) => setFiltroIDCliente(e.target.value)}
                    />

                </InputGroup>
                {/* Menú desplegable para filtrar por estado */}
                <div className="texto-busqueda"> Filtrado por estado:</div>
                <DropdownButton className="dropdown-busqueda" id="dropdown-basic-button" title={filtroOpcion}>
                    <Dropdown.Item onClick={() => setFiltroOpcion('Todos')}>Todos</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('Entregado')}>Entregado</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('No Entregado')}>No Entregado</Dropdown.Item>
                </DropdownButton>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Id-cliente</th>
                    <th>Ubicación</th>
                    <th>Fecha y hora de llegada solicitada</th>
                    <th>Plazo (horas)</th>
                    <th>Cantidad de GLP solicitado (m3)</th>
                    <th>Estado</th>
                    <th>Camiones</th>
                </tr>
                </thead>
                <tbody>
                {pedidosFiltrados && pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.idPedido}>
                        <td>{pedido.idPedido}</td>
                        <td>{pedido.idCliente}</td>
                        <td>{pedido.ubicacion}</td>
                        <td>{pedido.fechaRegistro}</td>
                        <td>{pedido.horasLimite}</td>
                        <td>{pedido.cantidadGLP}</td>
                        <td>{pedido.estado}</td>
                        <td>
                            <Button className="my-boton" disabled={pedido.arrCamiones.length === 0}
                                    onClick={() => {setMostrandoPedidoCamiones(pedido.arrCamiones);setIdPedido(pedido.idPedido)}}
                            >Ver</Button>
                            <ModalPedidosCamiones
                                isOpen={mostrandoPedidoCamiones !== null}
                                closeModal={() => setMostrandoPedidoCamiones(null)}
                                id={idPedido}
                                data={mostrandoPedidoCamiones}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PedidosOD;