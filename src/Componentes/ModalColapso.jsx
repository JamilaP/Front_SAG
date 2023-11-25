import {Button} from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import "./ModalResultado.css"
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef } from "react";

const ModalResultado = ({ mensaje = "", isOpen = false, closeModal, exito = true }) => {
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
    return (
        <CSSTransition
            in={isOpen}
            timeout={100}
            classNames="modal-container"
            unmountOnExit
        >
            <div className={`modal-container ${!isOpen ? "closing" : ""} `} >
                <div className={`modal-custom-res ${!isOpen ? "closing" : ""}`} ref={modalRef}>
                    <IoWarning color="#008768"  fontSize={"40px"} />
                    <hr></hr>
                    Ocurrio el colapso logitico
                    Fecha de colapso: 10/01/2023 03:04:12
                    Pedido que no se logro atender: c-200
                    Tiempo de duración de la silumación: 10:00:00
                    Número de pedidos atendidos: 200

                    <div className="botones">
                        <Button className="boton-aceptar" onClick={() => closeModal()}>Aceptar</Button>
                    </div>
                </div>

            </div>
        </CSSTransition>
    );
};

export default ModalResultado;