import React, { useEffect, useRef, useState } from 'react';
import anime from "animejs";

function Component2(props) {

    const inicioX = 10 ;
    const inicioY = 10;
    const flechaStr = inicioX + ',' + inicioY + ' '
      + (inicioX - 10) + ',' + (inicioY+5) + ' '
      + (inicioX - 8) + ',' + (inicioY) + ' '
      + (inicioX - 10) + ',' + (inicioY-5);

    const [poligonos, setPoligonos] = useState([]);
    const [mover, setMover] = useState(false);
    const poligonosRef = useRef([]);
    const reportado = useRef(false);   

    useEffect(() => {
      console.log('ejecutando creacion');
      const nuevosPoligonos = [];
      for (let i = 0; i < 3; i++) {
        nuevosPoligonos.push(
//           <svg className='hola' key={i} ref={(el) => (poligonosRef.current[i] = el)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g clip-path="url(#clip0_4960_1061)">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M3.27586e-09 5.25C3.27586e-09 4.65326 0.237053 4.08097 0.65901 3.65901C1.08097 3.23705 1.65326 3 2.25 3H15.75C16.3467 3 16.919 3.23705 17.341 3.65901C17.7629 4.08097 18 4.65326 18 5.25V7.5H19.53C19.8671 7.5003 20.1998 7.57635 20.5036 7.72252C20.8074 7.86869 21.0744 8.08125 21.285 8.3445L23.5065 11.1195C23.8261 11.5188 24.0002 12.015 24 12.5265V15.75C24 16.3467 23.7629 16.919 23.341 17.341C22.919 17.7629 22.3467 18 21.75 18H21C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21C17.2044 21 16.4413 20.6839 15.8787 20.1213C15.3161 19.5587 15 18.7956 15 18H7.5C7.50086 18.3999 7.42177 18.7959 7.26738 19.1648C7.11299 19.5336 6.88642 19.8679 6.60097 20.148C6.31553 20.428 5.97698 20.6481 5.60523 20.7955C5.23348 20.9428 4.83603 21.0143 4.43624 21.0058C4.03645 20.9973 3.6424 20.909 3.27724 20.746C2.91209 20.583 2.5832 20.3486 2.30992 20.0567C2.03664 19.7648 1.82447 19.4212 1.6859 19.0461C1.54733 18.671 1.48514 18.272 1.503 17.8725C1.06357 17.7178 0.682984 17.4306 0.413766 17.0504C0.144548 16.6702 -2.51279e-05 16.2159 3.27586e-09 15.75L3.27586e-09 5.25ZM1.941 16.434C2.2122 15.99 2.59427 15.6242 3.04965 15.3725C3.50503 15.1209 4.01805 14.9921 4.53829 14.9987C5.05853 15.0054 5.56809 15.1473 6.01688 15.4105C6.46567 15.6737 6.83825 16.0492 7.098 16.5H15.402C15.6659 16.0444 16.0444 15.6659 16.5 15.402V5.25C16.5 5.05109 16.421 4.86032 16.2803 4.71967C16.1397 4.57902 15.9489 4.5 15.75 4.5H2.25C2.05109 4.5 1.86032 4.57902 1.71967 4.71967C1.57902 4.86032 1.5 5.05109 1.5 5.25V15.75C1.49988 15.8944 1.54143 16.0357 1.61966 16.157C1.69788 16.2783 1.80946 16.3745 1.941 16.434ZM18 15C18.5266 15 19.0439 15.1386 19.5 15.4019C19.956 15.6652 20.3347 16.044 20.598 16.5H21.75C21.9489 16.5 22.1397 16.421 22.2803 16.2803C22.421 16.1397 22.5 15.9489 22.5 15.75V12.525C22.4997 12.3548 22.4415 12.1898 22.335 12.057L20.115 9.282C20.0449 9.19416 19.9559 9.12321 19.8546 9.0744C19.7533 9.02559 19.6424 9.00016 19.53 9H18V15ZM4.5 16.5C4.10218 16.5 3.72064 16.658 3.43934 16.9393C3.15804 17.2206 3 17.6022 3 18C3 18.3978 3.15804 18.7794 3.43934 19.0607C3.72064 19.342 4.10218 19.5 4.5 19.5C4.89782 19.5 5.27936 19.342 5.56066 19.0607C5.84196 18.7794 6 18.3978 6 18C6 17.6022 5.84196 17.2206 5.56066 16.9393C5.27936 16.658 4.89782 16.5 4.5 16.5ZM18 16.5C17.6022 16.5 17.2206 16.658 16.9393 16.9393C16.658 17.2206 16.5 17.6022 16.5 18C16.5 18.3978 16.658 18.7794 16.9393 19.0607C17.2206 19.342 17.6022 19.5 18 19.5C18.3978 19.5 18.7794 19.342 19.0607 19.0607C19.342 18.7794 19.5 18.3978 19.5 18C19.5 17.6022 19.342 17.2206 19.0607 16.9393C18.7794 16.658 18.3978 16.5 18 16.5Z" fill="black"/>
// </g>
// <defs>
// <clipPath id="clip0_4960_1061">
// <rect width="24" height="24" fill="white"/>
// </clipPath>
// </defs>
// </svg>
          // <svg key={i} ref={(el) => (poligonosRef.current[i] = el)}><circle cx={0} cy= {0}  r="4" fill="blue"  /> </svg>
          
          <polygon key={i} className="hola" points={flechaStr} ref={(el) => (poligonosRef.current[i] = el)} />
        );
      }
      setPoligonos(nuevosPoligonos);
      setMover(true);
    }, []);
  
    useEffect(() => {
      const inicioY = [0,50,200];
      const inicioX = [10,50,100];      
      const movimientosY = [0,100,100];
      const movimientosX = [80,50,100];

      if(mover){
        console.log('ejecutando animacion');
        let animacion = anime({
          targets: '.hola',
          easing: "linear",
          autoplay: false,
          translateY: function(target, index){
            return [inicioY[index] , movimientosY[index]];
          },
          translateX: function(target, index){
            return [inicioX[index], movimientosX[index]];
          },
          duration: 5000,
          rotate: 90,
          // delay: anime.stagger(100)
        });

        animacion.finished.then(() => {
          reportar();
        });        
        animacion.play();
      }              
    }, [mover]);

    function reportar() {
      console.log('Pasar al siguiente');
    }

  return (
    <svg className='mapa' width={500} height={500} >
      {poligonos}
    </svg>
  );
}

export default Component2