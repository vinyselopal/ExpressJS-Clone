function middlewares (req, res, routeSeq) {
    function match (req) {
        const path = req.url
        const method = req.method
        const route = routeSeq[method].find((obj) => obj && (obj.path === 'ALL' || obj.path === path))

        return route
    }
    
    let route = match(req)
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

