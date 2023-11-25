import React, {useState,useEffect,useRef} from 'react';
import {Form, Button, Dropdown,DropdownButton, Table, InputGroup, FormControl,Overlay,Tooltip} from 'react-bootstrap';
import "./Pedidos.css";
import ModalResultado from '../../../Componentes/ModalResultado';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import MyOverlay from "../../../Componentes/MyOverlay";

function Pedidos() {
    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable
    const [modal, setModal] = useState({text: "", exito: true, open: false});
    const [pedidos, setPedidos] = useState([]);
    const [orderIdCounter, setOrderIdCounter] = useState(1);
    const [actualizarPedidos, setActualizarPedidos] = useState(false);
    const [tooltipX, setTooltipX] = useState(false);
    const [tooltipY, setTooltipY] = useState(false);
    const [tooltipGLP, setTooltipGLP] = useState(false);
    const [tooltipHL, setTooltipHL] = useState(false);
    const coordenadaRefX = useRef(null);
    const coordenadaRefY = useRef(null);
    const coordenadaRefGLP = useRef(null);
    const coordenadaRefHL = useRef(null);
    const {fileSelect, setFileSelect} = useState(null);
    let formatoHoraActual;

    const [newPedido, setNewPedido] = useState({
        GLPsolicitado: 0,
        coordenadaX: 0,
        coordenadaY: 0,
        limiteHoras: 0,
    })

    /*
    //obtener pedidos
     useEffect(() => {
        try {
            // Hacer la solicitud GET a una URL específica
            const response = axios.get('http://localhost:8090/sag-genetico/api/daily-operations/orders');
            // Manejar la respuesta
            console.log('Datos recibidos:', response.data);
            setPedidos(response.data);
        } catch (error) {
            // Manejar los errores
            console.error('Error al realizar la solicitud GET:', error);
        }
    }, [actualizarPedidos]); // Dependencia para el useEffect
*/

    //agregar pedido
    const agregarPedido = () => {
        //validaciones
        if (newPedido.coordenadaX == 0 || newPedido.coordenadaY == 0 || newPedido.GLPsolicitado == 0 || newPedido.limiteHoras == 0) {
            setModal((e) => ({
                ...e,
                text: "Debe llenar todos los campos",
                exito: false,
                open: true,
            }));
            return;
        }
        if (newPedido.coordenadaX < 0 && newPedido.coordenadaX > 51) {
            setModal((e) => ({
                ...e,
                text: "Debe ingresar una coordenada del 1 al 50",
                exito: false,
                open: true,
            }));
            return;
        }
        if (newPedido.coordenadaY < 0 || newPedido.coordenadaY > 71) {
            setModal((e) => ({
                ...e,
                text: "Debe ingresar una coordenada del 1 al 70",
                exito: false,
                open: true,
            }));
            return;
        }
        if (newPedido.GLPsolicitado <= 0) {
            setModal((e) => ({
                ...e,
                text: "Debe ingresar una cantidad positiva de GLP",
                exito: false,
                open: true,
            }));
            return;
        }
        if (newPedido.limiteHoras < 4) {
            setModal((e) => ({
                ...e,
                text: "Debe ingresar un valor mayor a 4 horas",
                exito: false,
                open: true,
            }));
            return;
        }

        //para enbiar al back
        /*let newPedidoCopy = {...newPedido};
        newPedidoCopy.location.x = newPedido.coordenadaX;
        newPedidoCopy.requestedGLP = newPedido.coordenadaY;
        newPedidoCopy.deadlineHours = newPedido.limiteHoras;
        newPedidoCopy.registrationDateTime = new Date().toISOString().replace("T", " ");*/

        const AuxX = String(newPedido.coordenadaX).padStart(2, '0');
        const AuxY = String(newPedido.coordenadaY).padStart(2, '0');
        const AuxNodeId = `${AuxX}${AuxY}`;

        const horaActual = new Date();
        formatoHoraActual = `${horaActual.getFullYear()}-${(horaActual.getMonth() + 1).toString().padStart(2, '0')}-${horaActual.getDate().toString().padStart(2, '0')}T${horaActual.getHours().toString().padStart(2, '0')}:${horaActual.getMinutes().toString().padStart(2, '0')}:00`;
        console.log('Fecha ACTUAL: ', formatoHoraActual);

        const newPedidoCopy = {
            orderId: orderIdCounter, // Generado
            registrationDateTime: formatoHoraActual, // Fecha actual con segundos en "00"
            customerId: `c-${uuidv4()}`, // Generado
            requestedGLP: newPedido.GLPsolicitado,
            deadlineHours: newPedido.limiteHoras,
            location: {
                nodeId: AuxNodeId,
                x: AuxX,
                y: AuxY,
                fcost: 0
            }
        };

        // Incrementa el contador para la próxima vez
        setOrderIdCounter(orderIdCounter + 1);

        // Realiza la solicitud POST al backend
        axios.post('http://localhost:8090/sag-genetico/api/daily-operations/order', newPedidoCopy)
            .then(response => {
                console.log(response.data);  // Puedes manejar la respuesta del backend aquí
                setModal((e) => ({
                    ...e,
                    text: "Se registro el pedido con exito",
                    exito: true,
                    open: true,
                }));
                // Cambia el estado para activar el useEffect
                setActualizarPedidos(prev => !prev);

                // Limpiar los campos del formulario
                setNewPedido((e) => ({
                    ...e,
                    GLPsolicitado: "",
                    coordenadaX: "",
                    coordenadaY: "",
                    limiteHoras: "",
                }));
            })
            .catch(error => {
                console.error('Error al enviar el pedido:', error);
                // Puedes manejar el error de alguna manera
                setModal((e) => ({
                    ...e,
                    text: "Ocurrio un error, no se pudo registrar el pedido",
                    exito: false,
                    open: true,
                }));
            });


    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            localStorage.setItem('fileName_pedidos', file.name);
            setFileSelect(file.name);
        } else {
            localStorage.removeItem('fileName_pedidos');
            setFileSelect('Selecciona un archivo...');
        }
    };
    const handleUpload = () => {
        const file = fileSelect;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const apiUrl = `http://localhost:8090/sag-genetico/api/order/upload-file`;

            axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    setModal(e => ({...e, text: "Se subio el archivo con exito", exito: true, open: true}));
                    // Cambia el estado para activar el useEffect
                    setActualizarPedidos(prev => !prev);
                    console.log(`Archivo de pedidos se subido con éxito`, response);
                })
                .catch(error => {
                    setModal(e => ({...e, text: "No se pudo subir el archivo", exito: false, open: true}));
                    console.error(`Error al subir el archivo pedidos`, error);
                });
        } else {
            setModal(e => ({...e, text: "No se ha seleccionado ningun archivo", exito: false, open: true}));
            console.error(`No se ha seleccionado ningún archivo `);
        }

    };

    // Función para filtrar los pedidos según los filtros aplicados
    const pedidosFiltrados = pedidos.filter(pedido => {
        // Filtrar por texto
        const coincideIDPedido = pedido.idPedido.toString().includes(filtroIDPedido);
        const coincideIDCliente = pedido.idCliente.toString().includes(filtroIDCliente);
        // Filtrar por opción
        const coincideOpcion = (filtroOpcion === 'Todos' || pedido.estado === filtroOpcion);

        return coincideIDPedido && coincideIDCliente && coincideOpcion;
    });


    return (
        <div className="registroPedidos">
            <ModalResultado isOpen={modal.open} mensaje={modal.text} exito={modal.exito}
                            closeModal={() => setModal(e => ({...e, open: false}))}/>

            <h1 className="titulo">Registrar Pedido</h1>
            <Form className="contenedor-registro-pedido">
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Coordenada del Pedido:</Form.Label>
                    <MyOverlay target={coordenadaRefX.current} show={tooltipX} placement="right" text="Ingrese un número entre 0 y 50."/>
                    <Form.Control ref={coordenadaRefX} className="input-small" type="number"
                                  placeholder="Ingrese la coordenada X" onMouseEnter={() => setTooltipX(true)}
                                  onMouseLeave={() => setTooltipX(false)}
                                  onChange={(e) => setNewPedido((prev) => ({ ...prev, coordenadaX: e.target.value }))}/>
                    <MyOverlay target={coordenadaRefY.current} show={tooltipY} placement="right" text="Ingrese un número entre 0 y 70."/>
                    <Form.Control ref={coordenadaRefY} className="input-small" type="number"
                                  placeholder="Ingrese la coordenada Y" onMouseEnter={() => setTooltipY(true)}
                                  onMouseLeave={() => setTooltipY(false)}
                                  onChange={(e) => setNewPedido((prev) => ({ ...prev, coordenadaY: e.target.value }))}/>
                </Form.Group>

                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">GLP Solicitado:</Form.Label>
                    <Form.Control className="input" type="number" placeholder="Ingrese la cantidad de GLP"
                                  onChange={(e) => setNewPedido((prev) => ({ ...prev, GLPsolicitado: e.target.value }))}/>
                </Form.Group>
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Plazo limite de entrega en horas:</Form.Label>
                    <MyOverlay target={coordenadaRefHL.current} show={tooltipHL} placement="right" text="El plazo mínimo es 4 horas"/>
                    <Form.Control ref={coordenadaRefHL} className="input" type="number"
                                  placeholder="Ingrese la cantidad de horas limte de entrega" onMouseEnter={() => setTooltipHL(true)}
                                  onMouseLeave={() => setTooltipHL(false)}
                                  onChange={(e) => setNewPedido((prev) => ({ ...prev, limiteHoras: e.target.value }))}/>
                    <Button className="boton-accion" onClick={agregarPedido}>
                        Registrar
                    </Button>
                </Form.Group>
            </Form>

            <h1 className="titulo">Subir pedidos</h1>
            <Form className="contenedor-registro-pedido">
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Ingrese el archivo de pedidos:</Form.Label>
                    <Form.Group className="input-nombreArchivo">
                        <Form.Control className="input" type="file" onChange={handleFileChange}/>
                        <span className="nombre-archivo">
                            {fileSelect ? localStorage.getItem(`fileName_pedidos`) : 'Selecciona un archivo...'}
                        </span>
                    </Form.Group>
                    <Button className="boton-accion" onClick={handleUpload}>
                        Guardar
                    </Button>
                </Form.Group>
            </Form>

            <h1 className="titulo">Pedidos</h1>

            <div className="barra-busqueda-pedidos">
                <div className="grupo-texto-input">
                    <div className="texto-busqueda">Búsqueda por pedido:</div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar por ID de pedido"
                            value={filtroIDPedido}
                            onChange={(e) => setFiltroIDPedido(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="grupo-texto-input">
                    <div className="texto-busqueda">Búsqueda por cliente:</div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar por ID de cliente"
                            value={filtroIDCliente}
                            onChange={(e) => setFiltroIDCliente(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="grupo-texto-input">
                    <div className="texto-busqueda">Seleccione el estado:</div>
                    <DropdownButton className="dropdown-busqueda" id="dropdown-basic-button" title={filtroOpcion}>
                        <Dropdown.Item onClick={() => setFiltroOpcion('Todos')}>Todos</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFiltroOpcion('Atendido')}>Atendido</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFiltroOpcion('En camino')}>En camino</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <div className="tabla-pedidos">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Id-cliente</th>
                        <th>Ubicación</th>
                        <th>Fecha y hora de llegada solicitada</th>
                        <th>Plazo (horas)</th>
                        <th>Cantidad de GLP solicitado (m3)</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pedidosFiltrados && pedidosFiltrados.length > 0 ? (
                        pedidosFiltrados.map((pedido) => (
                            <tr key={pedido.idPedido}>
                                <td>{pedido.idPedido}</td>
                                <td>{pedido.idCliente}</td>
                                <td>{pedido.ubicacion}</td>
                                <td>{pedido.fechaHoraSolicitada}</td>
                                <td>{pedido.plazoHoras}</td>
                                <td>{pedido.cantidadGLPSolicitado}</td>
                                <td>{pedido.estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No hay pedidos.</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Pedidos;