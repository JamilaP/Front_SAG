import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";
import './PedidosSimulacion.css'
function PedidosSimulacion(props) {
    const { data } = props ; // Destructura la propiedad data
    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable

    useEffect(() => {
        //console.log('data pedidos: ', data);
        //console.log('arreglo de pedidos',nuevoArreglo);
    }, [data]);

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        console.log('No hay datos para procesar en pedidos');
        return;
    }

    const nuevoArreglo = data.map(pedido => {
        return {
            fechaRegistro: pedido.fechaRegistro.second,
            idCliente: pedido.idCliente,
            cantidadGLP: pedido.cantidadGLP,
            horasLimite: pedido.horasLimite,
            ubicacion:`(${pedido.ubicacion.x},${pedido.ubicacion.y})`,
        };
    });
    // Función para filtrar los pedidos según los filtros aplicados
   /* const pedidosFiltrados = pedidos.filter(pedido => {
        const coincideIDPedido = pedido.idPedido.toString().includes(filtroIDPedido);
        const coincideIDCliente = pedido.idCliente.toString().includes(filtroIDCliente);
        const coincideOpcion = (filtroOpcion === 'Todos' || pedido.estado === filtroOpcion);

        return coincideIDPedido && coincideIDCliente && coincideOpcion;
    });*/

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
                {nuevoArreglo.map((pedido,index) => (
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

export default PedidosSimulacion;