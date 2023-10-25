import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

function WebSocketComponent({ onSimulacionData }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const stompClient = new Client();
    const [actualizar, setActualizar] = useState(false);

    const onConnectSocket = () => {
        stompClient.subscribe('/topic/simulation-progress', (mensaje) => {
            mostrarMensaje(mensaje.body);
        });
        stompClient.onStompError = (frame) => {
            console.log('Stomp Error : ', frame);
        };
    };

    const onWebSocketClose = () => {
        console.log('WebSocket connection closed');
        if (stompClient !== null) {
            stompClient.deactivate();
        }
    };
    const conectarWS = () => {
        //onWebSocketClose();
        console.log('Connecting to WebSocket...');
        stompClient.configure({
            webSocketFactory: () => new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint')
        });
        stompClient.onConnect = onConnectSocket;
        //stompClient.onWebSocketClose = onWebSocketClose;
        stompClient.activate();
    };

    const enviarMensaje = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/simulacion-semanal',
                body: JSON.stringify({
                    nombre: inputMessage,
                    contenido: inputMessage
                })
            });
            console.log('Mensaje enviado');
        } else {
            console.log("No se pudo enviar el mensaje");
        }
    };

    const mostrarMensaje = (mensaje) => {
        console.log('Mensaje recibido:',mensaje);
        // Implementa cómo deseas mostrar los mensajes en tu componente React
        // Puedes utilizar el estado para actualizar la interfaz de usuario.
    };

    useEffect(() => {
        conectarWS();
    }, [actualizar]);

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={() => { enviarMensaje(); setActualizar((prevActualizar) => !prevActualizar); }}>Enviar Mensaje</button>
            </div>
            <div>
                <h2>Mensajes recibidos:</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
            <div>
                {/* Resto del contenido del componente */}
            </div>
        </div>
    );
}

export default WebSocketComponent;
