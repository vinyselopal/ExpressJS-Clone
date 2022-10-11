const http = require('http')
const path = require('path')
const responseObj = require('./responseObj.js')
const routes = require('./routes')
const requestObj = require('./requestObj.js')
function express() {
    const server = http.createServer((req, res) => {
        responseObj(res)
        requestObj(req)
        let route = routes.match(req)

        if (route) {
            const handler = route.handler

            const next = () => {
                route = route.next
                console.log(route)
                if (route.handler) {
                    route.handler(req, res, next)
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
        use: routes.use
    }
}

module.exports = express