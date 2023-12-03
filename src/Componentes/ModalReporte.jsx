import {Button, Table} from 'react-bootstrap';
import {IoClose, IoDocumentTextOutline} from "react-icons/io5";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import "./ModalReporte.css"
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useRef } from "react";

const ModalReporte = ({ mensaje = "", isOpen = false, closeModal, exito = true,data}) => {
    const modalRef = useRef(null);
    let nuevoArreglo;

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        // console.log('No hay datos para procesar');
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
                        GPLaEntregar: pedido.allocatedAmount,
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
    const manejoClickAfuera = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', manejoClickAfuera);
        return () => {
            document.removeEventListener('mousedown', manejoClickAfuera);
        };
    }, [closeModal]);

    return (
        <CSSTransition
            in={isOpen}
            timeout={100}
            classNames="modal-container"
            unmountOnExit
        >
            <div className={`ModalRubrica-modal-container ${!isOpen ? "ModalRubrica-closing" : ""}`} >
                <div className={`ModalRubrica-modal-custom-res ${!isOpen ? "closing" : ""}`} ref={modalRef}>

                    <div className="ModalRubrica-tituloGeneral">
                        <h2><IoDocumentTextOutline className="IconTitulo" style={{fontSize: "30px"}}></IoDocumentTextOutline>Reporte de la última planificación:</h2>
                    </div>
                    <hr></hr>
                    <br></br>

                    <Table striped bordered hover className="tabla-reporte">
                        <thead>
                        <tr>
                            <th>Camión</th>
                            <th>Carga actual / Capacidad (GLP-m3)</th>
                            <th>Combustible usado (galón)</th>
                            <th>Nro. pedidos asignados</th>
                            <th>Pedidos que estaba atendiendo</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody data-bs-search-live="true">
                        {nuevoArreglo && nuevoArreglo.length > 0 ? (
                            nuevoArreglo.map((camion) => (
                                <tr key={camion.id}>
                                    <td>{camion.id}</td>
                                    <td>{camion.cargaActual}/{camion.cargaMaxima}</td>
                                    <td>{camion.consumoTotal}</td>
                                    <td>{camion.pedidos}</td>
                                    <td>{camion.pedidoActual}</td>
                                    <td>{camion.estado === 'EN_MANTENIMIENTO' ? "En mantenimiento" : camion.pedidos === 0 ? "Recargando" : "Atendiendo"}</td>
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
            </div>
        </CSSTransition>
    );
};

export default ModalReporte;