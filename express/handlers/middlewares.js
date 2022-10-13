const { routeSeq } = require('../routes.js')

function middlewares (req, res) {

    function match (req) {
        const path = req.url 

        const route = routeSeq.find(obj => (obj.method === 'ALL' || obj.method === req.method ) 
            && (obj.path === 'ALL' || obj.path === path)
            )

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

