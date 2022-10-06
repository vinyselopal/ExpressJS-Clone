const http = require('http')
const fs = require('fs')
const path = require('path')
const responses = require('./responses.js')
const routes = require('./routes')
const requestObj = require('./request.js')
function express() {
    let request, response
    let httpRequest, httpResponse
    const server = http.createServer((req, res) => {
        request = {}
        response = {}
        responses(res)
        requestObj(req)
        const handler = routes.match(req)
        console.log('handler', handler)
        if (handler) {
            handler(req, res)
        } else {
            res.writeHead(400)
            res.end('I dont have that handler')
        }

        httpRequest = req
        httpResponse = res
        // fs.readFile(path.resolve(__dirname, 'index.html'), (err, data) => {
        //     res.setHeader('Content-Type', 'text/html')
        //     if (err) {
        //         const message = 'Some error occured'
        //         res.setHeader('Content-Length', message.length) // content-length = bytes?
        //         res.writeHead(500)
        //         console.log(err)
        //         return res.end(message)
        //     }
        //     res.setHeader('Content-Length', data.length)
        //     res.writeHead(200)
        //     return res.end(data)
        // })
    })
    
    const listen = function (port) {
        server.listen(port, () => console.log(`Server running on port ${port}`))
    }

    return {listen, get: routes.get}
}

module.exports = express