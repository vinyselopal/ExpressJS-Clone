const http = require('http')
const routes = require('./routes')
const middlewares = require('./handlers/middlewares.js')
const static = require('./inbuiltMiddlewares/static')
const init = require('./handlers/init.js')

function express() {
    const routeSeq = {'GET': [], 'PUSH': [], 'POP': [], 'DELETE': []}

    init(routes(routeSeq).use)

    const server = http.createServer((req, res) => {
        middlewares(req, res, routeSeq)
    })

    const listen = function (port) {
        server.listen(port, () => console.log(`Server running on port ${port}`))
    }
    return {
        listen,
        get: routes(routeSeq).getRoute,
        put: routes(routeSeq).putRoute,
        post: routes(routeSeq).postRoute,
        delete: routes(routeSeq).deleteRoute,
        use: routes(routeSeq).use,
        static, routeSeq
    }
}

module.exports = express