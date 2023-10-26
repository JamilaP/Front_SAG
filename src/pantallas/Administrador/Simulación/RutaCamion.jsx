import { useEffect, useRef } from "react";
import anime from "animejs";

function RutaCamion({rutaCamion}) {
  let rutaconvertida = rutaCamion.map(({ x, y }) => [x*14 + 7, y*14 + 7]);

  // const ruta = camion.ruta;  
  // const ruta = camion.ruta.nodos && camion.ruta.nodos.map(({ x, y }) => [x, y]);

  // const rutaStr = ruta.map(p => p.join(',')).join(' ');
  // const inicio = ruta[0];

  // let rutaConvertida;
  // const convertirRuta = (ruta) => {
  //   // let rutaConvertida;  // Declara la variable fuera del bloque if

  //   if (ruta) {
  //     try {
  //       rutaConvertida = ruta.nodos.map(({ x, y }) => [x, y]);
  //       console.log(rutaConvertida);
  //     } catch (error) {
  //       console.log('No hay nodos: '+ error);
  //     }      
  //     // console.log(rutaConvertida);
  //   } else {
  //     console.log('El campo "nodos" es nulo o undefined.');
  //   }
  // }


  const inicioX = 0 ;
  const inicioY = 0 ;
  const flechaStr = inicioX + ',' + inicioY + ' ' 
                  + (inicioX - 10) + ',' + (inicioY+5) + ' ' 
                  + (inicioX - 8) + ',' + (inicioY) + ' ' 
                  + (inicioX - 10) + ',' + (inicioY-5);


  const pathData = rutaconvertida ? `M${rutaconvertida.join(' L')}` : '';
  // let pathData;

  // try {
  //   pathData = ruta ? `M${ruta.map(coord => coord.join(' ')).join(' L')}` : '';
  //   // pathData = ruta.map(([x, y], index) => {
  //   //   return index === 0 ? `M${x},${y}` : `L${x},${y}`;
  //   // }).join(" ");
  //   console.log('El camino es el siguiente: '+ pathData);
  // } catch (error) {
  //   console.log('No hay nodos para el camino', error);
  // }  

  const camionRef = useRef(null);
  const caminoRef = useRef(null);

  const animateCircle = () => {
    // Get the DOM element to animate
    const camion = camionRef.current;
    const camino = caminoRef.current;
    console.log("Path: " + camino);

    // Use AnimeJS to create the animation
    if (camino) {
      let path = anime.path(camino);
      console.log("Path: " + camino);
      anime({
        targets: camion,
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        duration: 200000, // Animation duration in milliseconds
        easing: "linear", // Easing function for smooth animation
      });
    } else {
      console.log("No hay camino");
    }
    
  };

  // useEffect(() => {
  //   // INICIAR CAMIONES
  //   // // console.log(ruta);
  //   // console.log('Camino: '+ pathData);
  //   // console.log('Camion: '+ flechaStr);
  //   // if(camionPaso) console.log( camionPaso); //convertirRuta(camionPaso.ruta.nodos);

  //   // try {
  //   //   pathData = rutaConvertida ? `M${rutaConvertida.map(coord => coord.join(' ')).join(' L')}` : '';
  //   //   // pathData = ruta.map(([x, y], index) => {
  //   //   //   return index === 0 ? `M${x},${y}` : `L${x},${y}`;
  //   //   // }).join(" ");
  //   //   console.log('El camino es el siguiente: '+ pathData);
  //   // } catch (error) {
  //   //   console.log('No hay nodos para el camino', error);
  //   // }    
  //   animateCircle();
  //   // console.log(camion);
  // }, []);
  
  return (
    // <>
    // {
    //   console.log(pathData)
    // }
    // </>
    <svg>
        <polygon ref={camionRef} points={flechaStr} fill="#000000" />
        <path ref={caminoRef} d={pathData} fill="transparent" stroke="rgba(27, 157, 38, 0.83)" strokeWidth="2" />
        {console.log(rutaCamion)}
        {/* <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path> </g> </g></svg>                       */}
    </svg>

  );
}
export default RutaCamion;