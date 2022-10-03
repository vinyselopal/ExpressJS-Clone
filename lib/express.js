const http = require('http')
const fs = require('fs')
const path = require('path')
const { cloneDeep } = require('lodash')
function express() {
    let request, response
    let httpRequest, httpResponse
    const server = http.createServer((req, res) => {
        console.log(req.url)
        request = cloneDeep(req)
        response = cloneDeep(res)
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
    const send = () => {
        // send the response using http response object methods
        console.log('inside send')
        httpRequest.writeHead(200)
        httpResponse.end('.send() tested')
    }
    request = {send, ...request}
    const listen = function (port) {
        server.listen(port, () => console.log(`Server running on port ${port}`))
    }

    const get = function (path, callback) {
        console.log('in get')
        console.log(request.url)
        if (path === request.url) {
            console.log('before callback')
            callback(request, response)
        }
    }
    return {listen, get}
}

module.exports = express