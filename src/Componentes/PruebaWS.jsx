import React, { useState, useEffect } from 'react';

const WebSocketComponent = () => {
  const [webSocket, setWebSocket] = useState(null);

  const onWebSocketMessage = (event) => {
    console.log('Se ha enviado un mensaje');
    const mensaje = JSON.parse(event.data);
    mostrarMensaje(mensaje);
  };

  const onWebSocketClose = () => {
    if (webSocket !== null) {
      webSocket.close();
    }
  };

  const conectarWS = () => {
    onWebSocketClose();
    const socket = new WebSocket('ws://localhost:8090/sag-genetico/api/ws-endpoint');
    setWebSocket(socket);

    socket.onopen = (event) => {
      console.log('Conexión establecida correctamente.');
      suscribirACanal(socket, '/topic/simulation-progress');
    }
  
    // socket.addEventListener('open', () => {
    //   console.log('Conexión establecida correctamente.');
  
    //   // Después de que la conexión esté establecida, suscríbete al canal deseado.
    //   suscribirACanal(socket, '/topic/simulation-progress');
    // });
    
    socket.onmessage = onWebSocketMessage;
    // socket.addEventListener('message', onWebSocketMessage);

    socket.onclose = onWebSocketClose;
    // socket.addEventListener('close', onWebSocketClose);
  };
  
  const suscribirACanal = (socket, canal) => {
    console.log('Se ha conectado al canal');
    console.log(socket);
    // Envía un mensaje de suscripción al canal deseado
    const mensajeDeSuscripcion = {
      type: 'subscribe',
      destination: canal,
    };
  
    socket.send(JSON.stringify(mensajeDeSuscripcion));
  };

  const enviarMensaje = () => {
    const txtNombre = document.getElementById('txtNombre').value;
    const txtMensaje = document.getElementById('txtMensaje').value;

    if (webSocket.readyState === WebSocket.OPEN) {
      // console.log(webSocket);
      try {
        webSocket.send('/app/simulacion-semanal', {}, JSON.stringify({
          nombre: txtNombre,
          contenido: txtMensaje,
        }));
      } catch (error) {
        console.log('No se pudo enviar el mensaje');
      }
      
    } else {
      console.error('Error en conexión');
    }
  };

  const mostrarMensaje = (mensaje) => {
    console.log(mensaje);
  };

  // useEffect(() => {
  //   // Limpieza al desmontar el componente
  //   return () => {
  //     onWebSocketClose();
  //   };
  // }, []);

  return (
    <div>
      <input type="text" id="txtNombre" placeholder="Nombre" />
      <input type="text" id="txtMensaje" placeholder="Mensaje" />
      <button onClick={conectarWS}>Conectar WebSocket</button>
      <button onClick={enviarMensaje}>Enviar Mensaje</button>
    </div>
  );
};

export default WebSocketComponent;