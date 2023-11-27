import React, { useEffect, useRef, useState } from 'react';
import anime from "animejs";

function AnimacionCamiones(props) {
    const inicioX = 0 ;
    const inicioY = 0;
    const flechaStr = inicioX + ',' + inicioY + ' '
      + (inicioX - 10) + ',' + (inicioY+5) + ' '
      + (inicioX - 8) + ',' + (inicioY) + ' '
      + (inicioX - 10) + ',' + (inicioY-5);

    const [poligonos, setPoligonos] = useState([]);
    const [mover, setMover] = useState(false);
    const poligonosRef = useRef([]);
    const reportado = useRef(false);

    function calcularMovimientos (camiones){
        let arrVectores = [];
        if (camiones && 0 < camiones.length){
            for (let i = 0; i < camiones.length; i++){
                if(camiones[i].route.nodes && (0 < camiones[i].route.nodes.length)){
                    let vectorX = (camiones[i].route.nodes[0].x - camiones[i].currentNode.x) === 0 ? (0): ((camiones[i].route.nodes[0].x - camiones[i].currentNode.x)/ Math.abs((camiones[i].route.nodes[0].x - camiones[i].currentNode.x)));
                    let vectorY = (camiones[i].route.nodes[0].y - camiones[i].currentNode.y) === 0 ? (0): ((camiones[i].route.nodes[0].y - camiones[i].currentNode.y)/ Math.abs((camiones[i].route.nodes[0].y - camiones[i].currentNode.y)));
                    arrVectores.push(
                        [vectorX*props.tamanioCelda, vectorY*props.tamanioCelda]
                    );
                }else{
                    arrVectores.push(
                        [0, 0]
                    );
                }
            }
        }
        return arrVectores;
    }

    function calcularInicios (camiones){
        let arrInicios = [];
        if (camiones &&  0 < camiones.length){
            for (let i = 0; i < camiones.length; i++){
                arrInicios.push(
                    [camiones[i].currentNode.x*props.tamanioCelda + props.tamanioCelda/2, (50 - camiones[i].currentNode.y)*props.tamanioCelda + props.tamanioCelda/2]
                );
            }
        }
        return arrInicios;
    }

    const inicios = calcularInicios(props.camiones);
    const movimientos = calcularMovimientos(props.camiones);

    useEffect(() => {
        console.log('Camiones ', props.camiones);
        console.log('Mover ', mover);
        if (props.camiones &&  0 < props.camiones.length){
            console.log('ejecutando creacion');
            const nuevosPoligonos = [];
            for (let i = 0; i < props.camiones.length; i++) {
                nuevosPoligonos.push(
                <polygon key={i} className="hola" points={flechaStr} ref={(el) => (poligonosRef.current[i] = el)} />
                );
            }
            setPoligonos(nuevosPoligonos);
            setMover(true);
        }
        else{
            // props.pasarAnimar();
            props.moverEscena(false);
        }
    }, [props.camiones]);
  
    useEffect(() => {
    //   const inicioY = [0,50,200];
    //   const inicioX = [10,50,100];      
    //   const movimientosY = [0,100,100];
    //   const movimientosX = [80,50,100];

    console.log('Inicios', inicios);
    console.log('Movimientos', movimientos); 

      if(mover){
        console.log('ejecutando animacion');
        let animacion = anime({
          targets: '.hola',
          easing: "linear",
          autoplay: false,
          translateY: function(target, index){
            let a = inicios[index] ? inicios[index][1] : 0 ;
            let b = movimientos[index] ? movimientos[index][1] : 0 ; 
            return [a , a - b];
          },
          translateX: function(target, index){
            let a = inicios[index] ? inicios[index][0] : 0 ;
            let b = movimientos[index] ? movimientos[index][0] : 0 ; 
            return [a , a + b];
          },
          duration: props.duracion,
          rotate: {
            value: function (target, index, targets) {
                const deltaX = movimientos[index][0];
                const deltaY = -movimientos[index][1];
                return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            },
            duration: 1, // Cambia el valor según tu necesidad
            easing: 'easeInOutSine',
            },
        //   rotate: 90,
          // delay: anime.stagger(100)
        });

        animacion.finished.then(() => {
          reportar();
        });        
        animacion.play();
      }
      return () => {setMover(false);}
      ;             
    }, [mover]);

    function reportar() {
      console.log('Pasar al siguiente');
    //   props.pasarAnimar();
      props.moverEscena(false);
    }

  return (
    <svg className='mapa' >
      {poligonos}
    </svg>
  );
}

export default AnimacionCamiones