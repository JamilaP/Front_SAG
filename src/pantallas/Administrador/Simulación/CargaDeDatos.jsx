import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import "./CargaDeDatos.css";
import axios from 'axios';

function CargaDeDatos(props) {

    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState("2023-04-20"); // Valor inicial

    const handleDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        props.onStartDateChange(newStartDate); // Llamar a la función en Simulacion para actualizar la fecha
    };

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

            <div className="contenido">
                <Form className="form-grupo">
                    <Form.Group as={Row} className="fila">
                        <Col className="columna-1"><Form.Label className="label-right">Fecha de inicio de la simulación:</Form.Label></Col>
                        <Col className="columna-2"><Form.Control type="date" value={startDate} onChange={handleDateChange} /></Col>
                    </Form.Group>
                    <Form.Group as={Row} className="fila">
                        <Col className="columna-1"><Form.Label className="label-right">Pedidos:</Form.Label></Col>
                        <Col className="columna-2"><Form.Control type="file" onChange={handleFileChange}/></Col>
                    </Form.Group>
                    <div className="seccion-boton">
                        <Button className="boton-guardar" variant="success" onClick={handleUpload}>Guardar</Button>
                    </div>
                </Form>
            </div>
        </div>
);


}

export default CargaDeDatos;
