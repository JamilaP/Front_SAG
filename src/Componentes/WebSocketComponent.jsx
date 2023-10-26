import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

function WebSocketComponent({ onSimulacionData }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [sClient, setSClient] = useState();
    const [actualizar, setActualizar] = useState(false);

    const onConnectSocket = () => {
        sClient.subscribe('/topic/simulation-progress', (mensaje) => {
            console.log('Mensaje recibido:',mensaje);
            // mostrarMensaje(mensaje.body);
            // Llamar a onSimulacionData con los datos recibidos
            // if (onSimulacionData) {
            //     onSimulacionData(mensaje.body);
            // }
        });
        sClient.onStompError = (frame) => {
            console.log('Stomp Error : ', frame);
        };
    };

    const onWebSocketClose = () => {
        console.log('WebSocket connection close');
        if (sClient !== null) {
            sClient.deactivate();
        }
    };

    const conectarWS = () => {
        const stompClient = new Client();
        setSClient(stompClient);
        //onWebSocketClose();
        console.log('Connecting to WebSocket...');
        stompClient.configure({
            webSocketFactory: () => new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint')
        });
        stompClient.onConnect = onConnectSocket;
        stompClient.onWebSocketClose = onWebSocketClose;
        stompClient.activate();
        // console.log(sClient);
    };

    const enviarMensaje = () => {
        console.log(sClient);
        if (sClient.connected) {
            sClient.publish({
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
        // console.log('Mensaje recibido:',mensaje);
        console.log('Mensaje recibido:');
        // Implementa cómo deseas mostrar los mensajes en tu componente React
        // Puedes utilizar el estado para actualizar la interfaz de usuario.
    };

    useEffect(() => {
        conectarWS();
        if(sClient.connected) console.log('Conectado');
    }, []);

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
