import React, {useEffect, useState} from 'react';
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";
import './PedidosSimulacion.css'
import ModalPedidosCamiones from "../../../Componentes/ModalPedidosCamiones";

function PedidosSimulacion(props) {
    const {data} = props; // Destructura la propiedad data
    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable
    const [mostrandoPedidoCamiones, setMostrandoPedidoCamiones] = useState(null);
    const [idPedido, setIdPedido] = useState(null);
    let nuevoArreglo;


    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        // console.log('No hay datos para procesar en pedidos');
        nuevoArreglo = [];
    } else {
        nuevoArreglo = data.map(pedido => {
            const fechaRegistro = new Date(pedido.order.registrationDateTime);
            let arrCamiones = [];
            if (pedido.truckAssignments && pedido.truckAssignments.length > 0) {
                arrCamiones = pedido.truckAssignments.map(camion => ({
                    idCamion: camion.truck.truckId,
                    GLPentregar: camion.allocatedAmount,//VERIFICAR
                    estado: camion.truck.isAttended ? "Atendido" : "En camino",//VERIFICAR

                }));
            }
            //falta el arreglo de camiones por pedido
            return {
                idPedido: pedido.order.orderId,
                fechaRegistro: fechaRegistro.toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }),
                idCliente: pedido.order.customerId,
                cantidadGLP: pedido.order.requestedGLP,
                horasLimite: pedido.order.deadlineHours,
                ubicacion: `(${pedido.order.location.x},${pedido.order.location.y})`,
                arrCamiones: arrCamiones,
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
        <div className="pedidos">

            <div className="barra-busqueda">

                <div className="grupo-texto-input">
                    <div className="texto-busqueda">Búsqueda por pedido:</div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar por ID de pedido"
                            value={filtroIDPedido}
                            onChange={(e) => setFiltroIDPedido(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="grupo-texto-input">
                    <div className="texto-busqueda">Búsqueda por cliente:</div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar por ID de cliente"
                            value={filtroIDCliente}
                            onChange={(e) => setFiltroIDCliente(e.target.value)}
                        />
                    </InputGroup>
                </div>

            </div>

            <Table striped bordered hover className="tabla">
                <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>ID Cliente</th>
                    <th>Ubicación</th>
                    <th>Fecha solicitada</th>
                    <th>Plazo (horas)</th>
                    <th>GLP solicitado(m3)</th>
                    <th>Camiones</th>
                </tr>
                </thead>
                <tbody>
                {pedidosFiltrados && pedidosFiltrados.length > 0 ? (
                    pedidosFiltrados.map((pedido, index) => (
                        <tr key={pedido.idPedido}>
                            <td>{pedido.idPedido}</td>
                            <td>{pedido.idCliente}</td>
                            <td>{pedido.ubicacion}</td>
                            <td>{pedido.fechaRegistro}</td>
                            <td>{pedido.horasLimite}</td>
                            <td>{pedido.cantidadGLP}</td>
                            <td>
                                <Button variant="primary" className="boton-ver"
                                        disabled={pedido.arrCamiones.length === 0}
                                        onClick={() => {
                                            setMostrandoPedidoCamiones(pedido.arrCamiones);
                                            setIdPedido(pedido.idPedido)
                                        }}
                                >Ver</Button>
                                <ModalPedidosCamiones
                                    isOpen={mostrandoPedidoCamiones !== null}
                                    closeModal={() => setMostrandoPedidoCamiones(null)}
                                    id={idPedido}
                                    data={mostrandoPedidoCamiones}
                                />
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