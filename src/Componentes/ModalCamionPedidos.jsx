import { IoClose } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./ModalCamionPedidos.css"

import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import {Button, Table} from "react-bootstrap";

const ModalCamioneedidos = ({ isOpen = false, closeModal, camion,data }) => {
    const modalRef = useRef(null);
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

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        console.log('No hay datos para procesar');
        return;
    }
    return (
        <CSSTransition
            in={isOpen}
            timeout={100}
            classNames="modal-container"
            unmountOnExit
        >
            <div className={`ModalRubrica-modal-container ${!isOpen ? "ModalRubrica-closing" : ""}`} >
                <div className={`ModalRubrica-modal-custom-res ${!isOpen ? "closing" : ""}`} ref={modalRef}>
                    <div className="ModalRubrica-close-container">
                        <IoClose className="ModalRubrica-close-icon"
                                 onClick={() => closeModal()} fontSize={"40"}
                                 style={{ cursor: "pointer" }}>
                        </IoClose>
                    </div>
                    <div className="ModalRubrica-tituloGeneral">
                        <h2><IoDocumentTextOutline className="IconTitulo" style={{fontSize: "30px"}}></IoDocumentTextOutline>Detalle Pedidos del Camión {camion}:</h2>
                    </div>
                    <hr></hr>
                    <br></br>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Id-cliente</th>
                            <th>Ubicación</th>
                            <th>Fecha y hora de llegada solicitada</th>
                            <th>Plazo (horas)</th>
                            <th>Cantidad de GLP solicitado (m3)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((pedido) => (
                            <tr key={pedido.idPedido}>
                                <td>{pedido.idPedido}</td>
                                <td>{pedido.idCliente}</td>
                                <td>{pedido.ubicacion}</td>
                                <td>{pedido.fechaRegistro}</td>
                                <td>{pedido.fechaLlegada}</td>
                                <td>{pedido.estado}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ModalCamioneedidos;