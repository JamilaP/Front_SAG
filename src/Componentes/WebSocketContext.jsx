import React, { createContext, useContext, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {

    const conectarWS = () => {
        const conexion = new Client();

        try {
            conexion.configure({
                webSocketFactory: () => new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint'),
            });
        } catch (error) {
            console.log('No se pudo conectar', error);
        }

        conexion.onConnect = () => {
            console.log('WebSocket conectado');
            // Realiza acciones adicionales después de la conexión, si es necesario
        };

        conexion.onWebSocketClose = () => {
            console.log('WebSocket connection close');
            // Reconectar en caso de cierre, si es necesario
            if (conexion !== null) {
                conexion.activate();
            }
        };

        conexion.activate();

        return conexion;
    };
    let conexion = conectarWS();

    const enviarMensaje = (formatoHoraActual) => {
        if (conexion && formatoHoraActual) {
            console.log('CUMPLE CON TODO');
            if (conexion.connected) {
                try {
                    conexion.publish({
                        destination: '/app/daily-operations',
                        headers: {
                            'start_date': formatoHoraActual,
                        },
                        body: 'hola'
                    });
                } catch (error) {
                    console.log('No se envió el mensaje', error);
                }
            }
            console.log('Mensaje enviado');
        } else {
            console.log("No se pudo enviar el mensaje");
            //if (!formatoHoraActual) setModal(e => ({...e, text: "Debe ingresar una fecha ", exito: false, open: true}));
           // if (!conexion) setModal(e => ({
           //     ...e,
           //     text: "Recuerde seleccionar el tipo de visualización",
            //    exito: false,
            //    open: true
            //}));
        }
    };



    useEffect(() => {
        return () => {
            if (conexion) {
                conexion.deactivate();
            }
        };
    }, [conexion]);



    return (
        <WebSocketContext.Provider value={{ conexion, enviarMensaje }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
