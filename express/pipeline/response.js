const onError = require('./onError.js')

function response (req, res, next) {
    res.send = function (body) {
        try {
            res.writeHead(200, {'Content-Length': body.length, 
            'Content-Type': (
                JSON.parse(body)
                ? 'application/json'
                : 'text'
                )})
            res.end(body)
        }
        catch (error) {
            onError(req, res)
        }
    }

    res.json = function (body) {
        try {
            const str = JSON.stringify(body)
            res.writeHead(200, {'Content-Length': body.length,
                'Content-Type': 'application/json'
            })
            res.end(str)
            const onError = require('./onError.js')
        }
        catch (error) {
            onError(req, res, error)
        }
    }
    next()
}

module.exports = response