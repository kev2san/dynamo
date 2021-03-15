import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Home = () => {
    const [clinicas, setClinicas] = useState()
    
    useEffect(() => {
        fetch("http://localhost:3001/api/clinicas/listar")
        .then(res => res.json())
        .then(
            (result) => {
                setClinicas(result.response)
            },
            (error) => {
                // Redireccionar A Html con Error
                console.log('Error')
            }
        )
    }, [])
    
    const editarClinica = (id,estado) => {
        fetch(`http://localhost:3001/api/clinicas/actualizarEstado/${id}/${estado}`)
        .then(res => res.json())
        .then(
            (result) => {
                setClinicas(result.response)
            },
            (error) => {
                // Redireccionar A Html con Error
                console.log('Error')
            }
        )
    }

        return  (
            <div className="container">
                <Logout/>
                <br/>
                <h2 className="text-center titulo">Gestion de Clinicas</h2>
                <br/>
                <Link to="/crear"><button className="btn btn-warning text-white">Agregar</button></Link>
                <br/>
                <br/>
                {(clinicas) ? (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Ubicacion</th>
                            <th>Comuna</th>
                            <th>Personal</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(clinicas) && (
                        clinicas.map(clinica => (
                            <tr key={clinica.id_clinica}>
                                <td>{clinica.c_nombre_clinica}</td>
                                <td>{clinica.c_ubicacion}</td>
                                <td>{clinica.c_comuna}</td>
                                <td>{clinica.i_total}</td>
                                <td>
                                <center>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/gestion/' + clinica.id_clinica}><button className="btn btn-block btn-primary">Gestionar</button></Link>
                                    </div>
                                    <div className="col">
                                        {(clinica.b_estado) ? (
                                            <button onClick={() => editarClinica(clinica.id_clinica,false)} className="btn btn-block btn-danger">Desactivar</button>
                                        ) : (
                                            <button onClick={() => editarClinica(clinica.id_clinica,true)} className="btn btn-block btn-success">Activar</button>
                                        )}
                                    </div>
                                </div>
                                </center>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
                ) : (
                    <div>No hay datos</div>
                )}
                
                
            </div>
        )
}

export default Home