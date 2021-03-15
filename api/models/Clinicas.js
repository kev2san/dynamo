const pool = require('./Conexion')

const ListarClinicasQuery = (req,res) => {
    let query = {
        text : `SELECT 
                    a.id_clinica,
                    a.c_nombre_clinica,
                    a.c_ubicacion,
                    a.c_comuna,
                    a.b_estado,
                    count(id_usuario) i_total
                FROM tb_clinicas a 
				INNER JOIN tb_usuarios b
					ON a.id_clinica = b.i_id_clinica
				GROUP BY id_clinica
                ORDER BY id_clinica;`
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

const ActualizarEstadoQuery = (req,res) => {
    let query = {
        text : `UPDATE tb_clinicas
                SET b_estado = $1
                WHERE id_clinica = $2;`,
        values : [req.estado,req.id]
    }

    return pool()
    .query(query)
    .then(ros => 
        res.rows
    )
    .catch(e => e)
}

const ListarClinicasByIDQuery = (req,res) => {
    let query = {
        text : `SELECT * 
                FROM tb_clinicas
                WHERE id_clinica = $1;`,
        values : [req.id]
    }
    return pool()
    .query(query)
    .then(res => 
        res.rows
    )
    .catch(e => e)
}

const ActualizarClinicaQuery = (req,res) => {
    let query = {
        text : `UPDATE tb_clinicas
                SET c_nombre_clinica = $1,
                    c_ubicacion = $2,
                    c_comuna = $3
                WHERE id_clinica = $4;`,
        values : [req.c_nombre_clinica,req.c_ubicacion,req.c_comuna,req.id_clinica]
    }

    return pool()
    .query(query)
    .then(ros => 
        res.rows
    )
    .catch(e => e)
}

const CrearClinicaQuery = (req,res) => {
    let query = {
        text : `INSERT INTO tb_clinicas(
                    c_nombre_clinica,
                    c_ubicacion,
                    c_comuna,
                    b_estado
                )
                VALUES(
                    $1,
                    $2,
                    $3,
                    true
                )`,
        values : [req.c_nombre_clinica,req.c_ubicacion,req.c_comuna]
    }

    return pool()
    .query(query)
    .then(ros => 
        res.rows
    )
    .catch(e => e)
}

module.exports = { 
    ListarClinicasQuery,
    ActualizarEstadoQuery,
    ListarClinicasByIDQuery,
    ActualizarClinicaQuery,
    CrearClinicaQuery
}