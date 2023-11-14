import {Button} from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
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
                    <div className="close-container">
                        {/*<IoClose className="close-icon"
                                 onClick={() => closeModal()} fontSize={"40"}
                                 style={{ cursor: "pointer" }}>
                        </IoClose>*/}
                    </div>
                    {exito ?
                        (<BsCheckCircle color="#008768"  fontSize={"60px"} />) :
                        (<BsXCircle color="#E2284D" fontSize={"60px"} />)
                    }
                    <h2>{mensaje}</h2>
                    <hr></hr>
                    <div className="botones">
                        <Button className="boton-aceptar" onClick={() => closeModal()}>Aceptar</Button>
                    </div>
                </div>

            </div>
        </CSSTransition>
    );
};

export default ModalResultado;