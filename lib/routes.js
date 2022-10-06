const url = require('url')
const { pathToRegexp } = require('path-to-regexp')
function routes () {
    const routesHandlers = {}
    function get (routePath, handler) {
        routesHandlers[routePath] = handler
    }
    const match = function (req) {
        const path = url.parse(req.url).pathname
        console.log('path', path, 'req.url', req.url)
        console.log('routesHandlers', routesHandlers)
        const regexp = pathToRegexp(path)
        console.log('regexp', regexp)
        const validPath = Object.keys(routesHandlers).find(a => regexp.test(a)) // not optimal?
        console.log('validPath', validPath)
        const handler = routesHandlers[validPath]
        return handler
    }  

    return {get, match}
}
module.exports = routes()