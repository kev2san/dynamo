const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')
const morgan        = require('morgan')
const app           = express()

const Clinicas      = require('./routes/Clinicas')
const Usuario      = require('./routes/Usuario')
 
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/clinicas/', Clinicas)
app.use('/api/usuario', Usuario)

app.listen(3001, () => {
    console.log('Server running')
})