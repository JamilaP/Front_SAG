import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import "./CargaDeDatos.css";
import axios from 'axios';
import ModalResultado from "../../../Componentes/ModalResultado";


function CargaDeDatos(props) {

    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState("2023-03-13"); // Valor inicial
    const [modal, setModal] = useState({ text: "", exito: true, open: false });
    const [nombreArchivo, setNombreArchivo] = useState('No subio archivo');

    useEffect(() => {
        // Al cargar la página, intenta obtener el nombre del archivo desde el almacenamiento local
        const storedFileName = localStorage.getItem('nombreArchivo');
        if (storedFileName) {
            setNombreArchivo(storedFileName);
        }
    }, []);

    const handleDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        props.onStartDateChange(newStartDate); // Llamar a la función en Simulacion para actualizar la fecha
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile( selectedFile ? selectedFile.name : "No subio archivo");
        setNombreArchivo(selectedFile ? selectedFile.name : "No subio archivo");
        props.onFileUpload(selectedFile);
        localStorage.setItem('nombreArchivo', selectedFile ? selectedFile.name : "No subio archivo");
    };

    const handleUpload = () => {
        props.conectarWS();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            /*
            axios.post('http://localhost:8090/sag-genetico/api/order/upload-file', formData, {
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
                });*/
        } else {
            // Manejar el caso en el que no se haya seleccionado ningún archivo
            console.error('No se ha seleccionado ningún archivo');
            setModal(e => ({ ...e, text: "Debe subir un archivo", exito: false, open: true }));
        }
    };
    useEffect(() => {
        console.log('file: ', file);
    }, [file]);


    return (
        <div>
            <ModalResultado isOpen={modal.open} mensaje={modal.text} exito={modal.exito} closeModal={() => setModal(e => ({ ...e, open: false }))} />
            <h1 className="titulo">Carga de Pedidos</h1>

            <div className="contenido">
                <Form className="form-grupo">
                    <Form.Group as={Row} className="fila">
                        <Col className="columna-1"><Form.Label className="label-right">Fecha de inicio de la
                            simulación:</Form.Label></Col>
                        <Col className="columna-2"><Form.Control type="date" value={startDate}
                                                                 onChange={handleDateChange}/></Col>
                    </Form.Group>
                    {/*<Form.Group as={Row} className="fila">
                        <Col className="columna-1"><Form.Label className="label-right">Pedidos:</Form.Label></Col>
                        <Col className="columna-2"><Form.Control type="file" multiple onChange={handleFileChange}/></Col>
                        <p>{nombreArchivo}</p>
                    </Form.Group>
                    <div className="seccion-boton">
                        <Button className="boton-guardar" variant="success" onClick={handleUpload}>Guardar</Button>
                    </div>*/}
                </Form>
            </div>
        </div>
    );


}

export default CargaDeDatos;
