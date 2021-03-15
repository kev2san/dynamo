import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Login = props => {
    const { setToken } = props
    const [error, setError] = useState(null)

	const [usuario, guardarUsuario] = useState({
		user: '',
		passwd : ''
	})

	const {user, passwd} = usuario;

	const onChange = e => {
		guardarUsuario({
			...usuario,
			[e.target.name] : e.target.value
		})
	}

	const onSubmit = e => {
		e.preventDefault();

        setError(null)

        if (user === ''){ setError(`Falta el Campo Usuario`); return false; }
        if (passwd === '') { setError(`Falta el Campo Contraseña`); return false}
        
        setError(null)

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        };
        fetch('http://localhost:3001/api/usuario/loginUsuario', requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.response.length > 0) {
					//Setear token una vez se haya autenticado 
                    localStorage.setItem('token','authenticated')
                    setToken(localStorage.getItem('token'))
                }else{
                    setError('Usuario o Contraseña incorrecto.')
                }
            },
            (error) => {
                console.log('Error')
            }
        )
	}

	return (
		<div className="form-usuario">
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesión</h1>

				<form>
					<div className="campo-form">
						<label htmlFor="user">Usuario</label>
						<input
                            className="form-control"
							type="text"
							id="user"
							name="user"
							placeholder="Tu usuario"
							onChange={onChange}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
                            className="form-control"
							type="password"
							id="passwd"
							name="passwd"
							placeholder="Tu password"
							onChange={onChange}
						/>
					</div>

					<div className="campo-form">
						<input 
							type="submit" 
							className="btn btn-primario btn-block" 
							value="Iniciar Sesión"
                            onClick={onSubmit} 
						/>
					</div>
				</form>
                {(error) && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
			</div>
		</div>
	)
} 

export default Login ;