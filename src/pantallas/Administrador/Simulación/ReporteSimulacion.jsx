import React, { useState, useEffect } from 'react';
import './ReporteSimulacion.css';
import {AiFillClockCircle} from 'react-icons/ai';
import {BiSolidTruck,BiSolidCalendarCheck} from 'react-icons/bi';
import {PiNotebookFill} from 'react-icons/pi';
import {TbNotebookOff} from 'react-icons/tb';

function ReporteSimulacion() {
    const [fechaSimulacion, setFechaSimulacion] = useState(new Date());
    const [diasTranscurridos, setDiasTranscurridos] = useState(0);
    const [flotaOcupada, setFlotaOcupada] = useState(0);
    const [pedidosAtendidos, setPedidosAtendidos] = useState(0);
    const [pedidosPendientes, setPedidosPendientes] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Actualiza la fecha de simulación cada segundo
            setFechaSimulacion(new Date());

            // Calcula los días transcurridos
            const tiempoTranscurrido = (new Date() - fechaInicial); //cambiar
            setDiasTranscurridos(tiempoTranscurrido);

            // Simulación de cambios aleatorios para el porcentaje de flota ocupada, pedidos atendidos y pendientes
            const nuevoPorcentajeFlota = Math.random() * 100;
            const nuevosPedidosAtendidos = Math.floor(Math.random() * 50);
            const nuevosPedidosPendientes = Math.floor(Math.random() * 50);
            setFlotaOcupada(nuevoPorcentajeFlota);
            setPedidosAtendidos(nuevosPedidosAtendidos);
            setPedidosPendientes(nuevosPedidosPendientes);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const fechaInicial = new Date(); // Fecha de inicio

    return (
        <div>
            <h1 className="titulo">Reporte de simulación</h1>
            <div className="contenedor-2">
                <div className="grupo"><BiSolidCalendarCheck className="icono"></BiSolidCalendarCheck><p>Fecha de simulación: {fechaSimulacion.toLocaleString()}</p></div>
                <div className="grupo"><AiFillClockCircle className="icono"> </AiFillClockCircle> <p>Días transcurridos: {diasTranscurridos}</p></div>
                <div className="grupo"><BiSolidTruck className="icono"></BiSolidTruck><p>Porcentaje de flota ocupada: {flotaOcupada.toFixed(2)}%</p></div>
                <div className="grupo"><PiNotebookFill className="icono"></PiNotebookFill><p>Pedidos atendidos: {pedidosAtendidos}</p></div>
                <div className="grupo"><TbNotebookOff className="icono"></TbNotebookOff><p>Pedidos pendientes: {pedidosPendientes}</p></div>
            </div>
        </div>
    );
}

export default ReporteSimulacion;
