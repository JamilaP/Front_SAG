import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import "./ConfiguracionGeneral.css";
import axios from 'axios';
import {useFileContext} from '../../../Componentes/FileContext';
import ModalResultado from "../../../Componentes/ModalResultado";

const fileRoutes = {
    infraestructura: 'station/upload-file',
    flota: 'truck/upload-file',
    bloqueos: 'lockdown/upload-file',
    mantenimiento: 'truck/maintenance/upload-file',
};

function ConfiguracionGeneral() {
    const {selectedFiles, setFile} = useFileContext();
    const [modal, setModal] = useState({text: "", exito: true, open: false});
    const [file, setFileOrder] = useState(null);
    const [orderFileName, setOrderFileName] = useState(localStorage.getItem('fileName_order') || 'Selecciona un archivo...');

    const handleFileChange = (e, fieldName) => {
        const selectedFile = e.target.files[0];
        setFile(fieldName, selectedFile);

        localStorage.setItem(`fileName_${fieldName}`, selectedFile.name);
    };

    const handleUpload = (fieldName) => {
        const file = selectedFiles[fieldName];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const apiUrl = `http://localhost:8090/sag-genetico/api/${fileRoutes[fieldName]}`;
            // Verificar si es para la ruta de mantenimiento
            const method = fieldName === 'mantenimiento' ? 'put' : 'post';

            axios[method](apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    setModal(e => ({...e, text: "Se subio el archivo con exito", exito: true, open: true}));
                    console.log(`Archivo ${fieldName} subido con éxito`, response);
                })
                .catch(error => {
                    setModal(e => ({...e, text: "No se pudo subir el archivo", exito: false, open: true}));
                    console.error(`Error al subir el archivo ${fieldName}`, error);
                });
        } else {
            setModal(e => ({...e, text: "No se ha seleccionado ningun archivo", exito: false, open: true}));
            console.error(`No se ha seleccionado ningún archivo para ${fieldName}`);
        }

    };

    const handleUploadOrder = () => {
        const file = selectedFiles['order'];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:8090/sag-genetico/api/order/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // Manejar la respuesta del servidor si es necesario
                    console.log('Archivo subido con éxito', response);
                    setModal(e => ({ ...e, text: "Archivo subido con exito", exito: true, open: true }));
                })
                .catch(error => {
                    // Manejar errores si la carga falla
                    console.error('Error al subir el archivo', error);
                });
        } else {
            // Manejar el caso en el que no se haya seleccionado ningún archivo
            console.error('No se ha seleccionado ningún archivo');
            setModal(e => ({ ...e, text: "Debe subir un archivo", exito: false, open: true }));
        }
    };

    return (
        <div className="configuracionGeneral">
            <ModalResultado isOpen={modal.open} mensaje={modal.text} exito={modal.exito}
                            closeModal={() => setModal(e => ({...e, open: false}))}/>

            <h1 className="titulo">Configuración general</h1>
            <Form className="contenedor-registro-pedido">
                {Object.keys(selectedFiles).map(fieldName => (
                    <Form.Group key={fieldName} className="contendedor-texto-input">
                        <Form.Label className="texto-input">Ingrese el archivo
                            de {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</Form.Label>
                        <Form.Group className="input-nombreArchivo">
                            <Form.Control className="input" type="file"
                                          onChange={(e) => handleFileChange(e, fieldName)}/>
                            <span
                                className="nombre-archivo">
                               {selectedFiles[fieldName]
                                   ? selectedFiles[fieldName].name
                                   : localStorage.getItem(`fileName_${fieldName}`) || 'Selecciona un archivo...'}
                            </span>
                        </Form.Group>
                        <Button className="boton-accion" onClick={() => handleUpload(fieldName)}>
                            Guardar
                        </Button>
                    </Form.Group>
                ))}
            </Form>

            <h1 className="titulo">Proyección de pedidos</h1>
            <Form className="contenedor-registro-pedido">
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Ingrese el archivo de pedidos</Form.Label>
                    <Form.Group className="input-nombreArchivo">
                        <Form.Control className="input" type="file"
                                      onChange={(e) => {
                                          handleFileChange(e, 'order');
                                          setOrderFileName(e.target.files[0] ? e.target.files[0].name : 'Selecciona un archivo...');
                                      }}/>
                        <span
                            className="nombre-archivo">
                               {orderFileName}
                            </span>
                    </Form.Group>
                    <Button className="boton-accion" onClick={handleUploadOrder}>
                        Guardar
                    </Button>
                </Form.Group>
            </Form>

        </div>
    );
}

export default ConfiguracionGeneral;
