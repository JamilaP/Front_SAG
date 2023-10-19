import React, { useEffect, useRef } from 'react';
import './MapaSimu.css';

const MapaSimu = () => {
  const fondoMapa = useRef(null);
  const fondoFlecha = useRef(null);

  function Mapa(X, Y, inicioAlto, inicioAncho, cuadro, c){
    this.cuadro = cuadro;
    this.inicioAlto = inicioAlto;
    this.inicioAncho = inicioAncho;
    this.X = X;
    this.Y = Y;
    this.anchoMapa = this.cuadro*this.X;
    this.altoMapa = this.cuadro*this.Y;
    
    this.dibujar = function(){
      c.beginPath();
      //Dibujar horizontales
      for(var i = 0; i < Y+1 ; i++){
        //X,Y
        c.moveTo( this.inicioAncho, this.inicioAlto + this.cuadro*i);
        c.lineTo( this.inicioAncho + this.anchoMapa , this.inicioAlto + this.cuadro*i);
        c.stroke();
      }  
    
      //Dibujar verticales
      for(var i = 0; i < X+1 ; i++){
        c.moveTo( this.inicioAncho + this.cuadro * i , this.inicioAlto  );
        c.lineTo( this.inicioAncho + this.cuadro * i , this.inicioAlto + this.altoMapa );
        c.stroke();
      }
    }    
  }

  function animarLinea(inicioFlechaX,inicioFlechaY, finFlechaX, finFlechaY, lancho, lalto, ctxFlecha, direccion){
    var longitudFlecha = 10;
    var estadoAnimacion = true;
    switch (direccion){
      case 'derecha':
        function dibujarLinea () {
          if(estadoAnimacion){
            ctxFlecha.clearRect(0,0,lancho,lalto);
            ctxFlecha.beginPath();
            ctxFlecha.moveTo( inicioFlechaX, inicioFlechaY);    
            ctxFlecha.lineTo( inicioFlechaX + longitudFlecha , inicioFlechaY);
            ctxFlecha.stroke();
            ctxFlecha.beginPath();
            ctxFlecha.moveTo(inicioFlechaX + longitudFlecha - 10, inicioFlechaY - 5);
            ctxFlecha.lineTo(inicioFlechaX + longitudFlecha, inicioFlechaY);
            ctxFlecha.lineTo(inicioFlechaX + longitudFlecha - 10, inicioFlechaY + 5);
            ctxFlecha.stroke();
    
            inicioFlechaX += 1;
    
            requestAnimationFrame(dibujarLinea);
    
            if (inicioFlechaX >= finFlechaX) {
              inicioFlechaX = finFlechaX;
              ctxFlecha.closePath();
              estadoAnimacion = false;
            }
            console.log('Sigue animando');
          }
    
          return;
        }
        dibujarLinea();
        break;
      case 'izquierda':
        function dibujarLineaI () {
          if(estadoAnimacion){
            ctxFlecha.clearRect(0,0,lancho,lalto);
            ctxFlecha.beginPath();
            ctxFlecha.moveTo( inicioFlechaX + longitudFlecha, inicioFlechaY);    
            ctxFlecha.lineTo( inicioFlechaX + 2*longitudFlecha , inicioFlechaY);
            ctxFlecha.stroke();
            ctxFlecha.beginPath();
            ctxFlecha.moveTo(inicioFlechaX + longitudFlecha + 10, inicioFlechaY + 5);
            ctxFlecha.lineTo(inicioFlechaX + longitudFlecha, inicioFlechaY);
            ctxFlecha.lineTo(inicioFlechaX + longitudFlecha + 10, inicioFlechaY - 5);
            ctxFlecha.stroke();
    
            inicioFlechaX -= 1;
    
            requestAnimationFrame(dibujarLineaI);
    
            if (inicioFlechaX + longitudFlecha  <= finFlechaX) {
              inicioFlechaX = finFlechaX;
              ctxFlecha.closePath();
              estadoAnimacion = false;
            }
            console.log('Sigue animando');
          }
          return;
        }
        dibujarLineaI();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    // Obtener referencia al elemento canvas
    const canvas = document.getElementById('canvasMapa');
    const canvaMapa = fondoMapa.current;
    const canvaFlecha = fondoFlecha.current;
    const ctxMapa = canvaMapa.getContext('2d');
    const ctxFlecha = canvaFlecha.getContext('2d');

    canvaMapa.width = 1120;
    canvaMapa.height = 840;
    canvaFlecha.width = 1120;
    canvaFlecha.height = 840;
    ctxMapa.strokeStyle = 'rgba(253, 208, 214, 0.8)';
    ctxFlecha.strokeStyle = 'rgba(4, 4, 4, 1)';
    ctxFlecha.lineWidth = 3;

    var mapa = new Mapa(70,50, canvaMapa.height/14,canvaMapa.width/14, 14, ctxMapa);
    mapa.dibujar();

    //animarLinea(mapa.inicioAncho,mapa.inicioAlto,mapa.inicioAncho + mapa.cuadro*35,0,canvaFlecha.width,canvaFlecha.height, ctxFlecha, 'derecha');
    animarLinea(mapa.inicioAncho + mapa.cuadro*35,mapa.inicioAlto,mapa.inicioAncho,0,canvaFlecha.width,canvaFlecha.height, ctxFlecha, 'izquierda');
  }, []); // El segundo argumento vacío asegura que el efecto se ejecute solo una vez después del montaje inicial


  return (
    <div>
      <canvas className="cannva1" ref={fondoMapa}></canvas>
      <canvas className="cannva2" ref={fondoFlecha}></canvas>
    </div>
  );
};

export default MapaSimu;