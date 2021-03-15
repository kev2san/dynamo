import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from './Logout'

const Gestion = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [clinica, setClinica] = useState()
    const { id } = useParams()
    

    useEffect(() => {
        fetch(`http://localhost:3001/api/clinicas/listarByID/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                setClinica(result.response[0])
            },
            (error) => {
                console.log('Error')
            }
        )
    }, [])

    //setear valores en el state
    const setValorClinica = e => {
        setClinica({
            ...clinica,
            [e.target.name] : e.target.value
        })
    }

    const submitActualizarClinica = e => {
        e.preventDefault()
        setSuccess(null)

        //validar campos 
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
        fetch('http://localhost:3001/api/clinicas/actualizarClinica', requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setSuccess('Los datos se han actualizado de manera exitosa.')
            },
            (error) => {
                // Redireccionar A Html con Error
                console.log('Error')
            }
        )
    } 


    if (clinica) {
        return (
            <div className="container">
                <Logout/>
                <br/>
                <h2 className="text-center titulo">Gestion de {clinica.c_nombre_clinica}</h2>
                <br/>
                <form onSubmit={submitActualizarClinica}>
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
                            <button className="btn btn-block btn-warning text-white">Volver</button>
                        </Link>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn-block btn btn-info text-white">Actualizar</button>
                    </div>
                    <div className="col">
                        <Link to={'/personal/'+ id}><button className="btn-block btn btn-dark text-white">Personal</button></Link>
                    </div>
                    <div className="col"></div>
                </div>
                
                </form>
                
            </div>
        )
    }else{
        return (
            <div>No hay datos</div>
        )
    }
    
}

export default Gestion