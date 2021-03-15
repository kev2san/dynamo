import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Gestion = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [clinica, setClinica] = useState({
        c_nombre_clinica : '',
        c_ubicacion : '',
        c_comuna : ''
    })

    //Setear valores en el state
    const setValorClinica = e => {
        setClinica({
            ...clinica,
            [e.target.name] : e.target.value
        })
    }

    const submitCrearClinica = e => {
        e.preventDefault()
        setSuccess(null)

        setError(null)

        //Valida que no falte llenar ningun campo
        if (clinica.c_nombre_clinica === ''){ setError(`Falta el Campo Nombre Clinica`); return false; }
        if (clinica.c_ubicacion === '') { setError(`Falta el Campo Ubicacion`); return false}
        if (clinica.c_comuna === '') { setError(`Falta el Campo Comuna`); return false}
        
        setError(null)

        //envio de datos a la api
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clinica)
        };
        fetch('http://localhost:3001/api/clinicas/crearClinica', requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setSuccess('La clinica ha sido creada de manera exitosa.')

                //limpiar campos
                setClinica({
                    c_nombre_clinica : '',
                    c_ubicacion : '',
                    c_comuna : ''
                })
            },
            (error) => {
                console.log('Error')
            }
        )
    } 

        return (
            <div className="container">
                <Logout/>
                <br/>
                <h2 className="text-center titulo">Crear Clinica</h2>
                <br/>
                <form onSubmit={submitCrearClinica}>
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th className="text-right">Nombre Clinica : </th>
                            <td>
                                <input className="form-control" name="c_nombre_clinica" type="text" onChange={setValorClinica} value={clinica.c_nombre_clinica}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Ubicacion : </th>
                            <td>
                                <input className="form-control" name="c_ubicacion" type="text" onChange={setValorClinica} value={clinica.c_ubicacion}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Comuna : </th>
                            <td>
                                <input className="form-control" name="c_comuna" type="text" onChange={setValorClinica} value={clinica.c_comuna}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <center>
                    {(error) && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {(success) && (
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    )}
                    
                </center>
                <br/>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <Link to="/">
                            <button className="btn-block btn btn-warning text-white">Volver</button>
                        </Link>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn-block btn btn-info text-white">Crear</button>
                    </div>
                    <div className="col"></div>
                </div>
                </form>
                
            </div>
        )
    
}

export default Gestion