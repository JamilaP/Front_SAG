// Component1.js
import React, { useEffect, useState } from 'react';
import Component2 from './Componente2';

function Component1() {
  const [animar, setAnimar] = useState(false);

  const pasarAnimar = ( ) => {
    // console.log('Animando');
    setAnimar(true);
  };
  const limpiarAnimar = ( ) => {
    // console.log('Limpiando');
    setAnimar(false);
  };

  // useEffect(() => {
  //   console.log('useEffect en Component1');
  //   pasarAnimar();
  //   return () => {
  //       console.log('Limpiar Component1');
  //   };
  // }, []);

  return (
    <div>
      <button onClick={pasarAnimar}> play </button>
      <p>Contenido de Component1</p>
      <Component2 ani={animar} limp={limpiarAnimar}/>
    </div>
  );
}

export default Component1;
