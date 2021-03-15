const ClinicasModel = require('../models/Clinicas')

const ListarClinicas = async (req, res, next) => {
    try{
        let clinicas = await ClinicasModel.ListarClinicasQuery()
        res.json({response : clinicas, status : 200})
    } catch(e){
        res.send({
            message : 'ocurrio un error en la consulta'
        })
        next(e)
    }
}

const ActualizarEstado = async (req, res,next) => {
    try {
        let actualizar = await ClinicasModel.ActualizarEstadoQuery(req.params)
        let clinicas = await ClinicasModel.ListarClinicasQuery()
        res.json({response : clinicas, status : 200})
    }catch (e){
        res.send({message : 'ocurrio un error en la consulta'})
        next(e)
    }
} 

const ListarByID = async (req, res, next) => {
    try{
        let clinicas = await ClinicasModel.ListarClinicasByIDQuery(req.params)
        res.json({response : clinicas, status : 200})
    } catch(e){
        res.send({
            message : 'ocurrio un error en la consulta'
        })
        next(e)
    }
}

const ActualizarClinica = async (req, res,next) => {
    try {
        let actualizar = await ClinicasModel.ActualizarClinicaQuery(req.body)
        res.json({status : 200})
    }catch (e){
        res.send({message : 'ocurrio un error en la consulta'})
        next(e)
    }
} 

const CrearClinica = async (req, res,next) => {
    try {
        let crear = await ClinicasModel.CrearClinicaQuery(req.body)
        let clinicas = await ClinicasModel.ListarClinicasQuery()
        res.json({response : clinicas, status : 200})
    }catch (e){
        res.send({message : 'ocurrio un error en la consulta'})
        next(e)
    }
}
module.exports = { 
    ListarClinicas,
    ActualizarEstado,
    ListarByID,
    ActualizarClinica,
    CrearClinica
}