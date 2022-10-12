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

    return {getRoute, postRoute, putRoute, deleteRoute, use, routeSeq}
}
module.exports = routes()