import {Button} from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import "./ModalColapso.css"
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef } from "react";

const ModalFinSemanal = ({ mensaje = "", isOpen = false, closeModal, exito = true,reporteData}) => {
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
                    <div className="encabezado">
                        <BsCheckCircle color="#008768" fontSize={"50px"} />
                        <div className="texto-titulo">Se terminó la simualción semanal</div>
                    </div>
                    <hr></hr>
                    <div className="reporte-data">
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Fecha inicio: </div>
                            <div className="data-reporte">{reporteData.currentDateTime}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Fecha fin: </div>
                            <div className="data-reporte">{reporteData.currentDateTime}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Número de pedidos atendidos: </div>
                            <div className="data-reporte">{reporteData.currentDateTime}</div>
                        </div>
                    </div>
                    <div className="botones">
                        <Button className="boton-aceptar" onClick={() => closeModal()}>Aceptar</Button>
                    </div>
                </div>

            </div>
        </CSSTransition>
    );
};

export default ModalFinSemanal;