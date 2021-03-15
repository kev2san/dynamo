const express               = require('express')
const app                   = express()
const router                = express.Router()
const UsuarioController    = require('../controllers/Usuario')

app.route('/loginUsuario').post(
    UsuarioController.LoginUsuario
)

app.route('/listarOcupacion/:i_id_clinica').get(
    UsuarioController.ListarOcupaciones
)

app.route('/crearUsuario').post(
    UsuarioController.CrearUsuario
)

module.exports = app