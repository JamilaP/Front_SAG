import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";

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

function PedidosSimulacion(props) {
    const { data } = props.data; // Destructura la propiedad data
    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable

    useEffect(() => {
        console.log('data pedidos: ', data);
        //console.log('arreglo de pedidos',nuevoArreglo);
    }, [data]);

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        console.log('No hay datos para procesar');
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
            {console.log('Escena de pedidos mover ', props.data, 'Nro ', props.index)}
            { props.data && props.data.length > 0 ?
                (props.setIndex())
                :
                (console.log('No se puede mover pedidos'))
            }
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
                {nuevoArreglo.map((camion,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{camion.arrPedidos.length > 0 ? camion.arrPedidos[0].idCliente : '-'}</td>
                        <td>{camion.arrPedidos.length > 0 ? camion.arrPedidos[0].ubicacion : '-'}</td>
                        <td>{camion.arrPedidos.length > 0 ? camion.arrPedidos[0].fechaRegistro : '-'}</td>
                        <td>{camion.arrPedidos.length > 0 ? camion.arrPedidos[0].horasLimite : '-'}</td>
                        <td>{camion.arrPedidos.length > 0 ? camion.arrPedidos[0].cantidadGLP : '-'}</td>
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

export default PedidosSimulacion;