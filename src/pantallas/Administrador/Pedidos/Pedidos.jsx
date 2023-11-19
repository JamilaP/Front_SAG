import React, {useState} from 'react';
import {Form, Button, Dropdown,DropdownButton, Table, InputGroup, FormControl} from 'react-bootstrap';
import "./Pedidos.css";

const generarFechaAleatoria = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + Math.floor(Math.random() * 10));
    fecha.setHours(Math.floor(Math.random() * 24));
    fecha.setMinutes(Math.floor(Math.random() * 60));
    return fecha.toISOString().replace("T", " ");
};

const generarPedidosAleatorios = (cantidad) => {
    const pedidosGenerados = [];

    for (let i = 1; i <= cantidad; i++) {
        const nuevoPedido = {
            idPedido: i,
            idCliente: 100 + i,
            ubicacion: `Lugar ${i}`,
            fechaHoraSolicitada: generarFechaAleatoria(),
            plazoHoras: Math.floor(Math.random() * 48) + 1,
            cantidadGLPSolicitado: Math.floor(Math.random() * 15) + 1,
            estado: i % 2 === 0 ? "En camino" : "Atendido",
        };

        pedidosGenerados.push(nuevoPedido);
    }

    return pedidosGenerados;
};

const pedidos = generarPedidosAleatorios(3);


function Pedidos() {
    const [filtroIDPedido, setFiltroIDPedido] = useState(''); // Estado para el filtro de ID de pedido
    const [filtroIDCliente, setFiltroIDCliente] = useState(''); // Estado para el filtro de ID de cliente
    const [filtroOpcion, setFiltroOpcion] = useState('Todos'); // Estado para el filtro del menú desplegable

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

            <h1 className="titulo">Registrar Pedido</h1>
            <Form className="contenedor-registro-pedido">
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Coordenada del Pedido:</Form.Label>
                    <Form.Control className="input" type="text" placeholder="Ingrese la coordenada (X;Y)"/>
                </Form.Group>
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">GLP Solicitado:</Form.Label>
                    <Form.Control className="input" type="text" placeholder="Ingrese la cantidad de GLP"/>
                </Form.Group>
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Plazo limite de entrega en horas:</Form.Label>
                    <Form.Control className="input" type="number" placeholder="Ingrese la cantidad de horas limte de entrega"/>
                    <Button className="boton-accion">
                        Registrar
                    </Button>
                </Form.Group>
            </Form>

            <h1 className="titulo">Subir pedidos</h1>
            <Form className="contenedor-registro-pedido">
                <Form.Group className="contendedor-texto-input">
                    <Form.Label className="texto-input">Ingrese el archivo de pedidos:</Form.Label>
                    <Form.Group className="input-nombreArchivo">
                        <Form.Control className="input" type="file"/>
                        <span className="nombre-archivo">nombre</span>
                    </Form.Group>
                    <Button className="boton-accion">
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
                    {pedidos.map((pedido) => (
                        <tr key={pedido.idPedido}>
                            <td>{pedido.idPedido}</td>
                            <td>{pedido.idCliente}</td>
                            <td>{pedido.ubicacion}</td>
                            <td>{pedido.fechaHoraSolicitada}</td>
                            <td>{pedido.plazoHoras}</td>
                            <td>{pedido.cantidadGLPSolicitado}</td>
                            <td>{pedido.estado}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Pedidos;