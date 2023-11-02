import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import "./CargaDeDatos.css";
import axios from 'axios';

function CargaDeDatos() {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:8090/sag-genetico/api/media/upload-pedidos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // Manejar la respuesta del servidor si es necesario
                    console.log('Archivo subido con éxito', response);
                })
                .catch(error => {
                    // Manejar errores si la carga falla
                    console.error('Error al subir el archivo', error);
                });
        } else {
            // Manejar el caso en el que no se haya seleccionado ningún archivo
            console.error('No se ha seleccionado ningún archivo');
        }
    };
    useEffect(() => {
        console.log('file: ', file);
    }, [file]);

    return (
        <div>
            <h1 className="titulo">Carga de Pedidos</h1>

            <div className="grupo-label-control">
                <div className="label">
                    <Form.Label className="titulos-archivos">Pedidos</Form.Label>
                </div>
                <div className="control">
                    <Form.Control type="file" size="sm" onChange={handleFileChange}/>
                </div>
                <Button className="boton-guardar" variant="success" onClick={handleUpload}>
                    Guardar
                </Button>
            </div>

        </div>
    );


}

export default CargaDeDatos;
