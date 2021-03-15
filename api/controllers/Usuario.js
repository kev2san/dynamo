const UsuarioModel = require('../models/Usuario')

const LoginUsuario = async (req, res, next) => {
    try{
        let Usuario = await UsuarioModel.LoginUsuarioQuery(req.body)
        res.json({response : Usuario, status : 200})
    } catch(e){
        res.send({
            message : 'ocurrio un error en la consulta'
        })
        next(e)
    }
}

const ListarOcupaciones = async (req, res, next) => {
    try{
        let Ocupaciones = await UsuarioModel.ListarOcupacionesQuery()
        let Listar = await UsuarioModel.ListarUsuariosQuery(req.params)
        res.json({ocupacion : Ocupaciones, lista : Listar,  status : 200})
    } catch(e){
        res.send({
            message : 'ocurrio un error en la consulta'
        })
        next(e)
    }
}

const CrearUsuario = async (req, res, next) => {
    try{
        let Usuario = await UsuarioModel.ValidarUsuarioQuery(req.body)
        if (Usuario.length > 0){
            res.json({response : 2, status : 200})
            return false; 
        }
        let Crear = await UsuarioModel.CrearUsuarioQuery(req.body)

        let Listar = await UsuarioModel.ListarUsuariosQuery(req.body)
        res.json({response : Listar, status : 200})
    } catch(e){
        res.send({
            message : 'ocurrio un error en la consulta'
        })
        next(e)
    }
}

module.exports = {
    LoginUsuario,
    ListarOcupaciones,
    CrearUsuario
}