import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCamion(props) {

    const handleClose = () => props.setShowM(false);

    const textoFormato = props.ruta && 0 < props.ruta.length ? props.ruta.map(coordenada => `(${coordenada.join(',')})`).join(' => ') : '' ;

    return (
        <>
            {/* {console.log('Ruta pasada: ', props.ruta)} */}
            <Modal size='sm' show={props.showM} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Camion {props.idCamion}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Pedido : {props.idPedido} </p>
                    <p> Ubicación pedido : ({props.ubicacionPedido.x},{props.ubicacionPedido.y})  </p>
                    <p> Ruta : {textoFormato} </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCamion;