import { IoClose } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./ModalPedidosCamiones.css"

import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import {Button, Table} from "react-bootstrap";

const ModalPedidosCamiones = ({ isOpen = false, closeModal, id,data }) => {
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

    useEffect(() => {
        // console.log('data glp: ', data);
    }, [data]);

    // Verifica si data es un arreglo válido antes de mapearlo
    if (!data || data.length === 0) {
        // console.log('No hay datos para procesar');
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
                        <h2><IoDocumentTextOutline className="IconTitulo" style={{fontSize: "30px"}}>
                        </IoDocumentTextOutline>Detalle de Camiones | Pedido {id}:</h2>
                    </div>
                    <hr></hr>
                    <br></br>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Camión</th>
                            <th>GLP a entregar</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((camion) => (
                            <tr key={camion.idCamion}>
                                <td>{camion.idCamion}</td>
                                <td>{camion.GLPentregar}</td>
                                <td>{camion.estado}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ModalPedidosCamiones;