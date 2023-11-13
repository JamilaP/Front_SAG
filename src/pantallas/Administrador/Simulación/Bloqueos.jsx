import { useEffect, useRef } from "react";
import anime from "animejs";

function RutaBloqueo(props) {
    let rutaconvertida = props.rutaBloqueo.map(({ x, y }) => [x*14 + 7, (50 - y)*14 + 7]);
    const pathData = rutaconvertida ? `M${rutaconvertida.join(' L')}` : '';

    return (
        // <>
        // {
        //   console.log(pathData)
        // }
        // </>
        <svg>
          <path d={pathData} fill="transparent" stroke="rgba(209, 40, 59, 0.8)" strokeWidth="4" />
        </svg>  
    );
}

export default RutaBloqueo;