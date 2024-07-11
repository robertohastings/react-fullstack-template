import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Table, Button, Pagination, Spinner, Image } from "react-bootstrap"
//import { Navigate } from "react-router-dom"
import Page from "../../Page"

function ListCategorias() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(0)
    const [isLoading, setIsLoaging] = useState(false)
    //const history = useHistory()

    useEffect(() => {
        setIsLoaging(true)
        setRowsPerPage(5)
        const fetchProducts = async () => {
            try {
                const response = await Axios.get("/api/getCategoriasListado", {
                    params: { limite: rowsPerPage, pagina: currentPage }
                })
                console.log("response:", response)
                setData(response.data.categorias)
                setTotalRecords(response.data.totalRegistros)
            } catch (error) {
                console.error("There was an error fetching the products!", error)
            } finally {
                setIsLoaging(false)
            }
        }

        fetchProducts()
    }, [currentPage])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <Page title="ABC Categorias">
            <h3>ABC Categorias</h3>

            <Button className="my-3" size="sm" variant="outline-primary" onClick={() => {}}>
                Agregar
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>F. Actualización</th>
                        <th>Activo</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                {isLoading && (
                    <>
                        <div className="d-flex justify-content-center">
                            <Spinner animation="grow" />
                        </div>
                    </>
                )}
                {!isLoading && (
                    <tbody>
                        {data.map(row => (
                            <tr key={row.id_categoria}>
                                <td className="align-content-center">{row.id_categoria}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center">{row.descripcion}</td>
                                <td className="align-content-center">{row.fecha_actualizacion}</td>
                                <td className="align-content-center">{row.activo}</td>
                                <td>
                                    <Image style={{ height: "80px", width: "80px" }} src={row.imagen !== null ? row.imagen : "https://fiestatijuana.mx/image-not-available.png"} thumbnail />
                                </td>
                                <td className="align-content-center">
                                    <Button size="sm" variant="warning" onClick={() => {}}>
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(totalRecords / rowsPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Page>
    )
}

export default ListCategorias
