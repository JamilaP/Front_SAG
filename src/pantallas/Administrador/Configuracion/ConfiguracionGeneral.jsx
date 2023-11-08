import React from 'react';
import { Button, Form } from "react-bootstrap";
import "./ConfiguracionGeneral.css";
import axios from 'axios';
import { useFileContext } from '../../../Componentes/FileContext';

const fileRoutes = {
    infraestructura: 'station/upload-file',
    flota: 'truck/upload-file',
    bloqueos: 'lockdown/upload-file',
    mantenimiento: 'truck/maintenance/upload-file',
};

function ConfiguracionGeneral() {
    const { selectedFiles, setFile } = useFileContext();

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

            axios.put(apiUrl, formData, {
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
        <div>
            <h1 className="titulo-pagina">Configuración general</h1>

            <div className="contenedor">
                {Object.keys(selectedFiles).map(fieldName => (
                    <div key={fieldName} className="grupo-label-control-general">
                        <div className="label-inf">
                            <Form.Label className="titulos-archivos">{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</Form.Label>
                        </div>
                        <div className="control">
                            <Form.Control type="file" size="sm" onChange={(e) => handleFileChange(e, fieldName)} />
                            <span>{selectedFiles[fieldName] ? selectedFiles[fieldName].name : 'Selecciona un archivo...'}</span>
                        </div>
                        <Button className="boton-guardar" variant="success" onClick={() => handleUpload(fieldName)}>
                            Guardar
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConfiguracionGeneral;
