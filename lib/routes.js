const url = require('url')
const { pathToRegexp } = require('path-to-regexp')
function routes () {
    const routeSeq = []
    function methodRoute (method) {
        return function (path, handler) {
            const ref = {path, handler, next: null, method}
            const prev = routeSeq[routeSeq.length - 1]
            if (prev) {
                prev.next = ref
            }
            routeSeq.push(ref)
            console.log('routeSeq', routeSeq)
        }
        
    }

    const getRoute = methodRoute('GET')
    const postRoute = methodRoute('POST')
    const putRoute = methodRoute('PUT')
    const deleteRoute = methodRoute('DELETE')

    function match (req) {
        const path = url.parse(req.url).pathname
        const regexp = pathToRegexp(path)
        console.log(req.method)
        const route = routeSeq.find(obj => regexp.test(obj.path) && (obj.method === req.method || obj.method === 'ALL'))
        return route
    }

    function use (...args) {
        let ref
        if (typeof args[0] === 'string') {
            const [ path, handler ] = args
            ref = {path, handler, next: null, method: 'ALL'}
            
        } else {
            const handler = args[0]
            ref = {path: '/*', handler, next: null, method: 'ALL'}          
        }

        const prev = routeSeq[routeSeq.length - 1]
            if (prev) {
                prev.next = ref
            }
        routeSeq.push(ref)
        console.log('routeSeq', routeSeq)
    }

    return {getRoute, postRoute, putRoute, deleteRoute, match, use, routeSeq}
}
module.exports = routes()