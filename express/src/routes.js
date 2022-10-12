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
        }
        
    }

    const getRoute = methodRoute('GET')
    const postRoute = methodRoute('POST')
    const putRoute = methodRoute('PUT')
    const deleteRoute = methodRoute('DELETE')

    function match (req) {
        const path = req.url 
        const route = routeSeq.find(obj => (obj.method === 'ALL' || obj.method === req.method ) 
            && (obj.path === 'ALL' || obj.path === path)
            )
        return route
    }

    function use (...args) {
        let ref
        if (typeof args[0] === 'string') {
            const [ path, handler ] = args
            ref = {path, handler, next: null, method: 'ALL'}
            
        } else if (typeof args[0] === 'object') {
            ref = args[0]
        } 
        else {
            const handler = args[0]
            ref = {path: 'ALL', handler, next: null, method: 'ALL'}          
        }

        const prev = routeSeq[routeSeq.length - 1]
            if (prev) {
                prev.next = ref
            }
        routeSeq.push(ref)
    }    

    return {getRoute, postRoute, putRoute, deleteRoute, match, use, routeSeq}
}
module.exports = routes()