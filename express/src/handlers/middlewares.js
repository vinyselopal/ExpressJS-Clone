const response = require('../../pipeline/response.js')
const request = require('../../pipeline/request.js')
const routes = require('../routes.js')
function middlewares (req, res) {
    response(req, res)
    request(req, res)

    let route = routes.match(req)

    if (route) {
        const handler = route.handler

        const next = () => {
            if (res.writableFinished) return
            route = route.next
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

}

module.exports = middlewares

