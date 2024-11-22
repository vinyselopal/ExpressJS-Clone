const onError = require('./onError.js')

function response (req, res, next) {
    res.send = function (body) {
        console.log("send", body)
        try {
            res.writeHead(200, {'Content-Length': Buffer.byteLength(body),
            'Content-Type': (
                JSON.parse(body) // throws error when not JSON
                ? 'application/json'
                : 'text'
                )})
            res.end(body)
        }
        catch (error) {
            console.log("error", error)
            onError(req, res)
        }
    }

    res.json = function (body) {
        try {
            const str = JSON.stringify(body)
            res.writeHead(200, {'Content-Length': str.getBytes(),
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