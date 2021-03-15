const express               = require('express')
const app                   = express()
const router                = express.Router()
const ClinicasController    = require('../controllers/Clinicas')

app.route('/listar').get(
    ClinicasController.ListarClinicas
)

app.route('/actualizarEstado/:id/:estado').get(
    ClinicasController.ActualizarEstado
)

app.route('/listarByID/:id').get(
    ClinicasController.ListarByID
)

app.route('/actualizarClinica').post(
    ClinicasController.ActualizarClinica
)

app.route('/crearClinica').post(
    ClinicasController.CrearClinica
)

module.exports = app