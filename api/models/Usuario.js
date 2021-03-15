const pool = require('./Conexion')

const LoginUsuarioQuery = (req,res) => {
    let query = {
        text : `SELECT * 
                FROM tb_usuarios
                WHERE c_usuario = $1 
                    AND c_contrasena = $2;`,

        values : [req.user,req.passwd]
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

const ListarOcupacionesQuery = (req,res) => {
    let query = {
        text : `SELECT * 
                FROM tb_ocupaciones
                WHERE b_estado is True;`
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

const ValidarUsuarioQuery = (req,res) => {
    let query = {
        text : `SELECT * 
                FROM tb_usuarios
                WHERE c_usuario = $1;`,
        values : [req.c_usuario]
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

const CrearUsuarioQuery = (req,res) => {
    let query = {
        text : `INSERT INTO tb_usuarios(
                    c_usuario,
                    c_contrasena,
                    c_nombres,
                    c_apellidos,
                    i_id_ocupacion,
                    i_id_clinica
                )VALUES(
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                );`,
        values : [req.c_usuario, req.c_usuario.substr(0,4),req.c_nombres,req.c_apellidos,req.i_id_ocupacion,req.i_id_clinica]
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

const ListarUsuariosQuery = (req,res) => {
    let query = {
        text : `SELECT * 
                FROM tb_usuarios
                WHERE i_id_clinica = $1
                ORDER BY t_fecha_creacion DESC`,
        values : [req.i_id_clinica]
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

module.exports = {
    LoginUsuarioQuery,
    ListarOcupacionesQuery,
    ValidarUsuarioQuery,
    CrearUsuarioQuery,
    ListarUsuariosQuery
}