import React from 'react'
import { useHistory } from 'react-router-dom'

const Logout = () => {

    //componente para cerrar sesion
    const history = useHistory()

    const cerrarSesion = () => {
        //Remueve el token creado
        localStorage.removeItem('token')
        window.location = '/'
    }

    return (
        <button onClick={() => cerrarSesion()} className="float-out btn btn-danger">Cerrar Sesion</button>
    )
}

export default Logout