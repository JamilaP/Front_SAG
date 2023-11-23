import React, {useState, useEffect} from 'react';
import {Button, Table, InputGroup, FormControl} from "react-bootstrap";
import "./Camiones.css";
import ModalCamionPedidos from "../../../Componentes/ModalCamionPedidos";

function Camiones(props) {

    const {data} = props || {data: null}; // Destructura la propiedad data
    const [filtroTexto, setFiltroTexto] = useState(''); // Estado para el filtro de texto
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro de opciones

    const [mostrandoCamionesPedidos, setMostrandoCamionesPedidos] = useState(null);
    const [idCamion, setIdCamion] = useState(null);
    let nuevoArreglo;

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        console.log('No hay datos para procesar');
        nuevoArreglo = [];
    } else {
        nuevoArreglo = data.map(camion => {
            let arrPedidos = [];
            if (camion.orders && camion.orders.length > 0) {
                arrPedidos = camion.orders.map(pedido => {
                    const fechaRegistro = new Date(pedido.order.registrationDateTime);
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
                        GPLaEntregar: pedido.order.allocatedAmount,
                        ubicacion: `(${pedido.order.location.x},${pedido.order.location.y})`,
                        GLPSolicitado: pedido.order.requestedGLP,
                    };
                });
            }

            return {
                id: camion.truckId,
                cargaActual: camion.currentLoad,
                cargaMaxima: camion.maximumLoad,
                pedidos: arrPedidos.length,
                estado: camion.status,
                galonesDisponibles: camion.tankAvailability,
                consumoTotal: camion.totalConsumption.toFixed(2),
                pedidoActual: arrPedidos.length > 0 ? arrPedidos[0].idCliente : '-',
                arrPedidos: arrPedidos,
            };
        });
    }

    // Función para filtrar los camiones según el texto y la opción seleccionada
    const camionesFiltrados = nuevoArreglo.filter(camion => {
        // Filtrar por texto
        const textoCoincide = camion.id.toString().includes(filtroTexto);
        // Filtrar por opción
        const opcionCoincide = (filtroOpcion === 'Todos' || camion.estado === filtroOpcion);
        return textoCoincide && opcionCoincide;
    });

    return (
        <div className="camiones">

            <div className="barra-busqueda">
                <div className="grupo-texto-input">
                    <div className="texto-busqueda">Búsqueda por camión:</div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar por ID de camión"
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                        />
                    </InputGroup>
                </div>
            </div>

            <Table striped bordered hover className="tabla">
                <thead>
                <tr>
                    <th>Camión</th>
                    <th>Carga actual / Capacidad (GLP-m3)</th>
                    <th>Combustible usado (galón)</th>
                    <th>Nro. pedidos asignados</th>
                    <th>Pedidos Actual</th>
                    <th>Pedidos Asociados</th>
                </tr>
                </thead>
                <tbody data-bs-search-live="true">
                {camionesFiltrados && camionesFiltrados.length > 0 ? (
                    camionesFiltrados.map((camion) => (
                        <tr key={camion.id} className={camion.estado === 'MANTENIMIENTO' ? 'camion-en-mantenimiento' : ''}>
                            <td>{camion.id}</td>
                            <td>{camion.cargaActual}/{camion.cargaMaxima}</td>
                            <td>{camion.consumoTotal}</td>
                            <td>{camion.pedidos}</td>
                            <td>{camion.pedidoActual}</td>
                            <td>
                                <Button className="boton-ver" disabled={camion.arrPedidos.length === 0}
                                        onClick={() => {
                                            setMostrandoCamionesPedidos(camion.arrPedidos);
                                            setIdCamion(camion.id)
                                        }}
                                >Ver</Button>
                                <ModalCamionPedidos
                                    isOpen={mostrandoCamionesPedidos !== null}
                                    closeModal={() => setMostrandoCamionesPedidos(null)}
                                    camion={idCamion}
                                    data={mostrandoCamionesPedidos}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8">No hay camiones.</td>
                    </tr>
                )}
                </tbody>
            </Table>


        </div>
    );
}

export default Camiones;
