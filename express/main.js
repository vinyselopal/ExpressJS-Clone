const http = require('http')
const routes = require('./routes')
const middlewares = require('./handlers/middlewares.js')
const static = require('./pipeline/static')
const init = require('./handlers/init.js')

function express() {
    init(routes.use)
    const server = http.createServer((req, res) => {
        middlewares(req, res)
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
        static
    }
}

module.exports = express