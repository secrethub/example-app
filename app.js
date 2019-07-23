const http = require('http')
const pg = require('pg')

const port = 8080
const pool = new pg.Pool() // looks for PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE

const server = http.createServer(async (req, res) => {
    var color
    try {
        await pool.connect()
        res.statusCode = 200
        color = 'green'
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        color = 'red'
    }

    res.end(`<html><body style="background: ${color}"></body></html>`)
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
