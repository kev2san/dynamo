import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logout from './Logout'

const Personal = () => {
    const { id } = useParams()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [ocupacion, setOcupacion] = useState(false)
    const [listaUsuarios, setListaUsuarios] = useState(false)
    const [usuario, setUsuario] = useState({
        c_nombres : '',
        c_apellidos : '',
        c_usuario : '',
        i_id_ocupacion : '',
        i_id_clinica : id
    })

    //Funcion para validar el rut con guion
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut : function (rutCompleto) {
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
                return false;
            var tmp 	= rutCompleto.split('-');
            var digv	= tmp[1]; 
            var rut 	= tmp[0];
            if ( digv == 'K' ) digv = 'k' ;
            return (Fn.dv(rut) == digv );
        },
        dv : function(T){
            var M=0,S=1;
            for(;T;T=Math.floor(T/10))
                S=(S+T%10*(9-M++%6))%11;
            return S?S-1:'k';
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3001/api/usuario/listarOcupacion/${id}`)
        .then(res => res.json())
        .then(
            (result) => {
                setOcupacion(result.ocupacion)
                setListaUsuarios(result.lista)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    const setValorUsuario = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const submitCrearUsuario = e => {
        e.preventDefault()
        setSuccess(null)

        setError(null)

        if (usuario.c_nombres === ''){ setError(`Falta el Campo Nombres`); return false; }
        if (usuario.c_apellidos === '') { setError(`Falta el Campo Apellidos`); return false}
        if (usuario.c_usuario === '') { setError(`Falta el Campo Rut`); return false}
        //valida rut
        if (!Fn.validaRut(usuario.c_usuario)) { setError(`El rut es incorrecto`); return false}
        if (usuario.i_id_ocupacion === '') { setError(`Falta la Ocupacion`); return false}

        
        setError(null)

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        };
        fetch('http://localhost:3001/api/usuario/crearUsuario', requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.response != 2){
                    setSuccess('El personal ha sido creado de manera exitosa.')
                    setUsuario({
                        c_nombres : '',
                        c_apellidos : '',
                        c_usuario : '',
                        i_id_ocupacion : ''
                    })
                    setListaUsuarios(result.response)
                }else{
                    setError('El usuario ha sido creado anteriormente.')
                }
                
            },
            (error) => {
                // Redireccionar A Html con Error
                console.log('Error')
            }
        )
    } 
    
    return(
        <div className="container">
            <br/>
            <h2 className="text-center titulo">Gestion de Personal</h2>
            <br/>
            <Logout/>
            <form onSubmit={submitCrearUsuario}>
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th className="text-right">Nombres : </th>
                            <td>
                                <input className="form-control" name="c_nombres" type="text" onChange={setValorUsuario} value={usuario.c_nombres}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Apellidos : </th>
                            <td>
                                <input className="form-control" name="c_apellidos" type="text" onChange={setValorUsuario} value={usuario.c_apellidos}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Rut : </th>
                            <td>
                                <input placeholder="El formato del rut es: 11111111-1" className="form-control" name="c_usuario" type="text" onChange={setValorUsuario} value={usuario.c_usuario}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Ocupación : </th>
                            <td>
                                <select className="form-control" value={usuario.i_id_ocupacion} name="i_id_ocupacion" onChange={setValorUsuario}>
                                    <option value="">Seleccione ... </option>
                                    {(ocupacion) && (
                                        ocupacion.map(item => (
                                            <option key={item.id_ocupacion} value={item.id_ocupacion}>{item.c_descripcion}</option>
                                        ))
                                    )}
                                </select>
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
                        <Link to={'/gestion/' + id}>
                            <button className="btn-block btn btn-warning text-white">Volver</button>
                        </Link>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn-block btn btn-info text-white">Crear</button>
                    </div>
                    <div className="col"></div>
                </div>
            </form>
            <br/>
            <br/>
            {(listaUsuarios) && (
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                        <tr>
                            <td>Nombres</td>
                            <td>Apellidos</td>
                            <td>Usuario</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listaUsuarios.map(item => (
                            <tr key={item.id_usuario}>
                                <td>{item.c_nombres}</td>
                                <td>{item.c_apellidos}</td>
                                <td>{item.c_usuario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Personal