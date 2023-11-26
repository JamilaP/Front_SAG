import React, {useState, useEffect} from 'react';
import RutaCamion from './RutaCamion';
import RutaBloqueo from './Bloqueos';

const MapaSimu = (props) => {
  // const [dataU, setDataU] = useState(dataMapa[0]); {dataMapa}

  // const nuevoArreglo = dataMapa.map(camion => {
  //   return {
  //     id: camion.idCamion,
  //     tipo: camion.tipoCamion,
  //   };
  // });

  // const rutaDatos = dataMapa[0];

  const flechaStr = 0 + ',' + 0 + ' '
      + (0 - 10) + ',' + (0+5) + ' '
      + (0 - 8) + ',' + (0) + ' '
      + (0 - 10) + ',' + (0-5);
      
  let rutaConvertida;
  const ruta = [[7, 7], [7, 21], [21, 21], [21, 161]];
  const ruta2 = [[35, 21], [161, 21], [161, 161], [21, 161]];
  const ruta3 = [[427, 287], [455, 287], [455, 245], [21, 245]];
  // 7,7 0,0
  // 7+ X *
  const gridSizeX = 70;
  const gridSizeY = 50;
  const cellSize = 12; // Tamaño de cada celda
  const gridWidth = gridSizeX * cellSize;
  const gridHeight = gridSizeY * cellSize;

  // Calcular la posición de la grilla centrada
  const offsetX = (gridSizeX % 2 === 0 ? cellSize / 2 : 0);
  const offsetY = (gridSizeY % 2 === 0 ? cellSize / 2 : 0);

  // Agregar márgenes superior e inferior
  const marginTop = 6; // Ajusta según tus necesidades
  const marginBottom = 6; // Ajusta según tus necesidades

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

  useEffect(() => {

    if(props.dataMapa && !props.pausarR ){
      props.setIndex(false);
      console.log('Escena movida siguiente');
    }
    else {
      console.log('No se puede mover');
    }

  }, [props.dataMapa, props.pausarR]);

  return (
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

        {
            props.dataMapa && props.dataMapa.length > 0 && props.dataMapa.map(element => (
                element.currentNode && element.currentNode.x && element.currentNode.y ? (
                    <circle cx={element.currentNode.x * cellSize + cellSize/2}
                            cy= {(50 - element.currentNode.y) * cellSize + cellSize/2}
                            r="1" fill="blue" />
                    // <svg x = {element.currentNode.x * cellSize - 5} y = {(50 - element.currentNode.x)*cellSize - 14 }>
                    //   <polygon  points={flechaStr} fill="#000000" />
                    //   <svg/>
                    
                ): (
                    console.log('No hay datos', element)
                    // , props.setIndex()
                    // props.moverEscena
                )
                // console.log('Camion', element.idCamion)
                // console.log('Ruta', element.ruta.nodos)
            ))
        }

        {
            props.dataBloqueos && props.dataBloqueos.length > 0 && props.dataBloqueos.map(element => (
                    element.vertices ?
                        (<RutaBloqueo rutaBloqueo = {element.vertices} tamanioCelda = {cellSize}/>) :
                        (console.log('No hay bloqueos', element))
                )
            )
        }

        { // Prueba todos los camiones
            props.dataMapa && props.dataMapa.length > 0 && props.dataMapa.map(element => (
                // console.log('Elemento', element)
                element.route && element.route.nodes && (0 < element.route.nodes.length) && element.currentNode && element.currentNode
                && element.orders && (0 < element.orders.length) ? (
                    <RutaCamion rutaCamion={element.route.nodes } inicio = {element.currentNode}
                                ped = {element.orders[0].order.location} duracionE = {props.duracion} pausar = {props.pausarR}
                                tamanioCelda = {cellSize}/>
                    // console.log('Datos a procesar: ', element.orders.length)
                ): (
                    element.route && element.route.nodes && (0 < element.route.nodes.length)  && element.currentNode && element.currentNode
                    && element.orders && (0 == element.orders.length) ? (
                        <RutaCamion rutaCamion={element.route.nodes } inicio = {element.currentNode}
                                    ped = {element.route.nodes[element.route.nodes.length -1]} 
                                    duracionE = {props.duracion} pausar = {props.pausarR} tamanioCelda = {cellSize}/>
                    ) : (console.log('No hay datos'))

                )
            ))
        }


        {/* {
            props.dataMapa && props.dataMapa.length > 0 && props.dataMapa.map(element => (
                element.orders && (0 < element.orders.length)  ?
                    (<svg x = {element.orders[0].order.location.x * cellSize - 5} y = {(50 - element.orders[0].order.location.y)*cellSize - 14 } width="64px" height="64px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>)
                    :
                    (console.log('No hay pedido actual'))
            ))
        } */}

        {
            props.pedidos && props.pedidos.length > 0 && props.pedidos.map(element => (
                element.order ?
                    (<svg x = {element.order.location.x * cellSize - 5} y = {(50 - element.order.location.y)*cellSize - 14 } width="64px" height="64px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>)
                    :
                    (console.log('No hay pedido actual'))
            ))
        }



        {/*
        { props.dataMapa && props.dataMapa.length > 0 && !props.pausar ?
            (props.setIndex())
            :
            (console.log('No se puede mover'))
        }*/}


        <svg x ={cellSize*(12)-4} y = {cellSize*(42)-7} width="64px" height="64px" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.384"></g><g id="SVGRepo_iconCarrier"> <path d="M7 21V11.6C7 11.0399 7 10.7599 7.10899 10.546C7.20487 10.3578 7.35785 10.2048 7.54601 10.109C7.75992 9.99996 8.03995 9.99996 8.6 9.99996H15.4C15.9601 9.99996 16.2401 9.99996 16.454 10.109C16.6422 10.2048 16.7951 10.3578 16.891 10.546C17 10.7599 17 11.0399 17 11.6V21M10 14H14M10 18H14M3 10.4881V19.4C3 19.96 3 20.24 3.10899 20.454C3.20487 20.6421 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6421 20.891 20.454C21 20.24 21 19.96 21 19.4V10.4881C21 9.41436 21 8.87747 20.8368 8.40316C20.6925 7.98371 20.457 7.60148 20.1472 7.28399C19.797 6.92498 19.3174 6.68357 18.3583 6.20075L14.1583 4.08645C13.3671 3.68819 12.9716 3.48905 12.5564 3.41069C12.1887 3.34129 11.8113 3.34129 11.4436 3.41069C11.0284 3.48905 10.6329 3.68818 9.84171 4.08645L5.64171 6.20075C4.6826 6.68357 4.20304 6.92498 3.85275 7.28399C3.54298 7.60148 3.30746 7.98371 3.16317 8.40316C3 8.87747 3 9.41437 3 10.4881Z" stroke="#000000" strokeWidth="1.9200000000000004" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        <svg x ={cellSize*(42)-4} y = {cellSize*(8)-7} width="64px" height="64px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.25 7.00003C4.25 7.41424 4.58579 7.75003 5 7.75003C5.41421 7.75003 5.75 7.41424 5.75 7.00003H4.25ZM6.1 5.88903L5.81451 5.19549C5.80534 5.19927 5.79623 5.20323 5.78721 5.20737L6.1 5.88903ZM9.033 5.15203L9.10927 5.89814C9.11457 5.8976 9.11986 5.897 9.12515 5.89635L9.033 5.15203ZM11.533 5.00003L11.5317 5.75003H11.533V5.00003ZM12.466 5.00003V5.75003L12.4673 5.75003L12.466 5.00003ZM14.966 5.15203L14.8739 5.89635C14.8792 5.89701 14.8845 5.89761 14.8898 5.89815L14.966 5.15203ZM17.9 5.88903L18.2128 5.20737C18.2038 5.20322 18.1946 5.19926 18.1855 5.19548L17.9 5.88903ZM18.25 7.00003C18.25 7.41424 18.5858 7.75003 19 7.75003C19.4142 7.75003 19.75 7.41424 19.75 7.00003H18.25ZM5.75 7.00003C5.75 6.58582 5.41421 6.25003 5 6.25003C4.58579 6.25003 4.25 6.58582 4.25 7.00003H5.75ZM6.914 8.41403L6.69463 9.13123C6.70173 9.1334 6.70887 9.13547 6.71603 9.13743L6.914 8.41403ZM11.533 9.00003V8.24995L11.5219 8.25011L11.533 9.00003ZM12.466 9.00003L12.4771 8.25003H12.466V9.00003ZM17.086 8.41403L17.284 9.13743C17.2911 9.13547 17.2983 9.1334 17.3054 9.13123L17.086 8.41403ZM19.75 7.00003C19.75 6.58582 19.4142 6.25003 19 6.25003C18.5858 6.25003 18.25 6.58582 18.25 7.00003H19.75ZM5.75 7.00003C5.75 6.58582 5.41421 6.25003 5 6.25003C4.58579 6.25003 4.25 6.58582 4.25 7.00003H5.75ZM4.25 12C4.25 12.4142 4.58579 12.75 5 12.75C5.41421 12.75 5.75 12.4142 5.75 12H4.25ZM19.75 7.00003C19.75 6.58582 19.4142 6.25003 19 6.25003C18.5858 6.25003 18.25 6.58582 18.25 7.00003H19.75ZM18.25 12C18.25 12.4142 18.5858 12.75 19 12.75C19.4142 12.75 19.75 12.4142 19.75 12H18.25ZM5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12H5.75ZM6.914 13.414L6.69463 14.1312C6.70173 14.1334 6.70887 14.1355 6.71603 14.1374L6.914 13.414ZM11.533 14V13.2499L11.5219 13.2501L11.533 14ZM12.466 14L12.4771 13.25H12.466V14ZM17.086 13.414L17.284 14.1374C17.2911 14.1355 17.2983 14.1334 17.3054 14.1312L17.086 13.414ZM19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12H19.75ZM5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12H5.75ZM6.914 18.414L6.69463 19.1312C6.70173 19.1334 6.70887 19.1355 6.71603 19.1374L6.914 18.414ZM11.533 19V18.2499L11.5219 18.2501L11.533 19ZM12.466 19L12.4771 18.25H12.466V19ZM17.086 18.414L17.284 19.1374C17.2911 19.1355 17.2983 19.1334 17.3054 19.1312L17.086 18.414ZM19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12H19.75ZM5.75 7.00003C5.75 7.05846 5.71815 7.04218 5.81323 6.94645C5.91209 6.84693 6.09951 6.71444 6.41279 6.57069L5.78721 5.20737C5.38349 5.39262 5.02091 5.61563 4.74902 5.88936C4.47335 6.16688 4.25 6.5416 4.25 7.00003H5.75ZM6.38549 6.58257C7.25569 6.22436 8.1731 5.99384 9.10927 5.89814L8.95673 4.40592C7.87675 4.51631 6.8184 4.78225 5.81451 5.19549L6.38549 6.58257ZM9.12515 5.89635C9.9235 5.79751 10.7273 5.74864 11.5317 5.75003L11.5343 4.25003C10.6674 4.24854 9.80121 4.3012 8.94085 4.40771L9.12515 5.89635ZM11.533 5.75003H12.466V4.25003H11.533V5.75003ZM12.4673 5.75003C13.2717 5.74864 14.0755 5.79751 14.8739 5.89635L15.0581 4.40771C14.1978 4.3012 13.3316 4.24854 12.4647 4.25003L12.4673 5.75003ZM14.8898 5.89815C15.8263 5.99376 16.744 6.22428 17.6145 6.58258L18.1855 5.19548C17.1812 4.78214 16.1225 4.5162 15.0422 4.40591L14.8898 5.89815ZM17.5872 6.57069C17.9005 6.71444 18.0879 6.84693 18.1868 6.94645C18.2819 7.04218 18.25 7.05846 18.25 7.00003H19.75C19.75 6.5416 19.5266 6.16688 19.251 5.88936C18.9791 5.61563 18.6165 5.39262 18.2128 5.20737L17.5872 6.57069ZM4.25 7.00003C4.25 7.61363 4.646 8.06864 5.05149 8.36831C5.4717 8.67886 6.03924 8.93076 6.69463 9.13123L7.13337 7.69683C6.56276 7.52229 6.1733 7.3322 5.94301 7.162C5.698 6.98092 5.75 6.91643 5.75 7.00003H4.25ZM6.71603 9.13743C8.28853 9.56776 9.91391 9.77397 11.5441 9.74995L11.5219 8.25011C10.033 8.27205 8.54831 8.0837 7.11197 7.69063L6.71603 9.13743ZM11.533 9.75003H12.466V8.25003H11.533V9.75003ZM12.4549 9.74995C14.0854 9.77407 15.7111 9.56786 17.284 9.13743L16.888 7.69063C15.4514 8.08379 13.9664 8.27214 12.4771 8.25011L12.4549 9.74995ZM17.3054 9.13123C17.9605 8.93084 18.5281 8.67923 18.9484 8.3688C19.3542 8.069 19.75 7.61396 19.75 7.00003H18.25C18.25 6.9171 18.3018 6.98156 18.0571 7.16226C17.8269 7.33233 17.4375 7.52222 16.8666 7.69683L17.3054 9.13123ZM4.25 7.00003V12H5.75V7.00003H4.25ZM18.25 7.00003V12H19.75V7.00003H18.25ZM4.25 12C4.25 12.6136 4.646 13.0686 5.05149 13.3683C5.4717 13.6789 6.03924 13.9308 6.69463 14.1312L7.13337 12.6968C6.56276 12.5223 6.1733 12.3322 5.94301 12.162C5.698 11.9809 5.75 11.9164 5.75 12H4.25ZM6.71603 14.1374C8.28853 14.5678 9.91391 14.774 11.5441 14.7499L11.5219 13.2501C10.033 13.2721 8.54831 13.0837 7.11197 12.6906L6.71603 14.1374ZM11.533 14.75H12.466V13.25H11.533V14.75ZM12.4549 14.7499C14.0854 14.7741 15.7111 14.5679 17.284 14.1374L16.888 12.6906C15.4514 13.0838 13.9664 13.2721 12.4771 13.2501L12.4549 14.7499ZM17.3054 14.1312C17.9605 13.9308 18.5281 13.6792 18.9484 13.3688C19.3542 13.069 19.75 12.614 19.75 12H18.25C18.25 11.9171 18.3018 11.9816 18.0571 12.1623C17.8269 12.3323 17.4375 12.5222 16.8666 12.6968L17.3054 14.1312ZM4.25 12V17H5.75V12H4.25ZM4.25 17C4.25 17.6136 4.646 18.0686 5.05149 18.3683C5.4717 18.6789 6.03924 18.9308 6.69463 19.1312L7.13337 17.6968C6.56276 17.5223 6.1733 17.3322 5.94301 17.162C5.698 16.9809 5.75 16.9164 5.75 17H4.25ZM6.71603 19.1374C8.28853 19.5678 9.91391 19.774 11.5441 19.7499L11.5219 18.2501C10.033 18.2721 8.54831 18.0837 7.11197 17.6906L6.71603 19.1374ZM11.533 19.75H12.466V18.25H11.533V19.75ZM12.4549 19.7499C14.0854 19.7741 15.7111 19.5679 17.284 19.1374L16.888 17.6906C15.4514 18.0838 13.9664 18.2721 12.4771 18.2501L12.4549 19.7499ZM17.3054 19.1312C17.9608 18.9308 18.5283 18.6789 18.9485 18.3683C19.354 18.0686 19.75 17.6136 19.75 17H18.25C18.25 16.9164 18.302 16.9809 18.057 17.162C17.8267 17.3322 17.4372 17.5223 16.8666 17.6968L17.3054 19.1312ZM19.75 17V12H18.25V17H19.75Z" fill="#000000"></path> </g></svg>
        <svg x ={cellSize*(63)-4} y = {cellSize*(47)-7} width="64px" height="64px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.25 7.00003C4.25 7.41424 4.58579 7.75003 5 7.75003C5.41421 7.75003 5.75 7.41424 5.75 7.00003H4.25ZM6.1 5.88903L5.81451 5.19549C5.80534 5.19927 5.79623 5.20323 5.78721 5.20737L6.1 5.88903ZM9.033 5.15203L9.10927 5.89814C9.11457 5.8976 9.11986 5.897 9.12515 5.89635L9.033 5.15203ZM11.533 5.00003L11.5317 5.75003H11.533V5.00003ZM12.466 5.00003V5.75003L12.4673 5.75003L12.466 5.00003ZM14.966 5.15203L14.8739 5.89635C14.8792 5.89701 14.8845 5.89761 14.8898 5.89815L14.966 5.15203ZM17.9 5.88903L18.2128 5.20737C18.2038 5.20322 18.1946 5.19926 18.1855 5.19548L17.9 5.88903ZM18.25 7.00003C18.25 7.41424 18.5858 7.75003 19 7.75003C19.4142 7.75003 19.75 7.41424 19.75 7.00003H18.25ZM5.75 7.00003C5.75 6.58582 5.41421 6.25003 5 6.25003C4.58579 6.25003 4.25 6.58582 4.25 7.00003H5.75ZM6.914 8.41403L6.69463 9.13123C6.70173 9.1334 6.70887 9.13547 6.71603 9.13743L6.914 8.41403ZM11.533 9.00003V8.24995L11.5219 8.25011L11.533 9.00003ZM12.466 9.00003L12.4771 8.25003H12.466V9.00003ZM17.086 8.41403L17.284 9.13743C17.2911 9.13547 17.2983 9.1334 17.3054 9.13123L17.086 8.41403ZM19.75 7.00003C19.75 6.58582 19.4142 6.25003 19 6.25003C18.5858 6.25003 18.25 6.58582 18.25 7.00003H19.75ZM5.75 7.00003C5.75 6.58582 5.41421 6.25003 5 6.25003C4.58579 6.25003 4.25 6.58582 4.25 7.00003H5.75ZM4.25 12C4.25 12.4142 4.58579 12.75 5 12.75C5.41421 12.75 5.75 12.4142 5.75 12H4.25ZM19.75 7.00003C19.75 6.58582 19.4142 6.25003 19 6.25003C18.5858 6.25003 18.25 6.58582 18.25 7.00003H19.75ZM18.25 12C18.25 12.4142 18.5858 12.75 19 12.75C19.4142 12.75 19.75 12.4142 19.75 12H18.25ZM5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12H5.75ZM6.914 13.414L6.69463 14.1312C6.70173 14.1334 6.70887 14.1355 6.71603 14.1374L6.914 13.414ZM11.533 14V13.2499L11.5219 13.2501L11.533 14ZM12.466 14L12.4771 13.25H12.466V14ZM17.086 13.414L17.284 14.1374C17.2911 14.1355 17.2983 14.1334 17.3054 14.1312L17.086 13.414ZM19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12H19.75ZM5.75 12C5.75 11.5858 5.41421 11.25 5 11.25C4.58579 11.25 4.25 11.5858 4.25 12H5.75ZM6.914 18.414L6.69463 19.1312C6.70173 19.1334 6.70887 19.1355 6.71603 19.1374L6.914 18.414ZM11.533 19V18.2499L11.5219 18.2501L11.533 19ZM12.466 19L12.4771 18.25H12.466V19ZM17.086 18.414L17.284 19.1374C17.2911 19.1355 17.2983 19.1334 17.3054 19.1312L17.086 18.414ZM19.75 12C19.75 11.5858 19.4142 11.25 19 11.25C18.5858 11.25 18.25 11.5858 18.25 12H19.75ZM5.75 7.00003C5.75 7.05846 5.71815 7.04218 5.81323 6.94645C5.91209 6.84693 6.09951 6.71444 6.41279 6.57069L5.78721 5.20737C5.38349 5.39262 5.02091 5.61563 4.74902 5.88936C4.47335 6.16688 4.25 6.5416 4.25 7.00003H5.75ZM6.38549 6.58257C7.25569 6.22436 8.1731 5.99384 9.10927 5.89814L8.95673 4.40592C7.87675 4.51631 6.8184 4.78225 5.81451 5.19549L6.38549 6.58257ZM9.12515 5.89635C9.9235 5.79751 10.7273 5.74864 11.5317 5.75003L11.5343 4.25003C10.6674 4.24854 9.80121 4.3012 8.94085 4.40771L9.12515 5.89635ZM11.533 5.75003H12.466V4.25003H11.533V5.75003ZM12.4673 5.75003C13.2717 5.74864 14.0755 5.79751 14.8739 5.89635L15.0581 4.40771C14.1978 4.3012 13.3316 4.24854 12.4647 4.25003L12.4673 5.75003ZM14.8898 5.89815C15.8263 5.99376 16.744 6.22428 17.6145 6.58258L18.1855 5.19548C17.1812 4.78214 16.1225 4.5162 15.0422 4.40591L14.8898 5.89815ZM17.5872 6.57069C17.9005 6.71444 18.0879 6.84693 18.1868 6.94645C18.2819 7.04218 18.25 7.05846 18.25 7.00003H19.75C19.75 6.5416 19.5266 6.16688 19.251 5.88936C18.9791 5.61563 18.6165 5.39262 18.2128 5.20737L17.5872 6.57069ZM4.25 7.00003C4.25 7.61363 4.646 8.06864 5.05149 8.36831C5.4717 8.67886 6.03924 8.93076 6.69463 9.13123L7.13337 7.69683C6.56276 7.52229 6.1733 7.3322 5.94301 7.162C5.698 6.98092 5.75 6.91643 5.75 7.00003H4.25ZM6.71603 9.13743C8.28853 9.56776 9.91391 9.77397 11.5441 9.74995L11.5219 8.25011C10.033 8.27205 8.54831 8.0837 7.11197 7.69063L6.71603 9.13743ZM11.533 9.75003H12.466V8.25003H11.533V9.75003ZM12.4549 9.74995C14.0854 9.77407 15.7111 9.56786 17.284 9.13743L16.888 7.69063C15.4514 8.08379 13.9664 8.27214 12.4771 8.25011L12.4549 9.74995ZM17.3054 9.13123C17.9605 8.93084 18.5281 8.67923 18.9484 8.3688C19.3542 8.069 19.75 7.61396 19.75 7.00003H18.25C18.25 6.9171 18.3018 6.98156 18.0571 7.16226C17.8269 7.33233 17.4375 7.52222 16.8666 7.69683L17.3054 9.13123ZM4.25 7.00003V12H5.75V7.00003H4.25ZM18.25 7.00003V12H19.75V7.00003H18.25ZM4.25 12C4.25 12.6136 4.646 13.0686 5.05149 13.3683C5.4717 13.6789 6.03924 13.9308 6.69463 14.1312L7.13337 12.6968C6.56276 12.5223 6.1733 12.3322 5.94301 12.162C5.698 11.9809 5.75 11.9164 5.75 12H4.25ZM6.71603 14.1374C8.28853 14.5678 9.91391 14.774 11.5441 14.7499L11.5219 13.2501C10.033 13.2721 8.54831 13.0837 7.11197 12.6906L6.71603 14.1374ZM11.533 14.75H12.466V13.25H11.533V14.75ZM12.4549 14.7499C14.0854 14.7741 15.7111 14.5679 17.284 14.1374L16.888 12.6906C15.4514 13.0838 13.9664 13.2721 12.4771 13.2501L12.4549 14.7499ZM17.3054 14.1312C17.9605 13.9308 18.5281 13.6792 18.9484 13.3688C19.3542 13.069 19.75 12.614 19.75 12H18.25C18.25 11.9171 18.3018 11.9816 18.0571 12.1623C17.8269 12.3323 17.4375 12.5222 16.8666 12.6968L17.3054 14.1312ZM4.25 12V17H5.75V12H4.25ZM4.25 17C4.25 17.6136 4.646 18.0686 5.05149 18.3683C5.4717 18.6789 6.03924 18.9308 6.69463 19.1312L7.13337 17.6968C6.56276 17.5223 6.1733 17.3322 5.94301 17.162C5.698 16.9809 5.75 16.9164 5.75 17H4.25ZM6.71603 19.1374C8.28853 19.5678 9.91391 19.774 11.5441 19.7499L11.5219 18.2501C10.033 18.2721 8.54831 18.0837 7.11197 17.6906L6.71603 19.1374ZM11.533 19.75H12.466V18.25H11.533V19.75ZM12.4549 19.7499C14.0854 19.7741 15.7111 19.5679 17.284 19.1374L16.888 17.6906C15.4514 18.0838 13.9664 18.2721 12.4771 18.2501L12.4549 19.7499ZM17.3054 19.1312C17.9608 18.9308 18.5283 18.6789 18.9485 18.3683C19.354 18.0686 19.75 17.6136 19.75 17H18.25C18.25 16.9164 18.302 16.9809 18.057 17.162C17.8267 17.3322 17.4372 17.5223 16.8666 17.6968L17.3054 19.1312ZM19.75 17V12H18.25V17H19.75Z" fill="#000000"></path> </g></svg>


      </svg>
  );
};

export default MapaSimu;