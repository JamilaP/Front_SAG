import {Button} from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import "./ModalColapso.css"
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef } from "react";

const ModalColapso = ({ mensaje = "", isOpen = false, closeModal, exito = true,reporteData,startDate}) => {
    const modalRef = useRef(null);
    const manejoClickAfuera = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };
    const calcularDuracionSimulacion = () => {
        const fechaInicio = new Date(`${startDate}T00:00:00`);
        const fechaFin = new Date(reporteData.currentDateTime);

        const diferencia = fechaFin - fechaInicio;
        const segundos = Math.floor(diferencia / 1000);

        const dias = Math.floor(segundos / (3600 * 24));
        const horas = Math.floor((segundos % (3600 * 24)) / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;

        return `${dias} días ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
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
            <div className={`modal-container ${!isOpen ? "closing" : ""} `} >
                <div className={`modal-custom-res ${!isOpen ? "closing" : ""}`} ref={modalRef}>
                    <div className="encabezado">
                        <IoWarning color="#FFCB00" fontSize={"50px"} />
                        <div className="texto-titulo">Ocurrió el colapso lógistico</div>
                    </div>
                    <hr></hr>
                    <div className="reporte-data">
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Fecha de colapso: </div>
                            <div className="data-reporte">{transformarFecha(reporteData.currentDateTime,0)}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Cliente que no se logró atender: </div>
                            <div className="data-reporte">{reporteData.orders && reporteData.orders[0] && reporteData.orders[0].order && reporteData.orders[0].order.customerId}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Tiempo de duración de la simulación: </div>
                            <div className="data-reporte">{calcularDuracionSimulacion()}</div>
                        </div>
                        <div className="texto-reporte">
                            <div className="enunciado-reporte">Número de pedidos atendidos: </div>
                            <div className="data-reporte">{reporteData.fulfilledOrdersNumber}</div>
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

export default ModalColapso;