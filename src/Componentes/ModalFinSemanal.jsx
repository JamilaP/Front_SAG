import {Button} from 'react-bootstrap';
import {IoClose} from "react-icons/io5";
import {BsCheckCircle, BsXCircle} from "react-icons/bs";
import {IoWarning} from "react-icons/io5";
import "./ModalColapso.css"
import {CSSTransition} from "react-transition-group";
import {useEffect, useRef} from "react";

const ModalFinSemanal = ({mensaje = "", isOpen = false, closeModal, exito = true, reporteData, startDate}) => {
    const modalRef = useRef(null);
    const manejoClickAfuera = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };
    const transformarFecha = (date,soloFechas) => {
        let dateObj;
        if(soloFechas==1) { dateObj = new Date(`${date}T00:00:00`);}
        else { dateObj = new Date(date);}

        // Obtiene las partes de la fecha
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        const seconds = dateObj.getSeconds().toString().padStart(2, '0');

        return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
    }

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
            <div className={`modal-container ${!isOpen ? "closing" : ""} `}>
                <div className={`modal-custom-res ${!isOpen ? "closing" : ""}`} ref={modalRef}>
                    <div className="encabezado">
                        <BsCheckCircle color="#008768" fontSize={"50px"} />
                        <div className="texto-titulo">Se terminó la simualción semanal</div>
                    </div>
                    <hr></hr>
                    <div className="reporte-data">
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Fecha inicio:</div>
                            <div className="data-reporte-fechas">{transformarFecha(startDate,1)}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Fecha fin:</div>
                            <div className="data-reporte-fechas">{transformarFecha(reporteData.currentDateTime,0)}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Número de pedidos atendidos:</div>
                            <div className="data-reporte-fechas">{reporteData.fulfilledOrdersNumber}</div>
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