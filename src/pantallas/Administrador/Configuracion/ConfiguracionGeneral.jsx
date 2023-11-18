import React from 'react';
import {Button, Form} from "react-bootstrap";
import "./ConfiguracionGeneral.css";
import axios from 'axios';
import {useFileContext} from '../../../Componentes/FileContext';

const fileRoutes = {
    infraestructura: 'station/upload-file',
    flota: 'truck/upload-file',
    bloqueos: 'lockdown/upload-file',
    mantenimiento: 'truck/maintenance/upload-file',
};

function ConfiguracionGeneral() {
    const {selectedFiles, setFile} = useFileContext();

    const handleFileChange = (e, fieldName) => {
        const selectedFile = e.target.files[0];
        setFile(fieldName, selectedFile);
    };

    const handleUpload = (fieldName) => {
        const file = selectedFiles[fieldName];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const apiUrl = `http://localhost:8090/sag-genetico/api/${fileRoutes[fieldName]}`;

            axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log(`Archivo ${fieldName} subido con éxito`, response);
                })
                .catch(error => {
                    console.error(`Error al subir el archivo ${fieldName}`, error);
                });
        } else {
            console.error(`No se ha seleccionado ningún archivo para ${fieldName}`);
        }
    };

    return (
        <div className="configuracionGeneral">

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
                                className="nombre-archivo">{selectedFiles[fieldName] ? selectedFiles[fieldName].name : 'Selecciona un archivo...'}</span>
                        </Form.Group>
                        <Button className="boton-accion" onClick={() => handleUpload(fieldName)}>
                            Guardar
                        </Button>
                    </Form.Group>
                ))}
            </Form>

        </div>
    );
}

export default ConfiguracionGeneral;
