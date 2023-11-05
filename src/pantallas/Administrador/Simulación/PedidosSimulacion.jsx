import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";
import './PedidosSimulacion.css'
import ModalPedidosCamiones from "../../../Componentes/ModalPedidosCamiones";
function PedidosSimulacion(props) {
    const { data } = props ; // Destructura la propiedad data
    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable

    const [mostrandoPedidoCamiones, setMostrandoPedidoCamiones] = useState(null);
    const [idPedido, setIdPedido] = useState(null);
    let nuevoArreglo;


    useEffect(() => {
        //console.log('data pedidos: ', data);
        //console.log('arreglo de pedidos',nuevoArreglo);
    }, [data]);

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        console.log('No hay datos para procesar en pedidos');
        nuevoArreglo = [];
    }else{
        nuevoArreglo = data.map(pedido => {
            //falta el arreglo de camiones por pedido
            return {
                idPedido: 1,
                fechaRegistro: pedido.fechaRegistro.second,
                idCliente: pedido.idCliente,
                cantidadGLP: pedido.cantidadGLP,
                horasLimite: pedido.horasLimite,
                ubicacion:`(${pedido.ubicacion.x},${pedido.ubicacion.y})`,
            };
        });
    }

    // Función para filtrar los pedidos según los filtros aplicados
   const pedidosFiltrados = nuevoArreglo.filter(pedido => {
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
                    <Dropdown.Item onClick={() => setFiltroOpcion('DISPONIBLE')}>DISPONIBLE</Dropdown.Item>
                    <Dropdown.Item onClick={() => setFiltroOpcion('MANTENIMIENTO')}>MANTENIMIENTO</Dropdown.Item>
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
                    <th>Camiones</th>
                </tr>
                </thead>
                <tbody>
                {pedidosFiltrados && pedidosFiltrados.length > 0 ? (
                pedidosFiltrados.map((pedido,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{pedido.idCliente}</td>
                        <td>{pedido.ubicacion}</td>
                        <td>{pedido.fechaRegistro}</td>
                        <td>{pedido.horasLimite}</td>
                        <td>{pedido.cantidadGLP}</td>
                        <td>
                            {/*<Button variant="primary" disabled={pedido.arrCamiones.length === 0}
                                    onClick={() => {setMostrandoPedidoCamiones(pedido.arrCamiones);setIdPedido(pedido.idPedido)}}
                            >Ver</Button>
                            <ModalPedidosCamiones
                                isOpen={mostrandoPedidoCamiones !== null}
                                closeModal={() => setMostrandoPedidoCamiones(null)}
                                id={idPedido}
                                data={mostrandoPedidoCamiones}
                            />*/}
                            <Button variant="primary">Ver</Button>
                        </td>
                    </tr>
                ))
                ) : (
                    <tr>
                        <td colSpan="8">No hay pedidos.</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default PedidosSimulacion;