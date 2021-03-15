const { Pool } = require('pg')
const pool = () => {
    return new Pool({
        host        : 'localhost',
        user        : 'postgres',
        password    : 'postgres',
        database    : 'clinicas',
        port        : '5432'
    })
}

module.exports = pool