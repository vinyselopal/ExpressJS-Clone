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
            console.log(error)
            res.writeHead(500)
            res.end("server side error")
        }
    }

    res.json = function (body) {
        try {
            const str = JSON.stringify(body)
            res.writeHead(200, {'Content-Length': body.length,
                'Content-Type': 'application/json'
            })
            res.end(str)
        }
        catch (error) {
            console.log(error)
            res.writeHead(500)

            res.end("server side error")
        }
    }
}

module.exports = response