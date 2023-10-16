import React from 'react';
import logo from './logo.svg';
import './App.css'; // Asegúrate de que el nombre del archivo CSS sea correcto
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import { Navbar, Nav, Container, Table, Button } from 'react-bootstrap'; // Importa los componentes de react-bootstrap que deseas usar

function App() {
    const camiones = [
        {
            id: 1,
            carga: "080 / 10",
            pedidosAsignados: 10,
            enMantenimiento: "No",
            combustibleDisponible: 10,
            combustibleUsado: 10,
            pedidosActual: 2,
            pedidosAsociados: 2
        },
        {
            id: 2,
            carga: "075 / 12",
            pedidosAsignados: 8,
            enMantenimiento: "Sí",
            combustibleDisponible: 5,
            combustibleUsado: 4,
            pedidosActual: 3,
            pedidosAsociados: 3
        },
        {
            id: 3,
            carga: "090 / 9",
            pedidosAsignados: 12,
            enMantenimiento: "No",
            combustibleDisponible: 8,
            combustibleUsado: 6,
            pedidosActual: 4,
            pedidosAsociados: 5
        }
    ];
    return (
        <div className="App">
            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="#home"  className="custom-navbar-text">SAG</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#OperacionesDiarias" className="custom-navbar-link">Operaciones Diarias</Nav.Link>
                            <Nav.Link href="#Simulacion" className="custom-navbar-link">Simulación</Nav.Link>
                            <Nav.Link href="#Pedidos" className="custom-navbar-link">Pedidos</Nav.Link>
                            <Nav.Link href="#Flota" className="custom-navbar-link">Flota</Nav.Link>
                            <Nav.Link href="#GestionDeUsuarios" className="custom-navbar-link">Gestión De Usuarios</Nav.Link>
                            <Nav.Link href="#Infraestructura" className="custom-navbar-link">Infraestructura</Nav.Link>
                            <Nav.Link href="#Reporte" className="custom-navbar-link">Reporte</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <img src={logo} className="App-logo" alt="logo" />

            <Container className="table-responsive">
                <Navbar expand="xl" className="subcustom-navbar">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#Simulacion/Leyenda">Leyenda</Nav.Link>
                            <Nav.Link href="#Simulacion/Camiones">Camiones</Nav.Link>
                            <Nav.Link href="#Simulacion/Pedidos">Pedidos</Nav.Link>
                            <Nav.Link href="#Simulacion/CargarDatos">Cargar datos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Camión</th>
                        <th>Carga del GLP/Capacidad (m3)</th>
                        <th>Nro. pedidos asignados</th>
                        <th>En mantenimiento</th>
                        <th>Combustible disponible (galón)</th>
                        <th>Combustible usado (galón)</th>
                        <th>Pedidos Actual</th>
                        <th>Pedidos Asociados</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {camiones.map((camion) => (
                        <tr key={camion.id}>
                            <td>{camion.id}</td>
                            <td>{camion.carga}</td>
                            <td>{camion.pedidosAsignados}</td>
                            <td>{camion.enMantenimiento}</td>
                            <td>{camion.combustibleDisponible}</td>
                            <td>{camion.combustibleUsado}</td>
                            <td>{camion.pedidosActual}</td>
                            <td>{camion.pedidosAsociados}</td>
                            <td>
                                <Button variant="primary">Ver</Button>
                            </td>
                        </tr>
                    ))}
                    {/* Agrega más filas de datos aquí */}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default App;
