import React, {useEffect, useState} from 'react';
import {Button , Form} from "react-bootstrap";
import "./Infraestructura.css";
import axios from 'axios';
import { useFileContext } from '../../../Componentes/FileContext';

function Infraestructura() {
    const [files, setFiles] = useState({
        infraestructura: null,
        flota: null,
        bloqueos: null,
        mantenimiento: null
    });

    const { selectedFiles, setFile } = useFileContext();

    /*
    const handleFileChange = (e, fieldName) => {
        // Manejar cambios en el input de archivo y guardar el archivo seleccionado en el estado
        const selectedFile = e.target.files[0];
        setFiles({
            ...files,
            [fieldName]: selectedFile
        });
    };*/

    const handleFileChange = (e, fieldName) => {
        const selectedFile = e.target.files[0];
        setFile(fieldName, selectedFile);

    };

    const handleUpload = (fieldName) => {
        //const file = files[fieldName];
        const file = selectedFiles[fieldName];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post(`http://localhost:8090/sag-genetico/api/media/upload-${fieldName}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // Manejar la respuesta del servidor si es necesario
                    console.log(`Archivo ${fieldName} subido con éxito`, response);
                })
                .catch(error => {
                    // Manejar errores si la carga falla
                    console.error(`Error al subir el archivo ${fieldName}`, error);
                });
        } else {
            // Manejar el caso en el que no se haya seleccionado ningún archivo
            console.error(`No se ha seleccionado ningún archivo para ${fieldName}`);
        }
    };

    return (
        <div>
            <h1 className="titulo-pagina">Configuración general</h1>

            <div className="contenedor">
                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Infraestructura</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm"
                                      onChange={(e) => handleFileChange(e, 'infraestructura')}
                        />
                        <span>
  {selectedFiles.infraestructura ? selectedFiles.infraestructura.name : 'Selecciona un archivo...'}
</span>
                    </div>
                    <Button className="boton-guardar" variant="success" onClick={() => handleUpload('infraestructura')}>
                        Guardar
                    </Button>
                </div>

                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Flota</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" onChange={(e) => handleFileChange(e, 'flota')}/>
                    </div>
                    <Button className="boton-guardar" variant="success" onClick={() => handleUpload('flota')}>
                        Guardar
                    </Button>

                </div>

                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Bloqueos</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" onChange={(e) => handleFileChange(e, 'bloqueos')}/>
                    </div>
                    <Button className="boton-guardar" variant="success" onClick={() => handleUpload('bloqueos')}>
                        Guardar
                    </Button>
                </div>

                <div className="grupo-label-control-general">
                    <div className="label-inf">
                        <Form.Label className="titulos-archivos">Mantenimiento</Form.Label>
                    </div>
                    <div className="control">
                        <Form.Control type="file" size="sm" onChange={(e) => handleFileChange(e, 'mantenimiento')}/>
                    </div>
                    <Button className="boton-guardar" variant="success" onClick={() => handleUpload('mantenimiento')}>
                        Guardar
                    </Button>
                </div>

            </div>



        </div>
    );
}

export default Infraestructura;