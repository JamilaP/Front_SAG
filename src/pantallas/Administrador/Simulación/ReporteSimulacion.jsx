import React, { useState, useEffect } from 'react';

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
            <div>
                <p>Fecha de simulación: {fechaSimulacion.toLocaleString()}</p>
                <p>Días transcurridos: {diasTranscurridos}</p>
                <p>Porcentaje de flota ocupada: {flotaOcupada.toFixed(2)}%</p>
                <p>Pedidos atendidos: {pedidosAtendidos}</p>
                <p>Pedidos pendientes: {pedidosPendientes}</p>
            </div>
        </div>
    );
}

export default ReporteSimulacion;
