const http = require('http')
const path = require('path')
const mutateResponse = require('./mutateResponse.js')
const routes = require('./routes')
const mutateRequest = require('./mutateRequest.js')
function express() {
    const server = http.createServer((req, res) => {
        mutateResponse(res)
        mutateRequest(req)
        
        let route = routes.match(req)

        if (route) {
            const handler = route.handler

            const next = () => {
                console.log('res.getHeaders', res.getHeaders())
                if (res.writableEnded) return // ** to check if response has been sent. Gives invalid chunked encoding
                route = route.next
                console.log('route', route)
                if (route) {
                    route.handler(req, res, next)
                }
                else {
                    res.writeHead(400)
                    res.end('I dont have that handler')
                }
            }

            handler(req, res, next)

        } else {
            res.writeHead(400)
            res.end('I dont have that handler')
        }

    })

    const listen = function (port) {
        server.listen(port, () => console.log(`Server running on port ${port}`))
    }
    return {
        listen,
        get: routes.getRoute,
        put: routes.putRoute,
        post: routes.postRoute,
        delete: routes.deleteRoute,
        use: routes.use,
        static: routes.static
    }
}

module.exports = express