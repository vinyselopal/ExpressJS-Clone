const url = require('url')
const { pathToRegexp } = require('path-to-regexp')
const path = require('path')

const fs = require('fs')

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
        const path = url.parse(req.url).pathname
        const regexp = pathToRegexp(path)
        const route = routeSeq.find(obj => (obj.method === req.method || obj.method === 'ALL') && regexp.test(obj.path))
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
            ref = {path: '/*', handler, next: null, method: 'ALL'}          
        }

        const prev = routeSeq[routeSeq.length - 1]
            if (prev) {
                prev.next = ref
            }
        routeSeq.push(ref)
    }

    function static (pathToServe) {
        // pathToServe yet to be used
        const handler = (req, res, next) => {
            fs.readdir(path.join(__dirname, '../', pathToServe), 'utf-8', (err, files) => {
                if (err) {
                    console.log(err)
                    return 
                }
                else {
                    // console.log('file', file[0])
                    files.forEach( file => {
                        fs.readFile(
                            path.join(__dirname, '../', pathToServe, file), (err, data) => {
                                if (err) {
                                    console.log(err)
                                    return 
                                } else {
                                    res.writeHead(200)
                                    res.write(data, function () {
                                        res.end()
                                    })
                                }
                            }
                        )
                            
                    })
                }
            })
            next()
        }
        const ref = {path: '/', handler, next: null, method: 'GET'}
        return ref
    }

    

    return {getRoute, postRoute, putRoute, deleteRoute, match, use, routeSeq, static}
}
module.exports = routes()