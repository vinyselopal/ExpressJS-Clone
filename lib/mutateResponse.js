function responseObj (res) {
    res.send = function (body) {
        try {
            res.writeHead(200)
            res.write(body, function () {
                res.end()
            })
        }
        catch (error) {
            console.log(error)
            res.writeHead(500)
            res.end("server side error")
        }
    }

    res.json = function (body) {
        try {
            const str = JSON.stringify(body) // content-type = application/json
            res.writeHead(200)
            res.end(str)
        }
        catch (error) {
            console.log(error)
            res.writeHead(500)
            res.end("server side error")
        }
    }
}

module.exports = responseObj