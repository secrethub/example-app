const http = require('http')
const request = require('request-promise-native')

const port = 8080

const httpbinBearer = process.env.HTTPBIN_BEARER || ''
if (httpbinBearer) {
    console.log(`Environment variable HTTPBIN_BEARER is set to ${httpbinBearer}`)
} else {
    console.log(`Environment variable HTTPBIN_BEARER is not set`)
}

const server = http.createServer(async (req, res) => {
    var color
    try {
        httpbinResp = await request.get('https://httpbin.org/bearer', {
            headers: {'Authorization': `Bearer ${httpbinBearer}`}
        })
        console.log(`httpbin success response: ${httpbinResp}`)
        res.statusCode = 200
        color = 'green'
    } catch (error) {
        console.log(`httpbin error status code: ${error.statusCode}, make sure to set HTTPBIN_BEARER`)
        res.statusCode = 500
        color = 'red'
    }
    res.end(`<html><body style="background: ${color}"></body></html>`)
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
