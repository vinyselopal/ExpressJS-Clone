function routes (routeSeq) {
    function methodRoute (method) {
        return function (path, handler) {
            const ref = {path, handler, next: null, method}
            const prev = routeSeq[method][routeSeq[method].length - 1]
            if (prev) {
                prev.next = ref
            }
            routeSeq[method].push(ref)
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
            ref = {path, handler, next: null}
            
        } else if (typeof args[0] === 'object') {
            ref = args[0]
        } 
        else {
            const handler = args[0]
            ref = {path: 'ALL', handler, next: null}          
        }
        let route
        Object.keys(routeSeq).forEach((method) => {
            const prev = routeSeq[method][routeSeq[method].length - 1]
            route = {...ref, method}
            if (prev) {
                prev.next = route
            }
            routeSeq[method].push(route)
        })
    }    

    return {getRoute, postRoute, putRoute, deleteRoute, use}
}
module.exports = routes