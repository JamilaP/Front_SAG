import { useEffect, useRef } from "react";
import anime from "animejs";

function RutaCamion(props) {
  let nodoPedido =[props.ped.x *props.tamanioCelda + props.tamanioCelda/2,(50 - props.ped.y)*props.tamanioCelda + props.tamanioCelda/2];
  // [props.rutaCamion[ props.rutaCamion.length - 1 ].x *14 + 7, (50 - props.rutaCamion[props.rutaCamion.length - 1 ].y *14 + 7)]
  let inicioRuta = [[props.inicio.x*props.tamanioCelda + props.tamanioCelda/2 , (50 - props.inicio.y) *props.tamanioCelda + props.tamanioCelda/2]];
  let rutaconvertida = props.rutaCamion.map(({ x, y }) => [ x*props.tamanioCelda + props.tamanioCelda/2, (50 - y)*props.tamanioCelda + props.tamanioCelda/2]);
  // let rutaTotal = inicioRuta.concat([rutaconvertida[0]]);
  let rutaTotal = inicioRuta.concat(rutaconvertida);

  let indiceCorte = rutaTotal.findIndex(punto => punto[0] === nodoPedido[0] && punto[1] === nodoPedido[1]);
  let rutaCorte = indiceCorte !== -1 ? rutaTotal.slice(0, indiceCorte + 1) : rutaTotal;

  let vectorX = (props.rutaCamion[0].x - props.inicio.x) === 0 ? (0): ((props.rutaCamion[0].x - props.inicio.x)/ Math.abs((props.rutaCamion[0].x - props.inicio.x)));
  let vectorY = (props.rutaCamion[0].y - props.inicio.y) === 0 ? (0): ((props.rutaCamion[0].y - props.inicio.y)/ Math.abs((props.rutaCamion[0].y - props.inicio.y)));

  let rutaAnimacion = [[props.inicio.x *props.tamanioCelda + props.tamanioCelda/2, (50 - props.inicio.y)*props.tamanioCelda + props.tamanioCelda/2]
  , [ (props.inicio.x + vectorX)*props.tamanioCelda + props.tamanioCelda/2, (50 - (props.inicio.y + vectorY))*props.tamanioCelda + props.tamanioCelda/2]];
  const pathAnimacion = rutaAnimacion ? `M${rutaAnimacion.join(' L')}` : '';

  function calcularDistanciaTotal(puntos) {
    let distanciaTotal = 0;

    for (let i = 1; i < puntos.length; i++) {
      const puntoAnterior = puntos[i - 1];
      const puntoActual = puntos[i];

      const distancia = Math.sqrt(
          Math.pow(puntoActual[0] - puntoAnterior[0], 2) +
          Math.pow(puntoActual[1] - puntoAnterior[1], 2)
      );

      distanciaTotal += distancia;
    }

    return distanciaTotal;
  }

  const inicioX = 0 ;
  const inicioY = 0 ;
  const flechaStr = inicioX + ',' + inicioY + ' '
      + (inicioX - 10) + ',' + (inicioY+5) + ' '
      + (inicioX - 8) + ',' + (inicioY) + ' '
      + (inicioX - 10) + ',' + (inicioY-5);


  const pathData = rutaCorte ? `M${rutaCorte.join(' L')}` : '';

  const camionRef = useRef(null);
  const caminoRef = useRef(null);

  const camion = camionRef.current;
  const camino = caminoRef.current;
  let path = anime.path(camino);


  useEffect(() => {
    if (props.pausar){
      var animacion = anime({
        targets: camion,
        translateX: inicioRuta[0][0] ,
        translateY: inicioRuta[0][1] ,
        rotate: 0 ,
        duration: 10, // Animation duration in milliseconds
        easing: "linear", // Easing function for smooth animation
        autoplay: true
      });
      console.log('Pausa');
    }else{
      var animacion = anime({
        targets: camion,
        translateX: camino ? (path('x')) : (0) ,
        translateY: camino ? (path('y')) : (0) ,
        rotate: camino ? (path('angle')) : (0) ,
        duration: props.duracionE*0.70, // Animation duration in milliseconds
        easing: "linear", // Easing function for smooth animation
        autoplay: false
      });
      animacion.play();
    }

    return () => {

    };
  }, [rutaAnimacion, props.pausar]);

  return (
      <svg>
        <path ref={caminoRef} d={pathAnimacion} fill="transparent" stroke="rgba(27, 157, 38, 0.83)" strokeWidth="1" />
        <path d={pathData} fill="transparent" stroke="rgba(27, 157, 38, 0.83)" strokeWidth="1" />
        <polygon ref={camionRef} points={flechaStr} fill="#000000" />
        {console.log( 'Ruta: ', pathData)}
      </svg>

  );
}
export default RutaCamion;