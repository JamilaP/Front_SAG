import React, {useState, useEffect} from 'react';
import RutaCamion from './RutaCamion';

const MapaSimu = (props) => {
  // const [dataU, setDataU] = useState(dataMapa[0]); {dataMapa}

  // const nuevoArreglo = dataMapa.map(camion => {
  //   return {
  //     id: camion.idCamion,
  //     tipo: camion.tipoCamion,
  //   };
  // });

  // const rutaDatos = dataMapa[0];
  let rutaConvertida;
  const ruta = [[7, 7], [7, 21], [21, 21], [21, 161]];
  const ruta2 = [[35, 21], [161, 21], [161, 161], [21, 161]];
  const ruta3 = [[427, 287], [455, 287], [455, 245], [21, 245]];
  // 7,7 0,0
  // 7+ X *
  const gridSizeX = 70;
  const gridSizeY = 50;
  const cellSize = 14; // Tamaño de cada celda
  const gridWidth = gridSizeX * cellSize;
  const gridHeight = gridSizeY * cellSize;

  // Calcular la posición de la grilla centrada
  const offsetX = (gridSizeX % 2 === 0 ? cellSize / 2 : 0);
  const offsetY = (gridSizeY % 2 === 0 ? cellSize / 2 : 0);

  // Agregar márgenes superior e inferior
  const marginTop = 15; // Ajusta según tus necesidades
  const marginBottom = 15; // Ajusta según tus necesidades

  const convertirRuta = (ruta) => {
    // let rutaConvertida;  // Declara la variable fuera del bloque if

    if (ruta) {
      try {
        rutaConvertida = ruta.nodos.map(({ x, y }) => [x, y]);
        console.log(rutaConvertida);
      } catch (error) {
        console.log('No hay nodos: '+ error);
      }      
      // console.log(rutaConvertida);
    } else {
      console.log('El campo "nodos" es nulo o undefined.');
    }

    return {
      rutaConvertida
    };
  }

  return (
    // <div>
    //     {
    //       console.log(dataU)
    //       // dataU && dataU.length > 0 && dataU[0] && dataU[0].nodoActual
    //       // ? ( <h2> {'X: ' + dataMapa[0].nodoActual.x + ' ' + 
    //       // 'Y: ' + dataMapa[0].nodoActual.y } </h2>  ) : (
    //       //   console.log('No hay dato')
    //       // )
    //     }
    // </div>
    <svg
      className='Mapa'
      width={gridWidth + offsetX}
      height={gridHeight + offsetY + marginTop + marginBottom}
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginTop, marginBottom }}
    >
      {Array.from({ length: gridSizeX }).map((_, colIndex) => (
        Array.from({ length: gridSizeY }).map((_, rowIndex) => (
          <rect
            key={`${colIndex}-${rowIndex}`}
            x={colIndex * cellSize + offsetX}
            y={rowIndex * cellSize + offsetY}
            width={cellSize}
            height={cellSize}
            fill="transparent"
            stroke="#ccc"
            strokeWidth="1"
          />
        ))
      ))}

      {console.log('Escena a mover ', props.dataMapa, 'Nro ', props.index)}
      
      {/* <RutaCamion ruta={ruta}/>
      <RutaCamion ruta={ruta2}/>
      <RutaCamion ruta={ruta3}/> */}

      {/* <div> 
        {console.log('Primer dato:', rutaDatos)}
      </div> */}
      {/* {
        dataMapa && dataMapa.length > 0 && dataMapa[0] && dataMapa[0].nodoActual && dataMapa[0].idCamion ? ((console.log('Nodo actual', dataMapa[0].nodoActual, ' Id camion', dataMapa[0].idCamion ))
        ) : (console.log('Sin primer elemento'))
      } */}
      {
        props.dataMapa && props.dataMapa.length > 0 && props.dataMapa.map(element => (
          element.nodoActual && element.nodoActual.x && element.nodoActual.y ? (
            <circle cx={element.nodoActual.x * 14 + 7}
             cy= {element.nodoActual.y * 14 + 7}
             r="5" fill="blue" />
          ): (            
            console.log('No hay datos', element)
            // , props.setIndex()
            // props.moverEscena
          )                   
          // console.log('Camion', element.idCamion)          
          // console.log('Ruta', element.ruta.nodos)
        ))
      }

      {/* {
        props.dataMapa && props.dataMapa.length > 0 && props.dataMapa[0] && props.dataMapa[0].nodoActual && props.dataMapa[0].idCamion ? (
          props.dataMapa[0].nodoActual.x && props.dataMapa[0].nodoActual.y ? (
            <circle cx={props.dataMapa[0].nodoActual.x * 14 + 7}
             cy= {props.dataMapa[0].nodoActual.y * 14 + 7}
             r="5" fill="blue" />
//             <svg
//   x={dataMapa[0].nodoActual.x * 14 + 7}
//   y={dataMapa[0].nodoActual.y * 14 + 7}
//   fill="#7D8AFF"
//   version="1.1"
//   id="Capa_1"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlnsXlink="http://www.w3.org/1999/xlink"
//   width="64px"
//   height="64px"
//   viewBox="-395.71 -395.71 1187.13 1187.13"
//   xmlSpace="preserve"
//   stroke="#000000"
//   strokeWidth="0.0039571"
// >
//   <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//   <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.79142"></g>
//   <g id="SVGRepo_iconCarrier">
//     <g>
//       <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
//     </g>
//   </g>
// </svg>
          ) : (console.log('No hay ahora'))
          ) : (console.log('Sin primer elemento'))
      } */}

      {/* { // Prueba del primer camion
        props.dataMapa && props.dataMapa.length > 0 && props.dataMapa[0] ? (
          props.dataMapa[0].ruta && props.dataMapa[0].ruta.nodos ? 
          (<RutaCamion rutaCamion={props.dataMapa[0].ruta.nodos}/>)
          : (console.log('Sin nodos', props.dataMapa))
        ) : (console.log('Sin primer elemento'))
      }  */}
      { // Prueba todos los camiones 
        props.dataMapa && props.dataMapa.length > 0 && props.dataMapa.map(element => (
              element.ruta && element.ruta.nodos && element.nodoActual ? (
              <RutaCamion rutaCamion={element.ruta.nodos } inicio = {element.nodoActual}/>
          ): (            
            console.log('No hay datos')
            // , props.setIndex()
            // props.moverEscena
          )                   
          // console.log('Camion', element.idCamion)          
          // console.log('Ruta', element.ruta.nodos)
        ))        
      }

      {
        props.dataMapa && props.dataMapa.length > 0 && props.dataMapa.map(element => (
          element.pedidos && element.pedidos.map( ped => (
              ped.first && ped.first.ubicacion && ped.first.ubicacion.x && ped.first.ubicacion.y ? 
              (<circle cx={ped.first.ubicacion.x * 14 + 7}
                cy= {ped.first.ubicacion.y * 14 + 7}
                r="5" fill="red" />)
              :
              (console.log('No hay pedidos')) 
            )
          )
        ))
      }


      { props.dataMapa && props.dataMapa.length > 0 ?
        (props.setIndex()) 
        : 
        (console.log('No se puede mover'))        
      }
      {/* {dataMapa && dataMapa.length > 0 && dataMapa.map(element => (
        element.pedidos && element.pedidos.first ? (
          console.log('X: ', element.pedidos.first.ubicacion.x)
          ): (
            // Puedes agregar un mensaje de error o manejo específico para elementos sin ruta/nodos
            // <div key={element.idCamion}>Elemento sin ruta o nodos</div>
            console.log('Pedio')
          )
        ))} */}
      {/* {
        dataMapa && dataMapa.length > 0 && dataMapa.map(element => (
          element.pedidos && element.pedidos.first && element.pedidos.first.ubicacion && element.pedidos.first.ubicacion.x ? (
            <svg
  x={element.pedidos.first.ubicacion.x * 14 + 7}
  y={element.pedidos.first.ubicacion.y * 14 + 7}
  fill="#000000"
  version="1.1"
  id="Capa_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  width="64px"
  height="64px"
  viewBox="-395.71 -395.71 1187.13 1187.13"
  xmlSpace="preserve"
  stroke="#000000"
  strokeWidth="0.0039571"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.79142"></g>
  <g id="SVGRepo_iconCarrier">
    <g>
      <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
    </g>
  </g>
</svg>
          ): (
            console.log('No pedido')
          )
        ))
      } */}
      
    </svg>
  );
};

export default MapaSimu;